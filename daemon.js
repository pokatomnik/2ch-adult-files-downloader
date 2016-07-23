#!/usr/bin/env node

'use strict';

var catalogList = require('./workers/catalog-list');
var filter = require('./workers/filter');
var getPicsLinks = require('./workers/get-pics-links.js');

var settings = require('./config/settings');

catalogList(settings.catalog)

    .then( allThreads => {
        return filter(allThreads);
    })
    .then( threadsNeed => {
        console.log(threadsNeed);
        return threadsNeed;
    })
    .then ( threadsNeed => {
        let numbers = [];
        for (let i=0, len=threadsNeed.length; i<len; i++) {
            numbers.push(threadsNeed[i].num);
        }
        
        return numbers;
    })
    .then( numbers => {
        return getPicsLinks(numbers);
    })
    .then( links => {
        console.log(links);
    });