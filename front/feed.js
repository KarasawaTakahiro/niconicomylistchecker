'use strict';

var assembler = require("../front/assembler");

window.onload = function(){

    assembler.loadAndInnerHtml(document.getElementById("frame_left"),
            "./view/parts/feed_list.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtmlSync(document.getElementById("frame_right"),
            "./view/parts/mylist.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtml(document.getElementById("frame_bottom"),
            "./view/parts/toolbox.html", function(err){
                console.log(err);
            });

    assembler.loadAndInnerHtml(document.getElementById("mylist_movies"),
            "./view/parts/feed_contents.html", function(err){
                console.log(err);
            });

};
