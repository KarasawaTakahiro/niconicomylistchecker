"use strict";

var constants = {
    DB_NAME: "main.db",

    TEMPLATE: {
        id: null,
        title: "",
        description: "",
        mylistid: "",
        items: [{
            title: null,
            movieid: null,
            posted_at: null,
            thumbnail: null,
            description: null,
        }]
    },

};

module.exports = constants;
