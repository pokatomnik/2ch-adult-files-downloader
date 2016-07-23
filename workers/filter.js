'use strict';

var settings = require('../config/settings.js');

module.exports = json => {
    if ((typeof json !== 'object') || (!json.length) || (json.length === 0)) {
        return { error : 'no data' };
    } else {
        let threads = [];

        for (let i=0, len = json.length; i<len; i++) {
            let currentComment = json[i].comment;
            if (currentComment.match(settings.searchFor) !== null) {
                threads.push(json[i]);
            }
        } 
        return threads;
    }
}