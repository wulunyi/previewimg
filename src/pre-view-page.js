/**
 * @description Created by wulunyi on 16/12/11.
 * @author wulunyi
 */
'use strict';

var PreView = require('./pre-view-core');
var Hammer = require('hammerjs');
var util = require('./util');

function PreViewPage(size, src) {
	this.canvas = util.createDom('canvas');

	this.hammer = new Hammer(this.canvas);
	this.preView = new PreView(this.canvas, size, src);

	this.pinchPoint = null;
	this.scale = 1;

	this._init();
}

PreViewPage.prototype.reset = function () {
	this._offEvent();
	this.preView.reset();
};

PreViewPage.prototype._offEvent = function () {
	var hammer = this.hammer;
	hammer.off('doubletap', this._handleDoubleTap.bind(this))
		.off('pan', this._handlePan.bind(this))
		.off('panend', this._handlePanEnd.bind(this))
		.off('pinch', this._handlePinch.bind(this))
		.off('pinchend', this._handlePinchEnd.bind(this));
};

PreViewPage.prototype._bindEvent = function () {
	var hammer = this.hammer;

	hammer.on('doubletap', this._handleDoubleTap.bind(this))
		.on('pan', this._handlePan.bind(this))
		.on('panend', this._handlePanEnd.bind(this))
		.on('pinch', this._handlePinch.bind(this))
		.on('pinchend', this._handlePinchEnd.bind(this));
};

PreViewPage.prototype._init = function () {
	var hammer = this.hammer;

	hammer.get('pinch').set({enable: true});
	hammer.get('doubletap').set({posThreshold: 60});
};

PreViewPage.prototype._handleDoubleTap = function(ev) {
	var touchPoint = ev.center;// 获取点击数据

	this.preView.scaling(null, touchPoint.x, touchPoint.y);
};

PreViewPage.prototype._handlePinch = function(ev) {
	var center = ev.center;

	if (this.pinchPoint === null) {
		this.pinchPoint = center;
	}

	this.preView.scaled(ev.scale / this.scale, this.pinchPoint.x, this.pinchPoint.y);
	this.scale = ev.scale;

	ev.srcEvent.preventDefault();
	return false;
};

PreViewPage.prototype._handlePinchEnd = function() {
	//重置
	this.scale = 1;
	this.pinchPoint = null;
};

PreViewPage.prototype._handlePan = function(ev) {
	var panPoint = ev.center;
	var lastPanPoint = this.panPoint || panPoint;

	var changePoint = {
		x: panPoint.x - lastPanPoint.x,
		y: panPoint.y - lastPanPoint.y
	};

	this.isMoving = this.preView.moving(changePoint.x, changePoint.y);

	if (this.isMoving) {
		this.panPoint = panPoint;

		// 阻止冒泡
		ev.srcEvent.stopPropagation();
		return false;
	}
};

PreViewPage.prototype._handlePanEnd = function(ev) {
	this.panPoint = null;

	if (this.isMoving) {
		// 阻止冒泡
		ev.srcEvent.stopPropagation();
		return false;
	}
};

module.exports = PreViewPage;