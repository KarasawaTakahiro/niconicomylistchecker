"use strict";

var remote = require("remote");
var fs = remote.require("fs");

var assembler = {};


/*
 * ファイルからテキストを読んでHTMLとしてdomに当てはめる
 *
 * dom:         dom.innerHTMlにファイルの内容を当てはめる
 * file:        読み込むファイルパス
 * encoding:    ファイルのエンコード[utf08]
 */
assembler.loadAndInnerHtml = function loadAndInnerHtml(dom, file, encoding, errCb){
    encoding = typeof encoding !== "undefined" ? encoding : "utf-8";
    if(typeof encoding === "function"){
        errCb = encoding;
        encoding = "utf-8";
    }

    fs.readFile(file, {encoding: encoding}, function(err, data){
        if(!err){
            dom.innerHTML = data;
        }else{
            errCb(err);
        }
    });
};



module.exports = assembler;
