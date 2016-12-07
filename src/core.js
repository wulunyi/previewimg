/**
 * @description 图片预览核心算法库
 * @author wulunyi
 */
'use strict';

import util from './util';

export default function (canvas, src, option) {
	//缓存基础数据
	var _CANVAS = canvas;
	var _CXT = canvas.getContext('2d');
	var _OFF_CANVAS = null;
	var _OPTIONS = {};

	//绘制数据
	var _drawData = {
		w: _CANVAS.width,//面板的宽
		h: _CANVAS.height,//面板的高
		sw: 0,//绘制图片宽度
		sh: 0,//绘制图片高度
		ox: 0,//绘制原点x
		oy: 0,//绘制原点y
		px: 0,//绘制起点x
		py: 0,//绘制起点y
		scale: 1//绘制缩放
	};

	//默认设置
	var _defaultOptions = {
		maxScale: 4,//最大缩放比
		minScale: 1,//最小缩放比
		doubleTapScale: 2//双击缩放比
	};

	//重设参数
	if(option){
		for(let property in _defaultOptions){
			if(option[property]){
				_OPTIONS[property] = option[property]
			}else {
				_OPTIONS[property] = _defaultOptions[property];
			}
		}
	}else{
		_OPTIONS = _defaultOptions;
	}

	//初始化
	(function init(src) {
		util.getImg(src, function (imgObj) {
			_initDrawData(imgObj);
			_OFF_CANVAS = util.getOffCanvas(imgObj, _drawData.sw, _drawData.sh);
			_draw();
		});
	})(src);

	function _initDrawData(imgObj) {
		// 图片自身的宽高
		let sw = imgObj.width;
		let sh = imgObj.height;

		// 面板的宽高
		let dw = _CANVAS.width;
		let dh = _CANVAS.height;

		let ratio = dw / sw;// 图片绘制到面板本身的缩放比

		// 已宽为准进行缩放后图片在面板的高度不超过面板本身的高度
		if (ratio * sh <= dh) {
			_drawData.sw = dw;
			_drawData.sh = util.toFixed(sh * ratio);
		} else {
			ratio = dh / sh;

			_drawData.sh = dh;
			_drawData.sw = ratio * sw;
		}

		_drawData.px = -(_drawData.sw / 2);
		_drawData.py = -(_drawData.sh / 2);
	}

	//绘制
	function _draw() {
		_CXT.clearRect(0, 0, _drawData.w, _drawData.h);
		_CXT.save();
		_CXT.translate(_drawData.ox, _drawData.oy);
		_CXT.scale(_drawData.scale, _drawData.scale);
		_CXT.drawImage(_OFF_CANVAS, _drawData.px, _drawData.py, _drawData.sw, _drawData.sh);
		_CXT.restore();
	}

	//加载动画


	// 获取绘制数据策略对象
	var _strategy = {
		// 远离初始值
		farOrigin: function (data) {

		},

		// 返回初始值
		closeOrigin: function (data) {

		}
	};

	// 计算出绘制数据
	function _calculateDrawData(state, data) {
		return _strategy[state] && _strategy[state](data);
	}

	// 命令集合
	var commands = {
		big: function () {

		},
		bigToSmall: function () {

		},
		small: function () {

		},
		smallToBig: function () {

		},
		pan: function () {

		}
	};

	// 命令生成器
	function createCommand(receive, transformName) {
		return function (data) {
			receive[transformName](data);
		}
	}

	// 命令执行者
	var transform = (function () {
		var commandCacheList = [];

		return {
			draw: function (commandName, data) {
				var order = createCommand(commands, commandName);
				commandCacheList.push(order.bind(null, data));

				order(data);
			},
			undo: function () {
				(commandCacheList.pop())();
			}
		}
	})();

	return {
		scale: '',
		pan: '',
		reset: ''
	}
}

