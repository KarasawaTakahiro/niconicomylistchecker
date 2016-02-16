'use strict';

var sqlite = require('sqlite3').verbose();
var db = null;


var database = {
    init: function (dbfile) {
        db = new sqlite.Database(dbfile);
    },

    construct: function () {
        db.run("CREATE TABLE IF NOT EXISTS feeds (\
                id          INTEGER     PRIMARY KEY AUTOINCREMENT,\
                created_at  DATETIME,\
                updated_at  TIMESTAMP,\
                mylistid    VARCHAR(20),\
                title       VARCHAR(45),\
                description VARCHAR(255)\
                );");

        db.run("CREATE TABLE IF NOT EXISTS items (\
                id          INTEGER     PRIMARY KEY AUTOINCREMENT,\
                created_at  DATETIME,\
                updated_at  TIMESTAMP,\
                movieid     VARCHAR(20),\
                title       VARCHAR(45),\
                posted_at   DATETIME,\
                thumbnail   VARCHAR(255),\
                description VARCHAR(255),\
                feed_id     INTEGER,\
                watched     BOOL        DEFAULT false\
                );");
    },

    // -- INSERT ----------------------------
    // マイリスト登録
    reg_mylist: function (mylistid, title, description, cb) {
        db.run("INSERT INTO feeds (mylistid, title, description) VALUES (?, ?, ?)",
                mylistid, title, description, cb);
    },

    // 動画登録
    reg_movie: function (movieid, title, posted_at, thumbnail, description, feed_id) {
        db.run("INSERT INTO items (movieid, title, posted_at, thumbnail, description, feed_id) VALUES (?, ?, ?, ?, ?, ?)",
                movieid, title, posted_at, thumbnail, description, feed_id);
    },


    // -- SELECT -----------------------------
    // 指定したフィードに所属する動画一覧
    movies_in_feed: function (feed_id, cb) {
        /*
         * cb(err, row)
         */
        db.each("SELECT * FROM items WHERE feed_id == ?", feed_id, cb);
    },

    // 未視聴動画すべてを投稿日時の古い順に取得する
    unviewed_movies: function (cb) {
        /*
         */
        db.each("SELECT * FROM items WHERE watched == 'false' ORDER BY posted_at DESC", cb);
    },

    // 全マイリストの全情報を取得
    mylists: function (cb) {
        // db.each("SELECT * FROM feeds", cb);
        db.each("SELECT * FROM feeds", cb);
    },

    // 指定したマイリストに所属する全動画を投稿日時の古い順に取得する
    movie_from_feed_id: function (feed_id, cb) {
        db.each("SELECT * FROM items WHERE feed_id == ? ORDER BY posted_at ASC", feed_id, cb);
    },

    // マイリストのIDから情報を取得する
    feed_from_mylistid: function (mylistid, cb){
        db.all("SELECT * FROM feeds WHERE mylistid == ?", mylistid, cb);
    },

    // -- UPDATE ----------------------------
    // 動画の視聴状況を変更
    change_watch_status: function (movieid, watch_status, cb) {
        db.run("UPDATE items SET watched = ? WHERE id == ?", watch_status, movieid, cb);
    },

    // -- DELETE ----------------------------
    // 指定したマイリストとそれに種族する全動画


    // 指定した動画


    // DB終了
    close: function(){
        db.close();
    },

};

module.exports = database;
