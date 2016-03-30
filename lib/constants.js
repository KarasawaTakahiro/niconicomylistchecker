"use strict";

var constants = {
    DB_NAME: "main.db",

    template: {
        FEED: {
            id: null,               // DB上のID
            title: "",              // マイリストタイトル
            description: "",        // マイリスト説明
            mylistid: "",           // "XXXXXXX"
            items: [],
        },
        ITEM: {
            title: null,        // 動画タイトル
            movieid: null,      // "smXXXX"
            posted_at: null,    // 投稿日時 new Date
            thumbnail: null,    // URL
            description: null,  // 説明文
        },
        GETTHUMBINFO: {         // getthumbinfoの形式に準拠
            video_id: null,
            thumbnail_url: null,
        },
    },


    url: {
        GETTHUMBINFO:   "http://ext.nicovideo.jp/api/getthumbinfo/",
        RSS_FRONT:      "http://www.nicovideo.jp/mylist/",
        RSS_BACK:       "?rss=2.0",
    },

};

module.exports = constants;
