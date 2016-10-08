/**
 * @description 工具集
 * @author wulunyi.
 */
'use strict';

export default {
    getOffCanvas(img, w, h){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);

        return canvas;
    },

    getSize(dom) {
        let boundData = dom.getBoundingClientRect();

        return {
            height: boundData.height,
            width: boundData.width
        }
    },

    toFixed(num) {
        return Math.floor(num * 100) / 100;
    }
}
