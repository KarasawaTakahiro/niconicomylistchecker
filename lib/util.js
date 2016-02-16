'use strict';

var lodash = require("lodash");

var util = {
    // マイリスト系
    mylist: {
        obj_diff: function(m1, m2, cb_new, cb_del){
            if(m1.mylistid == m2.mylistid){
                var items_new = lodash.differenceWith(m2.items, m1.items, lodash.isEqual);
                var items_del = lodash.differenceWith(m1.items, m2.items, lodash.isEqual);

                cb_new(items_new);
                cb_del(items_del);
            }
        },
    },




    // URL系
    url: {
    },

};

module.exports = util;
