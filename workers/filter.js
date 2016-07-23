'use strict';

module.exports = json => {
    return new Promise((resolve, reject) => {
        if ((typeof json !== 'object') || (!json.length) || (json.length === 0)) {
            reject({
                error : 'no data'
            });
        } else {
            let comments = [];

            for (let i=0, len = json.length; i<len; i++) {
                comments.push(json[i].comment);
            } 
            resolve(comments);
        }
    });
}