/**
 * @description 工具集
 * @author wulunyi.
 */
'use strict';

export default {
    getOffCanvas(img, w, h){
        let canvas = document.createElement('canvas');
        let ctx = offCanvas.getContext('2d');

        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);

        return canvas;
    }
}
