/**
 * @description Created by wulunyi on 16/10/8.
 * @description 单个预览容器
 * @author wulunyi
 */
'use strict';

import PreView from 'src/PreViewImg';
import Hammer from 'hammerjs';
import util from 'src/util';

export default class PreViewWrap {
	constructor(size, src) {
		this.canvas = util.createDom('canvas');

		this.hammer = new Hammer(this.canvas);
		this.preView = new PreView(this.canvas, size, src);

		this.pinchPoint = null;
		this.scale = 1;

		this._init();
	}

	reset(){
		this.preView.reset();
	}

	_init() {
		let hammer = this.hammer;

		hammer.get('pinch').set({enable: true});
		hammer.get('doubletap').set({posThreshold: 60});

		hammer.on('doubletap', this._handleDoubleTap.bind(this))
			.on('pan', this._handlePan.bind(this))
			.on('panend', this._handlePanEnd.bind(this))
			.on('pinch', this._handlePinch.bind(this))
			.on('pinchend', this._handlePinchEnd.bind(this));
	}

	_handleDoubleTap(ev) {
		let touchPoint = ev.center;// 获取点击数据

		this.preView.scaling(null, touchPoint.x, touchPoint.y);
	}

	_handlePinch(ev) {
		let center = ev.center;

		if (this.pinchPoint === null) {
			this.pinchPoint = center;
		}

		this.preView.scaled(ev.scale / this.scale, this.pinchPoint.x, this.pinchPoint.y);
		this.scale = ev.scale;

		ev.srcEvent.preventDefault();
		return false;
	}

	_handlePinchEnd() {
		//重置
		this.scale = 1;
		this.pinchPoint = null;
	}

	_handlePan(ev) {
		let panPoint = ev.center;
		let lastPanPoint = this.panPoint || panPoint;

		let changePoint = {
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
	}

	_handlePanEnd(ev) {
		this.panPoint = null;

		if (this.isMoving) {
			// 阻止冒泡
			ev.srcEvent.stopPropagation();
			return false;
		}
	}
}