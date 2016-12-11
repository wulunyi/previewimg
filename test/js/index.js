/**
 * @description Created by wulunyi on 16/10/5.
 * @author wulunyi
 */
'use strict';

// import 'css/index.scss';
// import PreViewWrap from 'src/PreViewWrap';
// import Hammer      from 'hammerjs';
// import Immutable   from 'immutable';

// window.Immutable = Immutable;

// function preViewImg(src){
//     let h = window.innerHeight;
//     let w = window.innerWidth;
//
//     let size = {
//         width: w,
//         height: h
//     };
//
//     let rootDom = document.createElement('div');
//
//     rootDom.style.width    = '100vw';
//     rootDom.style.height   = '100vh';
//     rootDom.style.position = 'absolute';
//     rootDom.style.top      = 0;
//     rootDom.style.left     = 0;
//     rootDom.style.zIndex   = 10000;
//
//     let preViewWrap = new PreViewWrap(size, src);
//
//     rootDom.appendChild(preViewWrap.canvas);
//     document.body.appendChild(rootDom);
// }

// preViewImg('https://si.geilicdn.com/im208863409-1474170850706-2868960.jpg');
var previewimg = require('../../index');
console.log(previewimg);

previewimg.show('https://avatars3.githubusercontent.com/u/3277634?v=3&s=460');