"use strict";

/*
 * クライアントのviewの操作を行う
 */

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
                    <a class="unpull" href="#" name="${feed_id}"><span class="glyphicon glyphicon-remove"></span></a>\
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




module.exports = client;
