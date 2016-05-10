"use strict";

var common = require("../front/common");

var remote = require("remote");
var db = remote.require("./lib/database");

var feed_list = {};

function syncEvent(){
    document.getElementById("btn_sync").addEventListener("click", function(){
        common.sync(after_reg_new_movies, after_del_rm_movies);
    });
};

function after_reg_new_movies(feed, movies){
    feed_list.gen_unwatch();
}

function after_del_rm_movies(movies){
    // document.getElementById("feed_unwatch").innerHTML = "";
    // feed_list.gen_watched();
    console.log("コの動画が登録解除されました");
}

// 未視聴動画マイリストリストに1つ追加する
function push_unwatch_list(feed){
    console.log(require("remote").require("util").inspect(feed, false, null));
    var inserted_dom = document.getElementById("feed_unwatch");
    var base_html = '\
                <div class="link-panel">\
                    <a href="/feed/${feed_id}">\
                        <span class="unread feed-title">${feed_title}</span>\
                        <span class="badge">${feed_unwatch_movie_num}</span>\
                    </a>\
                </div>';
    var html;
    var tmp_elem = document.createElement("div");           // innerHTMLを使うための一時DOM

    // 値を埋め込む
    html = base_html.replace("${feed_id}", feed.id);
    html = html.replace("${feed_title}", feed.title);
    html = html.replace("${feed_unwatch_movie_num}", feed.unwatch_movie_num);
    // HTML生成
    tmp_elem.innerHTML = html;
    inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
}

// 未視聴動画を含むマイリスト一覧を作成する
feed_list.gen_unwatch = function (){
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
        var tmp_elem = document.createElement("div");           // innerHTMLを使うための一時DOM

        // 値を埋め込む
        html = base_html.replace("${feed_id}", feed.id);
        html = html.replace("${feed_title}", feed.title);
        html = html.replace("${feed_unwatch_movie_num}", feed.unwatch_movie_num);
        // HTML生成
        tmp_elem.innerHTML = html;
        inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
    };
};

// 未視聴動画を含むマイリスト一覧を作成する
feed_list.gen_watched = function gen_watched(){
    var inserted_dom = document.getElementById("feed_watched");
    var base_html;                                      // 雛形HTML
    var feed_id, feed_title, feed_unwatch_movie_num;    // 変化する部分

    inserted_dom.innerHTML = "";                        // 中身を一回消す
    // common.unwatchFeedList(cb_unwatchFeedList);

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
        var tmp_elem = document.createElement("div");           // innerHTMLを使うための一時DOM

        // 値を埋め込む
        html = base_html.replace("${feed_id}", feed.id);
        html = html.replace("${feed_title}", feed.title);
        html = html.replace("${feed_unwatch_movie_num}", feed.unwatch_movie_num);
        // HTML生成
        tmp_elem.innerHTML = html;
        inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
    };
};

/* 未視聴動画を含むマイリストリストに1つ追加する
 */
feed_list.append_unwatch = function (feed, movies){
    push_unwatch_list(feed);
};

feed_list.bind = function bind(){
    syncEvent();
};

module.exports = feed_list;
