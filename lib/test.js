"use strict";


var constants = require("./constants");
var db = require("./database");
var common = require("./../common");


// テストデータ
var m1 = Object.assign({}, constants.template.FEED);
var m2 = Object.assign({}, constants.template.FEED);
var d1 = Object.assign({}, constants.template.ITEM);
var d2 = Object.assign({}, constants.template.ITEM);
var d3 = Object.assign({}, constants.template.ITEM);
var d4 = Object.assign({}, constants.template.ITEM);
var d5 = Object.assign({}, constants.template.ITEM);

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


// 初期化
db.init(constants.DB_NAME);
db.construct();

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

    set: function set(){
        var datas = this.datas;
        db.reg_mylist(datas.m1.mylistid, datas.m1.title, datas.m1.description);
        db.reg_mylist(datas.m2.mylistid, datas.m2.title, datas.m2.description);
        db.reg_movie(datas.d1.movieid, datas.d1.title, new Date(datas.d1.posted_at), datas.d1.thumbnail, datas.d1.description, 1);
        db.reg_movie(datas.d2.movieid, datas.d2.title, new Date(datas.d2.posted_at), datas.d2.thumbnail, datas.d2.description, 1);
        db.reg_movie(datas.d3.movieid, datas.d3.title, new Date(datas.d3.posted_at), datas.d3.thumbnail, datas.d3.description, 1);
        db.reg_movie(datas.d4.movieid, datas.d4.title, new Date(datas.d4.posted_at), datas.d4.thumbnail, datas.d4.description, 2);
        db.reg_movie(datas.d5.movieid, datas.d5.title, new Date(datas.d5.posted_at), datas.d5.thumbnail, datas.d5.description, 2);
    },

    count: function count(){
        db.get("SELECT count(*) FROM items WHERE watched = 0", function(err, row){
            console.log("err: "+err);
            console.log("num: "+row["count(*)"]);
        });

    },

    getCount: function(){
        console.log(db.unwatched_movie_num_at_feed(1));
    },

    allWatchedFeedList: function(){
        console.log("allWatchedFeedList");
        common.allWatchedFeedList(function(feed){
            console.log(feed);
        });
    },

    movieList: function(){
        common.movieList(0, function(data){
            console.log("all unwatch movies");
            console.log(data);
        });
        common.movieList(1, function(data){
            console.log("feed_id is 1 movies");
            console.log(data);
        });
    },

};

module.exports = test;
