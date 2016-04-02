"use strict";
/*
 * フロントからはここの関数を呼び出す
 */

var constants = require("./lib/constants");
var db = require("./lib/database");
var rss = require("./lib/rss");
var util = require("./lib/util");

var common = {};

// フィードの新規登録
common.reg_new_feed = function(url){
    var mylistid = util.url.pick_mylistid(url);
    console.log("mylsitid: "+mylistid);

    db.feed_from_mylistid(mylistid, function(err, items){
        if(!err){
            if(items.length == 0){
                rss.get_mylist_rss(mylistid, function(data){
                    if(util.mylist.is_publication(data)){
                        db.reg_feed(data);
                    }else{ console.log("failed: is not publicated"); }
                });
            }else{ console.log("failed: already registed"); }
        }else{
            console.log("common.reg_new_feed err: "+err);
        }
    });
};


// フィードと同期を取る
common.sync = function(){
    db.mylists(function(err, feed){
        console.log("mylist: "+feed.title);
        if(!err){
            util.mylist.pull(feed.mylistid, function cb_new_item(movies){
                movies.forEach(function(movie){
                    console.log("new: "+movie.title);
                    db.reg_movie(movie.movieid, movie.title, movie.posted_at, movie.thumbnail, movie.description, feed.id);
                });
            }, function cb_del_item(movies){
                movies.forEach(function(movie){
                    console.log("del: "+movie.title);
                    db.del_movie(movie.movieid, feed.id);
                });
            });
        }else{
            console.log("common.pull error: "+err);
        }
    });
};


// 視聴ずみとする
common.toWatched = function toWatched(item_id){
    db.change_watch_status(item_id, true, function(err, row){
        if(err){
            console.log("更新失敗");
        }
    });
};

// フィードの削除
common.rmFeed = function rmFeed(feed_id){
    db.del_feed_recursively(feed_id);
};


// 新着動画ありに表示するデータを取得&整形
common.unwatchFeedList = function unwatchFeedList(cb){
    /*
     * db(feed_data)
     */
    var feeds = [];
    var feed;

    db.mylists(cb_feeds);

    function cb_feeds(err, row){
        if(!err){
            db.unwatched_movie_num_at_feed(row.id, function(num){
                if(0 < num){
                    feed = Object.assign({}, constants.template.FEEDLIST);
                    feed.id = row.id;
                    feed.title = row.title;
                    feed.unwatch_movie_num = num;
                    cb(feed);
                }
            });
        }
    };
};


// フィードリストに表示するデータを取得&整形
common.allWatchedFeedList = function allWatchedFeedList(cb){
    /*
     * db(feed_data)
     */
    var feeds = [];
    var feed;

    db.mylists(cb_feeds);

    function cb_feeds(err, row){
        if(!err){
            db.unwatched_movie_num_at_feed(row.id, function(unwatch_num){
                if(unwatch_num == 0){
                    feed = Object.assign({}, constants.template.FEEDLIST);
                    feed.id = row.id;
                    feed.title = row.title;
                    cb(feed);
                }
            });
        }
    };
};

module.exports = common;
