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
};

module.exports = test;
