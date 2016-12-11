/**
 * @description 工具集
 * @author wulunyi.
 */
'use strict';
var util = {
	getOffCanvas:(function(){
		var cache = {};
		var _shift = Array.prototype.shift;

		return function (){
			var img = _shift.call(arguments);
			var w = _shift.call(arguments);
			var h = _shift.call(arguments);

			if(!cache[img.src]){
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');

				canvas.width = w;
				canvas.height = h;

				ctx.drawImage(img, 0, 0, w, h);

				cache[img.src] = canvas;
			}

			return cache[img.src];
		}
	})(),

	/**
	 * @description 下载图片
	 * @param src [string] 图片地址
	 * @param cb [function] 回调函数
	 */
	getImg:(function () {
		var _imgCache = {};
		var _shift = Array.prototype.shift;

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
	})(),

	getSize: function(dom) {
		var boundData = dom.getBoundingClientRect();

		return {
			height: boundData.height,
			width: boundData.width
		}
	},

	toFixed: function(num) {
		return Math.floor(num * 100) / 100;
	},

	createDom: function() {
		var tagName = [].shift.call(arguments) || 'div';
		var options = [].shift.call(arguments) || {};
		var resultDom = document.createElement(tagName);

		for (var propoty in options) {
			resultDom[propoty] = options[propoty];
		}

		return resultDom;
	}
};

module.exports = util;
