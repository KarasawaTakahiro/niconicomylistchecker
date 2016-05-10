"use strict";

var common = require("./../front/common");
var feed_list = require("./feed_list");


// PULLボタンを押した時のバインド
function pullEvent(){
    document.getElementById("pull_submit").addEventListener("click", function(){
        var url_tb = document.querySelector("#pull_parts input");
        common.reg_new_feed(url_tb.value, cb_after_pull);
        url_tb.value = "";
        return false;
    });
};

// PULLあとのCB
function cb_after_pull(data){
    feed_list.gen_unwatch();
    console.log(data);
}

function bind(){
    pullEvent();
};

exports.bind = bind;
