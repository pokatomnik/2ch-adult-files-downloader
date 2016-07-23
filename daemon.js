#!/usr/bin/env node

'use strict';

var catalogList = require('./workers/catalog-list');
var filter = require('./workers/filter');

var settings = require('./config/settings');

catalogList(settings.catalog)

    .then( response => {
        return response;
    })
    .then( response => {
        return filter(response);
    })
    .then( result => {
        console.log(result);
    });