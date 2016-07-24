#!/usr/bin/env node

'use strict';

const catalogList = require('./workers/catalog-list');
const filter = require('./workers/filter');
const getThreadsLinks = require('./workers/get-threads-links.js');
const getPics = require('./workers/get-pics.js');
const downloadFiles = require('./workers/download-files.js');

const settings = require('./config/settings');

catalogList(settings.catalog)

    .then(allThreads => {
        return filter(allThreads);
    })
    .then (threadsNeed => {
        let numbers = [];
        for (let i=0, len=threadsNeed.length; i<len; i++) {
            numbers.push(threadsNeed[i].num);
        }
        
        let threadsLinks = getThreadsLinks(numbers);
        
        return getPics(threadsLinks);
    })
    .then(threadsPosts => {
        let files = [];
        
        let threadsLength = threadsPosts.length;
    
        // Проход по всем тредам
        for (let i=0; i<threadsLength; i++) {
            
            let currentThread = threadsPosts[i];
            
            let postsLengthInCurrentThread = currentThread.length;
            
            // Проход по всем постам в треде
            for (let j=0; j<postsLengthInCurrentThread; j++) {
                
                let currentPost = currentThread[j];
                
                if (currentPost.files.length > 0) {
//                    files.push(currentPost.files);
                    
                    let filesCount = currentPost.files.length;
                    
                    // Проходим по всем файлам в посте
                    for (let k=0; k<filesCount; k++) {
                        
                        let currentFile = currentPost.files[k];
                        
                        files.push(`https://2ch.hk/b/${currentFile.path}`);
                        
                    }
                }
            }
            
        }
    
        return downloadFiles(files);
    })
    .then(() => {
        console.log('downloading started');
    });