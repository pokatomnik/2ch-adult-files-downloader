'use strict';

const settings = require('../config/settings.js');

module.exports = numbers => {
    let links = [];
    numbers.map( (element, index, array) => {
        links.push(`https://${settings.catalog.host}/b/res/${element}.json`);
    });
    return links;
}