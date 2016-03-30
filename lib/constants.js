"use strict";

var constants = {
    DB_NAME: "main.db",

    TEMPLATE: {
        id: null,               // DB上のID
        title: "",              // マイリストタイトル
        description: "",        // マイリスト説明
        mylistid: "",           // "XXXXXXX"
        items: [{
            title: null,        // 動画タイトル
            movieid: null,      // "smXXXX"
            posted_at: null,    // 投稿日時 new Date
            thumbnail: null,    // URL
            description: null,  // 説明文
        }]
    },

    // getthumbinfoの形式に準拠
    GETTHUMBINFO: {
        video_id: null,
        thumbnail_url: null,
    },

    URL: {
        GETTHUMBINFO: "http://ext.nicovideo.jp/api/getthumbinfo/"
    },

};

module.exports = constants;
