"use strict";

var common = require("./../front/common");


// PULLボタンを押した時のバインド
function pullEvent(){
    document.getElementById("pull_submit").addEventListener("click", function(){
        var url_tb = document.querySelector("#pull_parts input");
        common.reg_new_feed(url_tb.value);
        url_tb.value = "";
        return false;
    });
};

function bind(){
    pullEvent();
};

exports.bind = bind;
