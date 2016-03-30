'use strict';

var rss = module.exports = {};

var FeedParser = require("feedparser");
var http = require("http");
var xml2js = require("xml2js");

var constants = require("./constants");
var util = require("./util");


rss.get_mylist_rss = function(mylist_id, callback){
    var get_getthumbinfo = this.get_getthumbinfo;
    var url = constants.url.RSS_FRONT + mylist_id + constants.url.RSS_BACK;
    var feedMeta;
    var feedData = Object.assign({}, constants.template.FEED);
    var feedItem = Object.assign({}, constants.template.ITEM);

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
                i.posted_at = new Date(item.pubDate);
                i.description = item.description;
                function waitForGetthumbinfo(){         // サムネイルURL取得待ち
                    get_getthumbinfo(i.movieid, function(thumbinfo){
                        if(thumbinfo.thumbnail_url == false){
                            setTimeout(waitForGetthumbinfo, 50);
                            return;
                        }
                        i.thumbnail = thumbinfo.thumbnail_url;
                    });
                };
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
};

rss.get_getthumbinfo = function(smid, callback){
    var url = constants.url.GETTHUMBINFO + smid;
    var thumbinfo = Object.assign({}, constants.template.GETTHUMBINFO);

    http.get(url, function(res){
        res.on("data", function(chunk){
            data += chunk
        });
        res.on("end", function(){
            xml2js.parseString(data, function(err, parsed){
                var maindata = parsed.nicovideo_thumb_response.thumb[0];
                thumbinfo.video_id = maindata.video_id[0];
                thumbinfo.thumbnail_url = maindata.thumbnail_url[0];
                callback(thumbinfo);
            });
        });
    });
};
