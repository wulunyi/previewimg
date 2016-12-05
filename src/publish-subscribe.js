/**
 * @description Created by wulunyi on 16/12/4.
 * @author wulunyi
 */
'use strict';

var Event = (function () {
	const clientList = {};
	const offCache = {};

	var _shift = Array.prototype.shift;

	function _listen(key, fn) {
		if (!clientList[key]) {
			clientList[key] = [];
		}

		clientList[key].push(fn);

		var cache = offCache[key];
		if(!cache || cache.length === 0){
			return false;
		}

		cache.forEach(function (data) {
			fn.apply(this,data);
		});

		delete offCache[key];
	}

	function _trigger() {
		var key = _shift.call(arguments),
			fns = clientList[key];

		if (!fns || fns.length === 0) {
			if(!offCache[key]){
				offCache[key] = [];
			}

			offCache[key].push(arguments);

			return;
		}

		var len = fns.length;
		var flag = 0;

		while (flag < len) {
			fns[flag++].apply(this, arguments);
		}
	}

	function _remove() {
		var key = _shift.call(arguments),
			_fn = _shift.call(arguments),
			fns = clientList[key];

		if (!fns || fns.length === 0 || !_fn) {
			return false;
		}

		fns.some(function (fn, index) {
			if (fn === _fn) {
				fns.splice(index, 1);

				return true;
			}

			return false;
		});
	}

	return {
		listen: _listen,
		trigger: _trigger,
		remove: _remove
	}
})();


export default Event;
