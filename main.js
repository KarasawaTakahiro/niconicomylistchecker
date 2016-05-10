'use strict';

var electron = require('electron');

var db = require("./lib/database");
var constants = require("./lib/constants");

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;


app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    // 画面生成
    mainWindow = new BrowserWindow({width:1300, height:600});
    // トップページ表示
    mainWindow.loadURL('file://' + __dirname + '/view/index.html');
    // mainWindow.loadURL('file://' + __dirname + '/view/feed.html');
    mainWindow.webContents.openDevTools();

    // DBの初期化処理
    db.init(constants.DB_NAME);
    db.construct();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
