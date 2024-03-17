"use strict";
//Js中对象数组的设置以及NodeJs中读取文件属性的对象数组
// https://blog.csdn.net/weixin_36152801/article/details/125051009
const fs = require('fs');
const moment = require('moment');
const idols = {
    hosimiya: { name: '星宮いちご', type: 'cute', brand: 'Angely Sugar' },
    kirija: { name: '霧矢あおい', type: 'cool', brand: 'FUTURING GIRL' },
    shibuki: { name: '紫吹蘭', type: 'sexy', brand: 'SPICY AGEHA' },
};
Object.keys(idols).map((key) => {
    const data = idols[key];
    // => Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ hosimiya: …
    // => No index signature with a parameter of type 'string' was found on type '{ hosimiya: …
    console.log(data);
});
fs.readdir('./', 'utf8', function (err, data) {
    let data_arr = [];
    for (let i = 0; i < data.length; i++) {
        //let obj = {};
        data_arr[i] = {};
        // 异步改同步 增加了闭包操作
        (function (i) {
            fs.stat(data[i], function (err, files) {
                if (files.isFile()) {
                    data_arr[i].type = 'f';
                }
                else {
                    data_arr[i].type = 'd';
                }
                data_arr[i].name = data[i];
                data_arr[i].size = files.size;
                data_arr[i].mtime = files.mtime;
                // data_arr[i].mtime = moment(files.mtime).format('YYYY-MM-DD hh-mm-ss');
            });
        })(i);
        //data_arr.push(obj);
    }
});
