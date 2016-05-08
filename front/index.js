'use strict';

var remote = require('remote');

var client = require("../front/client");
var common = require("../front/common");
var assembler = require("../front/assembler");

var constants = remote.require("./lib/constants");


var init = function(){
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

    assembler.loadAndInnerHtml(document.getElementById("frame_left"),
    // HTML構成
    assembler.loadAndInnerHtmlSync(document.getElementById("frame_left"),
            "./view/parts/feed_list.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtmlSync(document.getElementById("frame_right"),
            "./view/parts/dashboard.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtmlSync(document.getElementById("frame_bottom"),
            "./view/parts/toolbox.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtmlSync(document.getElementById("dashboard"),
            "./view/parts/feed_contents.html", function(err){
                console.log(err);
            });

    // bind
    require("../front/toolbox").bind();
};

