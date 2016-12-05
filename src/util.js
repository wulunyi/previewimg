/**
 * @description 工具集
 * @author wulunyi.
 */
'use strict';

export default {
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
