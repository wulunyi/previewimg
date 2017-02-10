/**
 * @description Created by wulunyi on 16/12/11.
 * @author wulunyi
 */
'use strict';

(function () {
	var style = document.createElement('style');
	style.innerHTML = '\
	#pv-stage {\
		position: absolute;\
		left: 0;\
		top: 0;\
		z-index: 9999;\
		overflow: hidden;\
		height: 100vh;\
		width: 100vw;\
		background: rgb(0, 0, 0);\
	}\
	.pv-panel {\
		position: absolute;\
		left: 0;\
		top: 0;\
		margin: 0;\
		padding: 0;\
		min-width:100vw;\
		height: 100%;\
		list-style:none;\
		-webkit-transition:all 200ms ease;\
		-moz-transition:all 200ms ease;\
		-ms-transition:all 200ms ease;\
		transition: all 200ms ease;\
	}\
	.pv-panel li{\
		float: left;\
		width: 100vw;\
	}\
	.pv-panel canvas{\
		width: 100vw;\
	}\
	.pv-show-box{\
		position: absolute;\
		left: 0;\
		bottom: 0;\
		width: 100%;\
	}\
	.pv-show-page{\
		position: absolute;\
		left: 50%;\
		bottom: 30px;\
		-webkit-transform: translateX(-50%);\
		-moz-transform: translateX(-50%);\
		-ms-transform: translateX(-50%);\
		-o-transform: translateX(-50&);\
		transform: translateX(-50%);\
		line-height:1em;\
		color: #7b7b7b;\
	}\
	';

	document.getElementsByTagName('head')[0].appendChild(style);
})();
