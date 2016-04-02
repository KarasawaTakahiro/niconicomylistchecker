"use strict";

/*
 * クライアントのviewの操作を行う
 */

var util = require("./lib/util");


var client = {};


// 未視聴動画を含むマイリスト一覧を作成する
client.unwatch_mylist_list = function (){
    var inserted_dom = document.getElementById("feed_list_unread");
    var base_html;                                      // 雛形HTML
    var feed_id, feed_title, feed_unwatch_movie_num;    // 変化する部分

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


// マイリスト一覧
client.allWatchedMylistList = function(){
    var inserted_dom = document.getElementById("feed-list-read");
    var base_html;                                      // 雛形HTML
    var feed_id, feed_title, feed_unwatch_movie_num;    // 変化する部分

    common.allWatchedFeedList(cb_allWatchedFeedList);

    // 未視聴動画を持つフィードを得たした時の動作
    function cb_allWatchedFeedList(feed){
        base_html = '\
            <div class="item">\
                <div class="link-panel feed-title">\
                    <a href="/feed/${feed_id}">${feed_title}</a>\
                </div>\
                <div class="feed-unpull">\
                    <a class="unpull" href="#" name="${feed_id}"><i class="icon-remove-sign"></i></a>\
                </div>\
            </div>';
        var html;
        var tmp_elem = document.createElement("div");           // innnerHTMLを使うための一時DOM

        // 値を埋め込む
        html = base_html.replace("${feed_id}", feed.id);
        html = html.replace("${feed_title}", feed.title);
        // HTML生成
        tmp_elem.innerHTML = html;
        inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
    };
};

client.movieList = function movieList(feed_id){
    var inserted_dom = document.getElementById("list_body");
    var base_html;                                      // 雛形HTML

    common.movieList(feed_id, cb_movieList);

    // 未視聴動画を持つフィードを得たした時の動作
    function cb_movieList(movie){
        base_html = '\
            <ul class="list-inline">\
                <li class="title link-panel">\
                    ${a_tag}\
                </li>\
                <li class="pubDate">${item_posted_at}</li>\
                <li class="mark link-panel"><a href="#" onclick="autoMark(${item_feed_id}, ${item_id})"><i class="icon-${direction}load" title="ここまで見た！"></i></a></li>\
            </ul>';

        var a_unwatch = '<a class="unread" id="${item_id}" href="${item_link}" target="_blank" onclick="mark_read(this, ${item_id})">${item_title}</a>';
        var a_watched = '<a class="read" id="${item_id}" href="${item_link}" target="_blank">${item_title}</a>';
        var a_tag;
        var direction;
        var html;
        var tmp_elem = document.createElement("div");           // innnerHTMLを使うための一時DOM

        // タイトル部分を決める
        a_tag = movie.watched ? a_watched : a_unwatch;
        html = util.sprintf(base_html, {"${a_tag}":a_tag});
        direction = feed_id ? "down" : "up";                    // 矢印の方向
        // 値を埋め込む & HTML生成
        tmp_elem.innerHTML = util.sprintf(html, {
            "${item_id}":movie.id,
            "${item_link}":movie.link,
            "${item_title}":movie.title,
            "${item_feed_id}":movie.feed_id,
            "${item_posted_at}":movie.posted_at,
            "${direction}":direction,
        });
        inserted_dom.appendChild(tmp_elem.firstElementChild);   // 必要なのは中身だけ
    };
};


module.exports = client;
