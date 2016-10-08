/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/preViewImg/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @description Created by wulunyi on 16/10/5.
	 * @author wulunyi
	 */
	'use strict';

	__webpack_require__(1);

	var _preView = __webpack_require__(5);

	var _preView2 = _interopRequireDefault(_preView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.pre = new _preView2.default(document.getElementsByTagName('canvas')[0], 'http://segmentfault.com/img/bVcQV0');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ":root {\n  width: 100%;\n  height: 100%; }\n\nbody {\n  padding: 0;\n  margin: 0;\n  width: 100%;\n  height: 100%; }\n\ncanvas {\n  width: 100vw;\n  height: 100vh;\n  background: black; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @description Created by wulunyi on 16/10/8.
	 * @author wulunyi
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(6);

	var _util = __webpack_require__(7);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PreViewImg = function () {
	    function PreViewImg(canvas, src, option) {
	        _classCallCheck(this, PreViewImg);

	        if (canvas.getContext) {
	            var size = _util2.default.getSize(canvas); // 获取初始高度数据

	            //解决android的图片预览模糊的问题
	            var dpr = window.devicePixelRatio || 1;
	            var w = size.width * dpr;
	            var h = size.height * dpr;

	            // 解决三星等出现横屏后突然竖屏图像异常的问题
	            if (w > h) {
	                var _ref = [h, w];
	                w = _ref[0];
	                h = _ref[1];
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
	            this.option = option || {
	                maxScale: 4,
	                minScale: 1,
	                doubleTapScale: 2
	                //rotate: false,
	            };

	            this.sw = 0; // 绘制宽高
	            this.sh = 0; // 绘制宽高

	            this.ox = this.w / 2; // 绘制原点
	            this.oy = this.h / 2; // 绘制原点

	            this.px = 0; // 绘制开始坐标
	            this.py = 0; // 绘制开始坐标

	            this.scale = 1; // 绘制缩放比

	            this.timer = null; // 动画返回锚点

	            this._init(src); // 初始化
	        } else {
	            console.warn('参数错误,需要canvas dom');
	        }
	    }

	    _createClass(PreViewImg, [{
	        key: '_init',
	        value: function _init(src) {
	            this._loading('start'); // 开启加载中动画...

	            var self = this;

	            var imgObj = document.createElement('img');

	            imgObj.addEventListener('load', function () {
	                console.log('-> 图片加载成功');

	                self._loading('end')._getInitData(imgObj)._draw(imgObj);
	            });

	            imgObj.addEventListener('error', function () {
	                console.log('-> 图片加载失败,请检查图片是否存在');
	            });

	            imgObj.src = src;
	        }
	    }, {
	        key: '_getInitData',
	        value: function _getInitData(imgObj) {
	            // 图片自身的宽高
	            var sw = imgObj.width;
	            var sh = imgObj.height;

	            // 面板的宽高
	            var dw = this.w;
	            var dh = this.h;

	            var ratio = dw / sw; // 图片绘制到面板本身的缩放比

	            // 已宽为准进行缩放后图片在面板的高度不超过面板本身的高度
	            if (ratio * sh <= dh) {
	                this.sw = dw;
	                this.sh = _util2.default.toFixed(sh * ratio);
	            } else {
	                ratio = dh / sh;

	                this.sh = dh;
	                this.sw = ratio * sw;
	            }

	            this.px = -(this.sw / 2);
	            this.py = -(this.sh / 2);

	            return this;
	        }

	        /**
	         * @description 加载中动画
	         * @param command
	         * @return {PreViewImg}
	         */

	    }, {
	        key: '_loading',
	        value: function _loading(command) {
	            var self = this;
	            var w = self.w;
	            var h = self.h;
	            var ctx = self.ctx;
	            var count = 0; // 计数

	            cancelAnimationFrame(this.timer);

	            ctx.clearRect(0, 0, w, h);
	            ctx.fillStyle = '#ffffff';
	            ctx.strokeStyle = '#ffffff';

	            /**
	             * @description 加载动画
	             */
	            function loadingAnimation() {
	                ctx.clearRect(0, 0, w, h);
	                ctx.save();
	                ctx.translate(w / 2, h / 2);
	                ctx.rotate(5 * count * Math.PI / 180);

	                for (var i = 0; i < 9; i++) {
	                    ctx.save();

	                    ctx.rotate(36 * i * Math.PI / 180);
	                    ctx.beginPath();
	                    ctx.arc(30, 30, 1 + i, 0, Math.PI * 2, false);
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
	        }
	    }, {
	        key: 'animation',
	        value: function animation(toScale) {
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
	        }

	        /**
	         * @description 缩放
	         * @param scale
	         * @param tx
	         * @param ty
	         * @return {PreViewImg}
	         */

	    }, {
	        key: 'scaling',
	        value: function scaling(scale, tx, ty) {
	            tx = this.ratio * tx;
	            ty = this.ratio * ty;

	            if (this.offCanvas == null) {
	                return this;
	            }

	            if (scale === null) {
	                var toScale = 0;

	                if (this.scale == 1) {
	                    this._getBiggerOriginPoint(tx, ty, this.option.doubleTapScale);
	                    toScale = this.option.doubleTapScale;
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
	        }
	    }, {
	        key: 'scaled',
	        value: function scaled(scale, x, y) {
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
	        }

	        /**
	         * @description 根据当前坐标和最终坐标逆向推导缩放远点以及基于缩放原点的偏移坐标
	         * @return {PreViewImg}
	         */

	    }, {
	        key: '_getScaleSmallerPoint',
	        value: function _getScaleSmallerPoint() {
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
	        }

	        /**
	         * @description 获取放大的缩放原点
	         * @param tx 点击坐标
	         * @param ty 点击坐标
	         * @param scale 缩放比例
	         * @return {PreViewImg}
	         */

	    }, {
	        key: '_getBiggerOriginPoint',
	        value: function _getBiggerOriginPoint(tx, ty, scale) {
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
	        }

	        /**
	         * @description 移动
	         * @param offsetX x偏移
	         * @param offsetY y偏移
	         */

	    }, {
	        key: 'moving',
	        value: function moving(offsetX, offsetY) {
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
	            if (curX >= 0 && offsetX > 5 || curX <= MaxX && offsetX < -5 || this.scale <= 1) {
	                return false;
	            }

	            if (curY < 0 || curMaxY > this.h) {
	                if (curY <= 0 && curY >= MaxY || curY < MaxY && offsetY > 0 || curY > 0 && offsetY < 0) {
	                    this.oy += offsetY;
	                }
	            }

	            if (curX < 0 || curMaxX > this.w) {
	                if (curX <= 0 && curX >= MaxX || curX < MaxX && offsetX > 0 || curX > 0 && offsetX < 0) {
	                    this.ox += offsetX;
	                }
	            }

	            this._draw();

	            return true;
	        }

	        /**
	         * @description 绘制
	         * @param imgObj
	         * @return {PreViewImg}
	         */

	    }, {
	        key: '_draw',
	        value: function _draw(imgObj) {
	            var ctx = this.ctx;

	            if (imgObj != undefined) {
	                this.offCanvas = _util2.default.getOffCanvas(imgObj, this.sw, this.sw);
	            }

	            ctx.clearRect(0, 0, this.w, this.h);
	            ctx.save();
	            ctx.translate(this.ox, this.oy);
	            ctx.scale(this.scale, this.scale);
	            ctx.drawImage(this.offCanvas, this.px, this.py, this.sw, this.sh);
	            ctx.restore();

	            return this;
	        }
	    }]);

	    return PreViewImg;
	}();

	exports.default = PreViewImg;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * @description 动画API兼容处理
	 */
	'use strict';

	(function () {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];

	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);

	        lastTime = currTime + timeToCall;
	        return id;
	    };

	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function (id) {
	            clearTimeout(id);
	        };
	    }
	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @description 工具集
	 * @author wulunyi.
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    getOffCanvas: function getOffCanvas(img, w, h) {
	        var canvas = document.createElement('canvas');
	        var ctx = canvas.getContext('2d');

	        canvas.width = w;
	        canvas.height = h;

	        ctx.drawImage(img, 0, 0, w, h);

	        return canvas;
	    },
	    getSize: function getSize(dom) {
	        var boundData = dom.getBoundingClientRect();

	        return {
	            height: boundData.height,
	            width: boundData.width
	        };
	    },
	    toFixed: function toFixed(num) {
	        return Math.floor(num * 100) / 100;
	    }
	};

/***/ }
/******/ ]);