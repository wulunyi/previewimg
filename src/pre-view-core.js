/**
 * @description Created by wulunyi on 16/12/11.
 * @author wulunyi
 */
'use strict';

require('src/animation');
var util = require('src/util');

function PreViewImg(canvas, size, src, options) {
	if (canvas.getContext) {
		//解决android的图片预览模糊的问题
		var dpr = window.devicePixelRatio || 1;
		dpr = dpr > 2 ? 1.5 : dpr;

		var w = size.width * dpr;
		var h = size.height * dpr;

		// 解决三星等出现横屏后突然竖屏图像异常的问题
		if (w > h) {
			[w, h] = [h, w];
		}

		// 面板容器宽高
		canvas.width = w;
		canvas.height = h;

		// 绘制面板大小
		this.w = w;
		this.h = h;

		this.ratio = dpr;

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.offCanvas = null;

		// 可选参数
		var defaultOptions = {
			maxScale: 4,// 最大缩放边界
			minScale: 1,// 最小缩放边界
			doubleTapScale: 2 // 双击缩放大小
			//rotate: false,
		};

		this.options = options || defaultOptions;

		this.sw = 0;// 绘制宽高
		this.sh = 0;// 绘制宽高

		this.ox = this.w / 2;// 绘制原点
		this.oy = this.h / 2;// 绘制原点

		this.px = 0;// 绘制开始坐标
		this.py = 0;// 绘制开始坐标

		this.scale = 1;// 绘制缩放比

		this.timer = null;// 动画返回锚点

		this.cache = {};

		this._init(src);// 初始化
	} else {
		console.warn('参数错误,需要canvas dom');
	}
}

PreViewImg.prototype._init = function (src) {
	this._loading('start');// 开启加载中动画...

	var self = this;

	self._pullImg(src, (imgObj)=> {
		self._loading('end')
			._getInitData(imgObj)
			._draw(imgObj);
	});
};

PreViewImg.prototype._draw = function (imgObj) {
	var ctx = this.ctx;

	if (imgObj != undefined) {
		this.offCanvas = util.getOffCanvas(imgObj, this.sw, this.sw);
	}

	ctx.clearRect(0, 0, this.w, this.h);
	ctx.save();
	ctx.translate(this.ox, this.oy);
	ctx.scale(this.scale, this.scale);
	ctx.drawImage(this.offCanvas, this.px, this.py, this.sw, this.sh);
	ctx.restore();

	return this;
};

PreViewImg.prototype._getInitData = function (imgObj) {
	// 图片自身的宽高
	var sw = imgObj.width;
	var sh = imgObj.height;

	// 面板的宽高
	var dw = this.w;
	var dh = this.h;

	var ratio = dw / sw;// 图片绘制到面板本身的缩放比

	// 已宽为准进行缩放后图片在面板的高度不超过面板本身的高度
	if (ratio * sh <= dh) {
		this.sw = dw;
		this.sh = util.toFixed(sh * ratio);
	} else {
		ratio = dh / sh;

		this.sh = dh;
		this.sw = ratio * sw;
	}

	this.px = -(this.sw / 2);
	this.py = -(this.sh / 2);

	return this;
};

