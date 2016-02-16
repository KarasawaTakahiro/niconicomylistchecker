'use strict';

var lodash = require("lodash");
var db = require("./database");
var rss = require("./rss");

var util = {
    // マイリスト系
    mylist: {
        template: {
            title: "",
            description: "",
            items: [{
                title: null,
                movieid: null,
                posted_at: null,
                thumbnail: null,
                description: null,
            }]
        },

        obj_diff: function(m1, m2, cb_new, cb_del){
            if(m1.mylistid == m2.mylistid){
                var items_new = lodash.differenceWith(m2.items, m1.items, lodash.isEqual);
                var items_del = lodash.differenceWith(m1.items, m2.items, lodash.isEqual);

                cb_new(items_new);
                cb_del(items_del);
            }
        },

        diff: function(mylistid, dbname, cb){
            /*
             * mylistid
             * dbname
             * cb(new_items, del_items)
             */
            var template = Object.assign({}, this.template);
            var mylist = Object.assign({}, this.template);
            var movies = new Array();
            var movie;

            // ローカルの取得
            db.init(dbname);
            db.feed_from_mylistid(mylistid, function(err, row){

                if(!err && (0 < row.length) && (row = row[0]) && row.mylistid){
                    mylist.title = row.title;
                    mylist.description = row.description;
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
            });
            db.close();

            // リモート
            var feed_mylist = {};
            rss.get_mylist_rss(mylistid, function(feedData){
                Object.assign(feed_mylist, feedData);
            });
            console.log(feed_mylist);

            // diff


        },
    },




    // URL系
    url: {
    },

};

module.exports = util;
