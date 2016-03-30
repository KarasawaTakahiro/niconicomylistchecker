'use strict';

var sqlite = require('sqlite3').verbose();
var db = null;


var database = {
    db: null,

    init: function (dbfile) {
        this.db = new sqlite.Database(dbfile);
    },

    isOpen: function(){
        if(this.db){
            return this.db.open;
        }else{
            return false;
        }
    },


    // -- まとめ ------------------------------
    reg_feed: function(feed){
        var feed_id;
        var reg_movie = this.reg_movie;
        var parent_obj = this;

        this.reg_mylist(feed.mylistid, feed.title, feed.description, function(err){
            if(!err){
                feed_id = this.lastID;
                feed.items.forEach(function(item){
                    reg_movie.call(parent_obj, item.movieid, item.title, item.posted_at, item.thumbnail, item.description, feed_id);
                });
            }else{ console.log("failed to reg feed: "+err); }
        });
    },


    // -- CREATE ------------------------------
    construct: function () {
        this.run("CREATE TABLE IF NOT EXISTS feeds (\
                id          INTEGER     PRIMARY KEY AUTOINCREMENT,\
                created_at  DATETIME    DEFAULT (DATETIME('now', 'localtime')),\
                updated_at  TIMESTAMP   DEFAULT (DATETIME('now', 'localtime')),\
                mylistid    VARCHAR(20),\
                title       VARCHAR(45),\
                description VARCHAR(255)\
                );");

        this.run("CREATE TABLE IF NOT EXISTS items (\
                id          INTEGER     PRIMARY KEY AUTOINCREMENT,\
                created_at  DATETIME    DEFAULT (DATETIME('now', 'localtime')),\
                updated_at  TIMESTAMP   DEFAULT (DATETIME('now', 'localtime')),\
                movieid     VARCHAR(20),\
                title       VARCHAR(45),\
                posted_at   DATETIME,\
                thumbnail   VARCHAR(255),\
                description VARCHAR(255),\
                feed_id     INTEGER     NOT NULL,\
                watched     BOOL        DEFAULT false\
                );");
    },

    // -- INSERT ----------------------------
    // マイリスト登録
    reg_mylist: function (mylistid, title, description, cb) {
        this.run("INSERT INTO feeds (mylistid, title, description) VALUES (?, ?, ?)",
                mylistid, title, description, cb);
    },

    // 動画登録
    reg_movie: function (movieid, title, posted_at, thumbnail, description, feed_id) {
        this.run("INSERT INTO items (movieid, title, posted_at, thumbnail, description, feed_id) VALUES (?, ?, ?, ?, ?, ?)",
                movieid, title, posted_at, thumbnail, description, feed_id);
    },


    // -- SELECT -----------------------------
    // 指定したフィードに所属する動画一覧
    movies_in_feed: function (feed_id, cb) {
        /*
         * cb(err, row)
         */
        this.each("SELECT * FROM items WHERE feed_id == ?", feed_id, cb);
    },

    // 未視聴動画すべてを投稿日時の古い順に取得する
    unviewed_movies: function (cb) {
        /*
         */
        this.each("SELECT * FROM items WHERE watched == 'false' ORDER BY posted_at DESC", cb);
    },

    // 全マイリストの全情報を取得
    mylists: function (cb) {
        /*
         * cb(err, row)
         */
        this.each("SELECT * FROM feeds", cb);
    },

    // 指定したマイリストに所属する全動画を投稿日時の古い順に取得する
    movie_from_feed_id: function (feed_id, cb) {
        this.each("SELECT * FROM items WHERE feed_id == ? ORDER BY posted_at ASC", feed_id, cb);
    },

    // マイリストのIDから情報を取得する
    feed_from_mylistid: function (mylistid, cb){
        this.all("SELECT * FROM feeds WHERE mylistid == ?", mylistid, cb);
    },

    // -- UPDATE ----------------------------
    // 動画の視聴状況を変更
    change_watch_status: function (movieid, watch_status, cb) {
        this.run("UPDATE items SET watched = ?, updated_at = ? WHERE id == ?", watch_status, new Date(), movieid, cb);
    },

    // フィードの説明文を更新
    change_feed_desc: function(feed_id, description, cb){
        this.run("UPDATE feeds SET description = ?, updated_at = ? WHERE id == ?", description, new Date(), feed_id, cb);
    },

    // 動画の説明文を更新
    change_item_desc: function(item_id, description, cb){
        this.run("UPDATE items SET description = ?, updated_at = ?  WHERE id == ?", description, new Date(), item_id, cb);
    },

    // フィードのタイトルを更新
    change_feed_title: function(feed_id, title, cb){
        this.run("UPDATE feeds SET title = ?, updated_at = ? WHERE id == ?", title, new Date(), feed_id, cb);
    },


    // -- DELETE ----------------------------
    // 指定したマイリストとそれに所属する全動画
    del_feed_recursively(feed_id){
        var del_movie = this.del_movie;
        var parent_obj = this;

        this.movies_in_feed(feed_id, function(err, row){        // 紐付いた全動画取得
            if(!err){
                del_movie.call(parent_obj, row.movieid, feed_id);
            }
        });
        this.run("DELETE FROM feeds where id = ?", feed_id);
    },

    // 指定した動画
    del_movie(item_id, cb){
        this.run("DELETE FROM items where id = ?", item_id, cb);
    },

    // DB終了
    close: function(){
        this.db.close();
    },


    // -- ラッパ -----------------------------
    run: function(sql){
        var args = Array.prototype.slice.call(arguments);
        args.unshift("run");
        this.exec.apply(this, args);
    },

    all: function(sql){
        var args = Array.prototype.slice.call(arguments);
        args.unshift("all");
        this.exec.apply(this, args);
    },

    each: function(sql){
        var args = Array.prototype.slice.call(arguments);
        args.unshift("each");
        this.exec.apply(this, args);
    },

    // DBの初期化を待ってからクエリを実行する
    exec: function(type, sql){
        var timeout_cnt = 0;
        var TIMEOUT_MAX = 10;
        var parent_obj = this;          // 参照を保存しておく
        var args = Array.prototype.slice.call(arguments, 1);  // このメソッドへの引数はDatabase.runに渡させるものなので退避しておく

        waitForInitialize();

        // 待ちの関数
        function waitForInitialize(){
            if(parent_obj.db == null){                  // 初期化前
                if(TIMEOUT_MAX < timeout_cnt){          // タイムアウト処理
                    console.log("abort query "+type+": DB is closed.");
                    return;
                }
                setTimeout(waitForInitialize, 500);
                timeout_cnt += 1;
            }else{
                execute(type);          // 処理のごと振り分けて実行
            }
        }

        // 振り分けて実行する関数
        function execute(type){
            var func = null;

            switch(type){
                case "run":
                    func = parent_obj.db.run;
                    break;
                case "all":
                    func = parent_obj.db.all;
                    break;
                case "each":
                    func = parent_obj.db.each;
                    break;
                default:
                    return;
            }
            func.apply(parent_obj.db, args);
        }
    },

};

module.exports = database;