PreViewImg.prototype._loading = function (command) {
	var self = this;
	var w = self.w;
	var h = self.h;
	var ctx = self.ctx;
	var count = 0;// 计数

	cancelAnimationFrame(this.timer);

	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#ffffff';

	var base = self.ratio;

	/**
	 * @description 加载动画
	 */
	function loadingAnimation() {
		ctx.clearRect(0, 0, w, h);
		ctx.save();
		ctx.translate(w / 2, h / 2);
		ctx.rotate((base / 2) * 5 * count * Math.PI / 180);

		for (var i = 0; i < 9; i++) {
			ctx.save();

			ctx.rotate(36 * i * Math.PI / 180);
			ctx.beginPath();
			ctx.arc(30 * base, 30 * base, (1 + i) * base, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.restore();
		}

		ctx.restore();

		count++;

		self.timer = requestAnimationFrame(loadingAnimation);
	}

	if (command !== 'end') {
		loadingAnimation();
	}

	return this;
};

PreViewImg.prototype._pullImg = function() {
	var cache = this.cache;
	var src = [].shift.call(arguments) || '';
	var cb = [].shift.call(arguments);

	if (cache[src]) {
		cb && cb(cache[src]);
	} else {
		var imgObj = document.createElement('img');

		imgObj.addEventListener('load', ()=> {
			cache[src] = imgObj;

			cb && cb(imgObj);
		});

		imgObj.addEventListener('error', ()=> {
			console.log('-> 图片加载失败,请检查图片是否存在');
		});

		imgObj.src = src;
	}
};

PreViewImg.prototype.animation = function(toScale) {
	cancelAnimationFrame(this.timer);

	var times = 10;
	var speed = (toScale - this.scale) / times;
	var base = this.scale;
	var count = 1;
	var self = this;

	/**
	 * @description 动画
	 */
	function innerAnimate() {
		if (count <= times) {
			var ratio = base + count * speed;

			self.scaling(ratio);
			count++;
			self.timer = requestAnimationFrame(innerAnimate);
		} else {
			self.scaling(toScale);

			cancelAnimationFrame(self.timer);
		}
	}

	innerAnimate();
};

PreViewImg.prototype.scaling = function(scale, tx, ty) {
	tx = this.ratio * tx;
	ty = this.ratio * ty;

	if (this.offCanvas == null) {
		return this;
	}

	if (scale === null) {
		var toScale = 0;

		if (this.scale == 1) {
			this._getBiggerOriginPoint(tx, ty, this.options.doubleTapScale);
			toScale = this.options.doubleTapScale;
		} else {
			this._getScaleSmallerPoint();
			toScale = 1;
		}

		this.animation(toScale);
	} else if (scale >= 1) {
		this.scale = scale;
		this._draw();
	}

	return this;
};

PreViewImg.prototype.reset = function(){
	if(this.scale !== 1){
		this._getScaleSmallerPoint();
		var toScale = 1;

		this.animation(toScale);
	}
};

PreViewImg.prototype.scaled = function(scale, x, y) {
	x = this.ratio * x;
	y = this.ratio * y;

	var toScale = this.scale * scale;

	if (scale < 1) {
		this._getScaleSmallerPoint();
	} else {
		if (this.panchX != x && this.panchY != y) {
			this.panchX = x;
			this.panchY = y;

			this._getBiggerOriginPoint(x, y, toScale);
		}

	}

	if (toScale > 4) {
		toScale = 4;
	}

	this.scaling(toScale);
};

PreViewImg.prototype._getScaleSmallerPoint = function () {
	var scale = this.scale;
	if (scale == 1) {
		return;
	}

	var cux = this.px * this.scale + this.ox;
	var cuy = this.py * this.scale + this.oy;

	var originPx = -this.sw / 2 + this.w / 2;
	var originPy = -this.sh / 2 + this.h / 2;

	this.ox = (cux - originPx * scale) / (1 - scale);
	this.oy = (cuy - originPy * scale) / (1 - scale);

	this.px = originPx - this.ox;
	this.py = originPy - this.oy;

	return this;
};

PreViewImg.prototype._getBiggerOriginPoint = function(tx, ty, scale) {
	var cux = this.px * this.scale + this.ox;
	var cuy = this.py * this.scale + this.oy;

	var maxX = cux + this.sw;
	var maxY = cuy + this.sh;

	if (this.sw * scale < this.w) {
		this.ox = this.w / 2;
	} else if (tx >= cux && tx <= maxX) {
		this.ox = tx;
	} else if (tx < cux) {
		this.ox = cux;
	} else if (tx > maxX) {
		this.ox = maxX;
	}

	if (this.sh * scale < this.h) {
		this.oy = this.h / 2;
	} else if (ty >= cuy && ty <= maxY) {
		this.oy = ty;
	} else if (ty <= cuy) {
		this.oy = cuy;
	} else if (ty >= maxY) {
		this.oy = maxY;
	}

	this.px = (cux - this.ox) / this.scale;
	this.py = (cuy - this.oy) / this.scale;

	return this;
};

PreViewImg.prototype.moving = function(offsetX, offsetY) {
	offsetX = this.ratio * offsetX;
	offsetY = this.ratio * offsetY;

	if (this.offCanvas == null) {
		return false;
	}

	var curX = this.px * this.scale + this.ox + offsetX;
	var curY = this.py * this.scale + this.oy + offsetY;

	var curMaxY = curY + this.sh * this.scale;
	var curMaxX = curX + this.sw * this.scale;

	var MaxX = this.w - this.sw * this.scale;
	var MaxY = this.h - this.sh * this.scale;

	// 5是用来做垂直滑动,可能带动的横向滑动的容错处理
	if ((curX >= 0 && offsetX > 5) || (curX <= MaxX && offsetX < -5) || this.scale <= 1) {
		return false;
	}

	if (curY < 0 || curMaxY > this.h) {
		if ((curY <= 0 && curY >= MaxY) || (curY < MaxY && offsetY > 0) || (curY > 0 && offsetY < 0)) {
			this.oy += offsetY;
		}
	}

	if (curX < 0 || curMaxX > this.w) {
		if ((curX <= 0 && curX >= MaxX) || (curX < MaxX && offsetX > 0) || (curX > 0 && offsetX < 0)) {
			this.ox += offsetX;
		}
	}

	this._draw();

	return true;
};



module.exports = PreViewImg;