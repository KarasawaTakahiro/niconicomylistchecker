'use strict';

var FeedParser = require("feedparser");
var http = require("http");
var util = require("./util");

var URL_RSS_FRONT = "http://www.nicovideo.jp/mylist/";
var URL_RSS_BACK = "?rss=2.0";


var rss = {
    get_mylist_rss: function(mylist_id, callback){
        var url = URL_RSS_FRONT + mylist_id + URL_RSS_BACK;
        var feedMeta;
        var feedData = Object.assign({}, util.mylist.template);
        var feedItem = Object.assign({}, util.mylist.template.items[0]);
        feedData.items.length = 0;

        http.get(url, function(res){
            res.pipe(new FeedParser({}))
                .on("meta", function(meta){
                    // メタデータ取得
                    feedMeta = meta;
                })
                .on("readable", function(){
                    // channelを解析
                    var stream = this;
                    var item;

                    // chunkデータを保存
                    while(item = stream.read()){
                        var i = Object.assign({}, feedItem);
                        i.title = item.title;
                        i.movieid = util.url.pick_movieid(item.link);
                        i.posted_at = item.pubDate;
                        i.thumbnail = item.thumbnail;
                        i.description = item.description;
                        feedData.items.push(i);
                    }
                })
                .on("end", function(){
                    // 全部の解析終了
                    feedData.title = feedMeta.title;
                    feedData.description = feedMeta.description;
                    feedData.mylistid = util.url.pick_mylistid(feedMeta.link);
                    callback(feedData);     // callback呼び出し
                });
        });
    },
};

module.exports = rss;
