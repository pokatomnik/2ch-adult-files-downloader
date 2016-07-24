'use strict';

const https = require('https');

module.exports = threads => {
    
    let threadsRaws = [];
    
    return new Promise((resolve, reject) => {
        
        let threadsCount = threads.length;
        let threadsDownloaded = 0;
        
        for (let i=0; i<threadsCount; i++) {
            https.get(threads[i], stream => {
                let response = '';
                
                stream.on('data', piece => {
                   response += piece; 
                });
                
                stream.on('end', () => {
                    threadsRaws.push(JSON.parse(response).threads[0].posts);
                    
                    threadsDownloaded++;
                    
                    if (threadsDownloaded === threadsCount) {
                        resolve(threadsRaws);
                    }
                });
                
            });
            
        }
    });
}