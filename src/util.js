/**
 * @description 工具集
 * @author wulunyi.
 */
'use strict';

export default {
	/**
	 * @description 获取离屏canvas
	 * @param img {object} 图片对象
	 * @param w {number} 离屏宽度
	 * @param h {number} 离屏高度
	 * @return {object} 返回离屏canvas
	 */
	getOffCanvas:(()=>{
		var cache = {};
		var _shift = Array.prototype.shift;

		return function (){
			let img = _shift.call(arguments);
			let w = _shift.call(arguments);
			let h = _shift.call(arguments);

			if(!cache[img.src]){
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');

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

	getSize(dom) {
		let boundData = dom.getBoundingClientRect();

		return {
			height: boundData.height,
			width: boundData.width
		}
	},

	toFixed(num) {
		return Math.floor(num * 100) / 100;
	},

	createDom() {
		let tagName = [].shift.call(arguments) || 'div';
		let options = [].shift.call(arguments) || {};
		let resultDom = document.createElement(tagName);

		for (let propoty in options) {
			resultDom[propoty] = options[propoty];
		}

		return resultDom;
	}
}
