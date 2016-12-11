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
	var _PRE_PANEL = null;
	var _tempChild = null;
	var _timer = null;
	var _deltaX = null;
	var _currentIndex = 0;
	var _MAX_INDEX = 0;
	var _preList = [];// 预览
	var _PAGE_DOM = {};// 翻页dom元素

	const _SIZE = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	if (!_PRE_PANEL) {
		_PRE_PANEL = util.createDom('div', {
			id: 'pv-stage'
		});

		var pageWrapDom = util.createDom('div', {
			className: 'pv-show-box'
		});

		var pageItemDom = util.createDom('span', {
			className: 'pv-show-page'
		});

		pageWrapDom.appendChild(pageItemDom);

		_PRE_PANEL.appendChild(pageWrapDom);

		_PAGE_DOM = pageItemDom;

		_PRE_PANEL.style.display = 'none';

		document.body.appendChild(_PRE_PANEL);
	}

	var _eventHandler = {
		dom: null,
		tap: function handleTap(ev) {
			clearTimeout(_timer);

			// 预测用户是否要做双击操作
			_timer = setTimeout(()=> {
				_hide();
			}, 200);

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
			var offSetDistance = deltaDistance + (_currentIndex - _MAX_INDEX) * _SIZE.width;

			if (_eventHandler.dom) {
				_eventHandler.dom.style.transition = "none";
				_eventHandler.dom.style['-webkit-transition'] = "none";
				_eventHandler.dom.style.transform = "translate(" + offSetDistance + 'px)';
				_eventHandler.dom.style['-webkit-transform'] = "translate(" + offSetDistance + 'px)';
			}
		},
		panend: function handlePanEnd(ev) {
			var maxDeltax = _SIZE.width * 0.1;
			var deltaX = ev.deltaX - _deltaX;

			_deltaX = null;

			_eventHandler.dom.style.transition = "all 200ms ease";// 开启动画
			_eventHandler.dom.style['-webkit-transition'] = "all 200ms ease";// 开启动画

			var tempIndex = _currentIndex;

			if (deltaX > maxDeltax && _currentIndex < _MAX_INDEX) {
				_currentIndex++;
			} else if (deltaX < -maxDeltax && _currentIndex > 0) {
				_currentIndex--;
			}
			_setPage();

			var offsetDistance = _SIZE.width * (_currentIndex - _MAX_INDEX);

			_eventHandler.dom.style.transform = "translate(" + offsetDistance + 'px)';
			_eventHandler.dom.style['-webkit-transform'] = "translate(" + offsetDistance + 'px)';

			if (tempIndex !== _currentIndex) {
				_preList[_MAX_INDEX - tempIndex].reset();
			}
		}
	};

	function _openEvent(dom) {
		var hammer = new Hammer(dom);
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

		dom.style.width = srcArr.length * _SIZE.width + 'px';
		var offsetDistance = (_currentIndex - _MAX_INDEX) * _SIZE.width;

		dom.style.transform = "translate(" + offsetDistance + 'px)';
		dom.style['-webkit-transform'] = "translate(" + offsetDistance + 'px)';
		dom.style['-moz-transition'] = "translate(" + offsetDistance + 'px)';
		dom.style['-ms-transition'] = "translate(" + offsetDistance + 'px)';

		srcArr.forEach((src)=> {
			dom.appendChild(_createPreView(src));
		});

		if (_tempChild) {
			_PRE_PANEL.removeChild(_tempChild);
		}

		_PRE_PANEL.appendChild(dom);

		_tempChild = dom;
	}

	function _setPage() {
		_PAGE_DOM.innerHTML = (_MAX_INDEX + 1) + '/' + (_currentIndex + 1);
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

		// 获取参数
		var srcArr = [].shift.call(arguments) || [];
		var index = [].slice.call(arguments)[0] || 0;

		if (!Array.isArray(srcArr)) {
			srcArr = [srcArr];
		}

		if (index < 0 || !Number(index)) {
			index = 0;
		}

		if (index >= srcArr.length) {
			index = srcArr.length - 1;
		}

		srcArr = srcArr.reverse();

		_currentIndex = index;
		_MAX_INDEX = srcArr.length - 1;

		_render(srcArr);
		_setPage();

		return {
			srcArr: srcArr,
			index: index
		};
	}

	function _hide() {
		_PRE_PANEL.style.display = 'none';
	}

	return {
		show: _show,
		hide: _hide,
		panel: _PRE_PANEL
	}
})();