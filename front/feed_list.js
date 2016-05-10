"use strict";

var common = require("../front/common");

var remote = require("remote");
var db = remote.require("./lib/database");

var feed_list = {};

function syncEvent(){
    document.getElementById("btn_sync").addEventListener("click", function(){
        common.sync();
    });
};

// 未視聴動画を含むマイリスト一覧を作成する
feed_list.gen_unwatch = function gen_unwatch(){
    var inserted_dom = document.getElementById("feed_unwatch");
    var base_html;                                      // 雛形HTML
    var feed_id, feed_title, feed_unwatch_movie_num;    // 変化する部分

    inserted_dom.innerHTML = "";                        // 中身を一回消す
    common.unwatchFeedList(cb_unwatchFeedList);

    // 未視聴動画を持つフィードを得たした時の動作
    function cb_unwatchFeedList(feed){
        base_html = '\
                    <div class="link-panel">\
                    <a href="/feed/${feed_id}">\
                    <span class="unread feed-title">${feed_title}</span>\
                    <span class="badge">${feed_unwatch_movie_num}</span>\
                    </a>\
                    </div>';
        var html;
        var tmp_elem = document.createElement("div");           // innnerHTMLを使うための一時DOM

        // 値を埋め込む
        html = base_html.replace("${feed_id}", feed.id);
        html = html.replace("${feed_title}", feed.title);
        html = html.replace("${feed_unwatch_movie_num}", feed.unwatch_movie_num);
        // HTML生成
        tmp_elem.innerHTML = html;
        inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
    };
};

feed_list.bind = function bind(){
    syncEvent();
};

module.exports = feed_list;
