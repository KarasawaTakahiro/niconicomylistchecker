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

                cb_new(items_new);
                cb_del(items_del);
            }
        },

        pull: function(mylistid, dbname, cb){
            /*
             * フィードは登録されていること前提
             * mylistid
             * dbname
             * cb(new_items, del_items)
             */
            var template = Object.assign({}, constants.TEMPLATE);
            var mylist = Object.assign({}, constants.TEMPLATE);
            var movies = new Array();
            var movie;
            var feed_mylist;
            var obj_diff = this.obj_diff;

            // ローカルの取得
            db.init(dbname);
            db.feed_from_mylistid(mylistid, function(err, row){

                if(!err && (0 < row.length) && (row = row[0]) && row.mylistid){
                    mylist.id = row.id;
                    mylist.title = row.title;
                    mylist.description = row.description;
                    mylist.mylistid = row.mylistid;
                    db.movies_in_feed(row.id, function(err, row){
                        if(!err){
                            movie = Object.assign({}, template.items[0]);
                            movie.title = row.title;
                            movie.posted_at = row.posted_at;
                            movie.movieid = row.movieid;
                            movie.thumbnail = row.thumbnail;
                            movie.description = row.description;
                            movies.push(movie);
                        }else{
                            console.log(err);
                        }
                    });
                }else if(err){
                    console.log(err);
                }
                mylist.items = movies;
                console.log("mylist");
                console.log(mylist);

                // リモート
                rss.get_mylist_rss(mylistid, function(feed_mylist){
                    console.log("feed_mylist");
                    console.log(feed_mylist);

                    // diff
                    db.init(dbname);
                    // feedの更新
                    if(mylist.title != feed_mylist.title){
                        db.change_feed_title(mylist.id, feed_mylist.title);
                    }
                    if(mylist.description != feed_mylist.description){
                        db.change_feed_desc(mylist.id, feed_mylist.description);
                    }
                    // itemの更新
                    obj_diff(mylist, feed_mylist, function(items){
                        // 新しい動画の登録
                        console.log("new");
                        console.log(items);
                        items.forEach(function(item){
                            db.reg_movie(item.movieid, item.title, item.posted_at, item.thumbnail, item.description, feed_id);
                        });
                    }, function(items){
                        // 消えた動画の削除
                        console.log("del");
                        console.log(items);
                    });
                });
            });
            db.close();

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
