'use strict';

var db = require("./database");
var constants = require("./constants");
var lodash = require("lodash");
var rss = require("./rss");

var util = {
    // マイリスト系
    mylist: {
        obj_diff: function(m1, m2, cb_new, cb_del){
            if(m1.mylistid == m2.mylistid){
                var items_new = lodash.differenceWith(m2.items, m1.items, lodash.isEqual);
                var items_del = lodash.differenceWith(m1.items, m2.items, lodash.isEqual);

                console.log("----------------------------------");
                console.log("local mylist");
                console.log(m1.items);
                console.log("----------------------------------");
                console.log("feed mylist");
                console.log(m2.items);
                console.log("----------------------------------");
                console.log("items new");
                console.log(items_new);
                console.log("----------------------------------");
                console.log("items del");
                console.log(items_del);
                console.log("----------------------------------");


                cb_new(items_new);
                cb_del(items_del);
            }
        },

        pull: function(mylistid, cb_new, cb_del){
            /*
             * フィードは登録されていること前提
             * mylistid
             * cb_new(items)
             * db_del(items)
             */
            var mylist = Object.assign({}, constants.template.FEED);
            var movies = new Array();
            var movie;
            var obj_diff = this.obj_diff;

            // ローカルの取得
            db.feed_from_mylistid(mylistid, function(err, row){

                if(!err && (0 < row.length) && (row = row[0]) && row.mylistid){
                    mylist.id = row.id;
                    mylist.title = row.title;
                    mylist.description = row.description;
                    mylist.mylistid = row.mylistid;
                    db.movies_in_feed(row.id, function(err, row){
                        if(!err){
                            movie = Object.assign({}, constants.template.ITEM);
                            movie.title = row.title;
                            movie.posted_at = new Date(row.posted_at);
                            movie.movieid = row.movieid;
                            movie.thumbnail = row.thumbnail;
                            movie.description = row.description;
                            movies.push(movie);
                        }else{
                            console.log("util.pull: "+err);
                        }
                    });
                }else if(err){
                    console.log("util.pull: "+err);
                }
                mylist.items = movies;

                // リモート
                rss.get_mylist_rss(mylistid, function(feed_mylist){
                    // diff
                    // feedの更新
                    if(mylist.title != feed_mylist.title){
                        db.change_feed_title(mylist.id, feed_mylist.title);
                    }
                    if(mylist.description != feed_mylist.description){
                        db.change_feed_desc(mylist.id, feed_mylist.description);
                    }
                    // itemの更新
                    obj_diff(mylist, feed_mylist, cb_new, cb_del);
                });
            });

        },

        is_publication: function(data){
            /*
             * データがが公開されているものかを判断する
             */
            if(data.mylistid){
                return true;
            }else{
                return false;
            }
        },
    },


    // URL系
    url: {
        pick_movieid: function(url){
            /*
             * URLから動画IDを抜き出す
             */
            var re = /sm\d+/;
            var matched;

            if(matched = url.match(re)){
                return matched[0];
            }else{
                return null;
            }
        },

        pick_mylistid: function(url){
            /*
             * URLからマイリストIDを抜き出す
             */
            var re1 = /mylist\/(#\/)?\d+/;
            var re2 = /\d+/;
            var matched;

            if(matched = url.match(re1)){
                // mylist/#/99999 の状態
                if(matched = matched[0].match(re2)){
                    // 99999 IDのみを抽出する
                    return matched[0];
                }else{
                    return null;
                }
            }else{
                return null;
            }
        },
    },

};

module.exports = util;
