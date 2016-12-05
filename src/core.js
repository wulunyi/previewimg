/**
 * @description 图片预览核心算法库
 * @author wulunyi
 */
'use strict';
var getImg = (function () {
    var _imgCache = {};

    return function () {
        var src = _shift.call(arguments),
            cb = _shift.call(arguments);

        if(!_imgCache[src]){
            var imgObj = document.createElement('img');

            imgObj.addEventListener('load', ()=> {
                _imgCache[src] = imgObj;
                cb && cb(imgObj);
            });

            imgObj.addEventListener('error', ()=> {
                console.log('-> 图片加载失败,请检查图片是否存在');
            });

            imgObj.src = src;
        }

        cb(_imgCache[src]);
    }
})();

export default function (canvas) {
    var _CANVAS = canvas;
    var _CXT = canvas.getContext('2d');

    var _shift = Array.prototype.shift;

    var _drawData = {
        sw: 0,
        sh: 0,
        ox: 0,
        oy: 0,
        px: 0,
        py: 0,
        scale: 1
    };

    var _defaultOptions = {
        maxScale: 4,
        minScale: 1,
        doubleTapScale: 2,
        rotate: false
    };

    var _getOffCanvas = (function () {
        var cache = {};

        return function (src, fn) {

        }
    })();

    return {
        scale: '',
        pan: '',
        reset: ''
    }
}
var getData = {

};

var commands = {
    big: function () {

    },
    small: function () {

    },
    pan: function(){

    }
};

function transform(){
    var _transformList = [];
    var _commandStack = [];

    return{
        add: function(command, data){
            _transformList.push(command.bind(this, data));
            _commandStack.push(command.bind(this, data));

            return this;
        },
        draw: function () {
            var len = _transformList.length;

            while(len > 0){
                draw(_transformList[len--]());
            }

            return this;
        },
        undo: function () {
            var len = _commandStack.length;

            if(len){
                _commandStack.shift()();
            }
        }
    }
}

function draw(){

}

