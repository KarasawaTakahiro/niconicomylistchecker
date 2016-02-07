'use strict';

var sqlite = require('sqlite3').varbose();
var db = null;

var db_init = function (dbfile) {
    db = new sqlite.Database(dbfile);
};

var db_construct = function () {
    db.run("CREATE TABLE feeds (\
            id          INT         PRIMARY KEY AUTO_INCREMENT,\
            created_at  DATETIME,\
            updated_at  TIMESTAMP,\
            feedid      VARCHAR(20),\
            title       VARCHAR(45),\
            description VARCHAR(255)\
            );");
    db.run("CREATE TABLE items (\
            id          INT         PRIMARY KEY AUTO_INCREMENT,\
            created_at  DATETIME,\
            updated_at  TIMESTAMP,\
            smid        VARCHAR(20),\
            title       VARCHAR(45),\
            posted_at   DATETIME,\
            thumbnail   VARCHAR(255),\
            feed_id     INT,\
            watched     BOOL\
            );");
};

// マイリスト一覧
var db_mylists = function (cb) {
    db.all("SELECT * FROM feeds", cb(err, rows));
};

// マイリストIDの動画
var db_movie_from_mylistid = function (mylistid, cb) {
    db.run("SELECT * FROM items WHERE feed_id = ?", mylistid, cb(err, rows));
};

// マイリスト登録
var db_reg_mylist = function (cb) {
    db.run("INSERT INTO mylists (feedid, title, description) VALUES (?, ?, ?)",
            );

};
