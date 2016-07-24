'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const settings = require('../config/settings.js');

module.exports = links => {
    
    let linksLength = links.length;
    
    let linksDownloaded = 0;
    
    for (let i=0; i<linksLength; i++) {
        
        let currentLink = links[i];
        
        setTimeout(
            () => {
                let linkParts = currentLink.split('/');
                let fileName = path.join(settings.outputDirectoryName, linkParts[linkParts.length-1]);
;                let fileHandler = fs.createWriteStream(fileName);
                
                https.get(currentLink, (stream) => {
                    
                    console.log(`Start downloading: ${fileName} -  ${fileName}`);
                    
                    stream.pipe(fileHandler);
                    
                });
                
            },
            i*settings.waitBeforeNextDownload * 1000
        );
    }
    
    resolve(null);
}