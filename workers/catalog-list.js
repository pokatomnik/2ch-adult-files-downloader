'use strict';

var https = require('https');

module.exports = (query) => {
    return new Promise((resolve, reject) => {
        https.get(
            query,
            
            (stream) => {
                
                var response = '';
                
                stream.on('data', (data) => {
                    response += data;
                });
                
                stream.on('end', () => {
                    resolve(JSON.parse(response).threads);          
                });
            }
        )
            .on('error', (err) => {
                reject({
                    error : err
                });
            });
    });
}