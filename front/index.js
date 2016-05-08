'use strict';

var remote = require('remote');

var client = require("../front/client");
var common = require("../front/common");

var db = remote.require("./lib/database");
var constants = remote.require("./lib/constants");


var init = function(){
    db.init(constants.DB_NAME);
    db.construct();
    console.log("initilized");
}

init();


// var test = remote.require("./lib/test");
// test.set();

window.onload = function(){
    console.log("onload");
    client.unwatch_mylist_list();
    client.allWatchedMylistList();
    client.movieList(0);

    common.bind_my_funcs();
};
