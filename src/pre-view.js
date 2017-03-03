/**
 * @description Created by wulunyi on 16/11/29.
 * @author wulunyi
 */
'use strict';

require('./animation');
require('./style');

var util = require('./util');
var PreViewPage = require('./pre-view-page');
var Hammer = require('hammerjs');

module.exports = (function () {
	var _PRE_PANEL = null;// 预览面板
	var _tempChild = null;
	var _timer = null;// 计时器
	var _deltaX = null;// X偏移量
	var _currentIndex = 0;// 当前下标
	var _MAX_INDEX = 0;// 最大下标
	var _preList = [];// 预览列表
	var _PAGE_DOM = {};// 翻页dom元素

	// 操作选项
	var defaultOptions = {
		tapHide: true
	};

	var options = {
		tapHide: true // 是否开启点击关闭
	};

	// 容器大小
	const _SIZE = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	// 如果不存在则构建
	if (!_PRE_PANEL) {
		_PRE_PANEL = util.createDom('div', {
			id: 'pv-stage'
		});

		// 页码容器
		var pageWrapDom = util.createDom('div', {
			className: 'pv-show-box'
		});

		// 页码
		var pageItemDom = util.createDom('span', {
			className: 'pv-show-page'
		});

		pageWrapDom.appendChild(pageItemDom);

		_PRE_PANEL.appendChild(pageWrapDom);

		_PAGE_DOM = pageItemDom;

		// 隐藏
		_PRE_PANEL.style.display = 'none';

		document.body.appendChild(_PRE_PANEL);
	}

	var _eventHandler = {
		dom: null,
		tap: function handleTap(ev) {
			clearTimeout(_timer);

			// 预测用户是否要做双击操作
			_timer = setTimeout(()=> {
				if (options.tapHide) {
					_hide();
				}
			}, 300);

			ev.srcEvent.preventDefault();
			return false;
		},
		doubletap: function handleDoubleTap(ev) {
			clearTimeout(_timer);

			ev.srcEvent.preventDefault();
			return false;
		},
		pan: function handlePan(ev) {
			clearTimeout(_timer);

			var deltaX = ev.deltaX;

			if (_deltaX == null) {
				_deltaX = deltaX;
			}

			var deltaDistance = deltaX - _deltaX;
			var offSetDistance = deltaDistance + (-_currentIndex ) * _SIZE.width;

			if (_eventHandler.dom) {
				_eventHandler.dom.style.transition = "none";
				_eventHandler.dom.style.webkitTransition = "none";
				_eventHandler.dom.style.transform = "translate(" + offSetDistance + 'px)';
				_eventHandler.dom.style.webkitTransform = "translate(" + offSetDistance + 'px)';
			}
		},
		panend: function handlePanEnd(ev) {
			var maxDeltax = _SIZE.width * 0.1;
			var deltaX = ev.deltaX - _deltaX;

			_deltaX = null;

			// 开启动画
			_eventHandler.dom.style.transition = "all 200ms ease";
			_eventHandler.dom.style.webkitTransition = "all 200ms ease";

			var tempIndex = _currentIndex;

			if (deltaX < -maxDeltax  && _currentIndex < _MAX_INDEX) {
				_currentIndex++;
			} else if (deltaX > maxDeltax && _currentIndex > 0) {
				_currentIndex--;
			}

			_setPage();

			var offsetDistance = _SIZE.width * (-_currentIndex );

			// 设置偏移
			_eventHandler.dom.style.transform = "translate(" + offsetDistance + 'px)';
			_eventHandler.dom.style.webkitTransform = "translate(" + offsetDistance + 'px)';

			if (tempIndex !== _currentIndex) {
				_preList[_currentIndex]._bindEvent();
				_preList[_currentIndex].start();
				_preList[tempIndex].reset();
			}
		}
	};

	function _openEvent(dom) {
		var hammer = new Hammer(dom);
		hammer.get('doubletap').set({posThreshold: 60});
		_eventHandler.dom = dom;

		for (var event in _eventHandler) {
			hammer.on(event, _eventHandler[event]);
		}
	}

	function _render(srcArr) {
		var dom = util.createDom('ul', {
			className: 'pv-panel'
		});

		// 开启各种监听
		_openEvent(dom);

		// 设置滚动内容面板width
		dom.style.width = srcArr.length * _SIZE.width + 'px';

		var offsetDistance = (-_currentIndex) * _SIZE.width;

		var property = "translate(" + offsetDistance + 'px)';

		dom.style.transform = property;
		dom.style.webkitTransform = property;

		srcArr.forEach((src)=> {
			dom.appendChild(_createPreView(src));
		});

		_PRE_PANEL.appendChild(dom);

		// 绑定事件
		_preList[_currentIndex]._bindEvent();
		_preList[_currentIndex].start();

		// 缓存面板
		_tempChild = dom;
	}

	function _setPage() {
		_PAGE_DOM.innerHTML = (_currentIndex + 1) + '/' + (_MAX_INDEX + 1);
	}

	function _createPreView() {
		var src = [].shift.call(arguments);
		var innerDom = util.createDom('li');
		var preViewWrap = new PreViewPage(_SIZE, src);

		_preList.push(preViewWrap);
		innerDom.appendChild(preViewWrap.canvas);

		return innerDom;
	}

	function _show() {
		_PRE_PANEL.style.display = 'block';

		if (arguments.length === 0) {
			return;
		}

		// 重置缓存列表
		_preList = [];

		// 获取参数
		var srcArr = [].shift.call(arguments) || [];
		var index = [].slice.call(arguments)[0] || 0;
		var options = [].slice.call(arguments)[1];

		if(options && typeof options === 'object'){
			_set(options);
		}else {
			_set(defaultOptions);
		}

		if (!Array.isArray(srcArr)) {
			srcArr = [srcArr];
		}

		if (index < 0 || !Number(index)) {
			index = 0;
		}

		if (index >= srcArr.length) {
			index = srcArr.length - 1;
		}

		_currentIndex = index;
		_MAX_INDEX = srcArr.length - 1;

		_render(srcArr);
		_setPage();

		return {
			srcArr: srcArr,
			index: index
		};
	}

	function _set(obj) {
		for (var key in obj) {
			options[key] = obj[key];
		}
	}

	function _hide() {
		_PRE_PANEL.style.display = 'none';
		// 清除缓存
		if (_tempChild) {
			_PRE_PANEL.removeChild(_tempChild);
			_tempChild = null;
		}
	}

	return {
		set: _set,
		show: _show,
		hide: _hide,
		panel: _PRE_PANEL
	}
})();