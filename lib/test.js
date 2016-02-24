"use strict";


var constants = require("./constants");


// テストデータ
var m1 = Object.assign({}, constants.TEMPLATE);
var m2 = Object.assign({}, constants.TEMPLATE);
var d1 = Object.assign({}, constants.TEMPLATE.items[0]);
var d2 = Object.assign({}, constants.TEMPLATE.items[0]);
var d3 = Object.assign({}, constants.TEMPLATE.items[0]);
var d4 = Object.assign({}, constants.TEMPLATE.items[0]);
var d5 = Object.assign({}, constants.TEMPLATE.items[0]);

d1.title = "テスト用の動画1";
d1.movieid = "sm11";
d1.posted_at = new Date("Thu, 06 Sep 2012 01:00:00 +0900");
d1.thumbnail = "";
d1.description = "テスト用の動画1つ目です";

d2.title = "テスト用の動画2";
d2.movieid = "sm12";
d2.posted_at = new Date("Thu, 06 Sep 2012 02:00:00 +0900");
d2.thumbnail = "";
d2.description = "テスト用の動画2つ目です";

d3.title = "テスト用の動画3";
d3.movieid = "sm13";
d3.posted_at = new Date("Thu, 06 Sep 2012 03:00:00 +0900");
d3.thumbnail = "";
d3.description = "テスト用の動画3つ目です";

d4.title = "テスト用の動画4";
d4.movieid = "sm21";
d4.posted_at = new Date("Thu, 06 Sep 2012 04:00:00 +0900");
d4.thumbnail = "";
d4.description = "テスト用の動画4つ目です";

d5.title = "テスト用の動画5";
d5.movieid = "sm22";
d5.posted_at = new Date("Thu, 06 Sep 2012 05:00:00 +0900");
d5.thumbnail = "";
d5.description = "テスト用の動画5つ目です";

m1.title = "テスト用マイリスト1";
m1.description = "テスト用のマイリスト1つ目です";
m1.mylistid = 1111;
m1.items = [d1, d2, d3];

m2.title = "テスト用マイリスト2";
m2.description = "テスト用のマイリスト2つ目です";
m2.mylistid = 2222;
m2.items = [d1, d2, d4];


// モジュール
var test = {
    datas: {
        m1: m1,
        m2: m2,
        d1: d1,
        d2: d2,
        d3: d3,
        d4: d4,
        d5: d5,
    },

// console.log("rss");
// var cb = function(data){
//     console.log("publication");
//     console.log(util.mylist.is_publication(data));
//     console.log(data);
// };
// rss.get_mylist_rss("32310482", cb);
// rss.get_mylist_rss("25306720", cb);

// var db = remote.require("./lib/database");
// db.init("hoge");
// db.construct();

/*
db.reg_mylist("9999", "マイリスト9", "setumeibufewan", function(err){
    console.log(this);
    console.log(this.lastID);
    console.log(this.changes);
    console.log(err);
});
*/

// db.reg_mylist("32310482", "マイリスト2", "setumeibufewan", function(err){
//     console.log(err);
// });

/*
db.reg_mylist("2222", "マイリスト2", "setumeibufewan", function(err){
    console.log(err);
});

db.reg_movie("sm11", "動画タイトルその1", new Date(), "http://hoge.png", "動画説明", 1);
db.reg_movie("sm12", "動画タイトルその2", new Date(), "http://hoge.png", "動画説明", 1);
db.reg_movie("sm21", "動画タイトルその3", new Date(), "http://hoge.png", "動画説明", 2);
db.reg_movie("sm22", "動画タイトルその4", new Date(), "http://hoge.png", "動画説明", 2);
*/

/*
db.mylists(function(err, row){
    console.log("mylists");
    console.log(row);
    console.log(row.mylistid);
});

db.movies_in_feed(1, function(err, row) {
    console.log("movies in feed");
    if(err){
        console.log(err);
    }else{
        console.log(row);
    }
});

db.unviewed_movies(function(err, row) {
    console.log("unviewed");
    if(err){
        console.log(err);
    }else{
        console.log(row);
    }
});

db.movie_from_feed_id(1, function(err, row){
    console.log("movie_from_feed_id");
    if(err){
        console.log(err);
    }else{
        console.log(row);
    }
});

db.change_watch_status(1, true, function(err, row){
    console.log("change_watch_status");
    if(err){
        console.log(err);
    }else{
        console.log(row);
    }
});

db.movies_in_feed(1, function(err, row){
    console.log(row);
});


db.close();
*/

/*
var util = require("./lib/util");
var m1, m2;

m1 = Object.assign({}, test.datas.m1);
m2 = Object.assign({}, test.datas.m1);
m2.items = Object.assign([], test.datas.m2.items);

console.log(m1);
console.log(m2);

console.log("m1");
m1.items.forEach(function(item){
    console.log(item.movieid);
});

console.log("m2");
m2.items.forEach(function(item){
    console.log(item.movieid);
});

util.mylist.obj_diff(m1, m2,
    function(items){
        console.log("new");
        console.log(items);
    },
    function(items){
        console.log("del");
        console.log(items);
    });
*/

// util.mylist.pull("1111", "hoge");
// util.mylist.pull("111", "hoge");
// util.mylist.pull("32310482", "hoge");

// console.log(util.url.pick_movieid("http://www.nicovideo.jp/watch/sm16248256"));
// console.log(util.url.pick_movieid("http://www.nicovideo.jp/watch/sm16248256/videoExplorer"));
// console.log(util.url.pick_mylistid("http://www.nicovideo.jp/mylist/32310482?rss=2.0"));
// console.log(util.url.pick_mylistid("http://www.nicovideo.jp/my/mylist/#/48293317"));
// console.log(util.url.pick_mylistid("http://www.nicovideo.jp/mylist/25306721"));




};

module.exports = test;
