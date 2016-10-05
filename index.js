'use strict';

import 'src/animation';// 动画兼容

class preViewImg{
    constructor(canvas, img){
        let size = PreViewImg.getSize(canvas);// 获取初始高度数据
        canvas.width = size.width;
        canvas.height = size.height;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.offCanvas = null;

        this.w = size.width;//面板大小
        this.h = size.height;//面板大小

        this.sw = 0;// 绘制宽高
        this.sh = 0;// 绘制宽高

        this.ox = this.w / 2;// 绘制原点
        this.oy = this.h / 2;// 绘制原点

        this.px = 0;// 绘制开始坐标
        this.py = 0;// 绘制开始坐标

        this.scale = 1;// 绘制缩放比

        this.timer = null;// 动画返回锚点
    }

    _init(){

    }

    big(){

    }

    small(){

    }

    static getOffCanvas(imgObj, width, height){
        let canvas = document.createElement('canvas');
        let ctx = offCanvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(imgObj, 0, 0, width, height);

        return canvas;
    }
}

export default preViewImg;
