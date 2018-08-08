(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Lie"] = factory();
	else
		root["Lie"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compiler.ts":
/*!*************************!*\
  !*** ./src/compiler.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n *  compiler for textNode\n */\nfunction textCompiler(template, html) {\n    var lie = this;\n    var regex = /{{(.*?)}}/gm;\n    var m, v;\n    while ((m = regex.exec(html)) !== null) {\n        // This is necessary to avoid infinite loops with zero-width matches\n        if (m.index === regex.lastIndex) {\n            regex.lastIndex++;\n        }\n        if (m[1] && (v = getDeepProperty(lie, m[1]))) {\n            template.appendChild(document.createTextNode(v));\n        }\n    }\n}\n/**\n * 创建元素\n */\nfunction createElement() {\n    var lie = this;\n    var template = document.createDocumentFragment();\n    textCompiler.call(lie, template, lie.$template);\n    return template;\n}\nexports.createElement = createElement;\n/**\n * 嵌套属性\n */\nfunction getDeepProperty(target, key) {\n    var keys = key.split(\".\");\n    var val = target[keys[0]];\n    if (!val)\n        return false;\n    if (keys.length > 1) {\n        return getDeepProperty(val, keys.slice(1).join(\".\"));\n    }\n    else {\n        return val;\n    }\n}\n\n\n//# sourceURL=webpack://Lie/./src/compiler.ts?");

/***/ }),

/***/ "./src/dep.ts":
/*!********************!*\
  !*** ./src/dep.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Dep = /** @class */ (function () {\n    function Dep() {\n        this.subs = [];\n    }\n    Dep.prototype.depend = function () {\n        Dep.target.addDep(this);\n    };\n    Dep.prototype.addSub = function (wathcer) {\n        this.subs.push(wathcer);\n    };\n    Dep.prototype.notify = function () {\n        this.subs.forEach(function (w) { return w.updateFunc(); });\n    };\n    return Dep;\n}());\nexports.Dep = Dep;\nexports.pushTarget = function (watcher) {\n    if (!Dep.target)\n        Dep.target = watcher;\n};\nexports.popTarget = function () {\n    Dep.target = null;\n};\n\n\n//# sourceURL=webpack://Lie/./src/dep.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar watcher_1 = __webpack_require__(/*! ./watcher */ \"./src/watcher.ts\");\nvar init_1 = __webpack_require__(/*! ./init/init */ \"./src/init/init.ts\");\nvar compiler_1 = __webpack_require__(/*! ./compiler */ \"./src/compiler.ts\");\n/**\n * 更新组件\n */\nfunction updateComponent() {\n    var lie = this;\n    var html = compiler_1.createElement.call(lie);\n    lie.$el.innerHTML = \"\";\n    lie.$el.appendChild(html);\n}\nvar Lie = /** @class */ (function () {\n    function Lie(options) {\n        var data = options.data() || {};\n        this.__data__ = data;\n        // 初始化Data\n        init_1.initData(this, data);\n        if (options.el) {\n            this.$mount(options.el);\n        }\n    }\n    Lie.prototype.$mount = function (el) {\n        var lie = this;\n        var $el = document.querySelector(el);\n        lie.$el = $el;\n        lie.$template = $el.outerHTML;\n        new watcher_1.Watcher(lie, function () { return updateComponent.call(lie); });\n    };\n    return Lie;\n}());\nexports.Lie = Lie;\n\n\n//# sourceURL=webpack://Lie/./src/index.ts?");

/***/ }),

/***/ "./src/init/init.ts":
/*!**************************!*\
  !*** ./src/init/init.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar observe_1 = __webpack_require__(/*! ../observe */ \"./src/observe.ts\");\n/**\n * 初始化data\n */\nfunction initData(lie, data) {\n    proxy(lie, \"__data__\");\n    observe_1.observe(data);\n}\nexports.initData = initData;\n/**\n *  属性代理\n */\nfunction proxy(target, sourceKey) {\n    var data = target[sourceKey];\n    var keys = Object.keys(data);\n    var _loop_1 = function (i, l) {\n        var key = keys[i];\n        Object.defineProperty(target, key, {\n            enumerable: true,\n            configurable: true,\n            set: function (val) {\n                this[sourceKey][key] = val;\n            },\n            get: function () {\n                return this[sourceKey][key];\n            }\n        });\n    };\n    for (var i = 0, l = keys.length; i < l; i++) {\n        _loop_1(i, l);\n    }\n}\n\n\n//# sourceURL=webpack://Lie/./src/init/init.ts?");

/***/ }),

/***/ "./src/observe.ts":
/*!************************!*\
  !*** ./src/observe.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dep_1 = __webpack_require__(/*! ./dep */ \"./src/dep.ts\");\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nexports.observe = function (data) {\n    for (var k in data) {\n        defineReactive(data, k);\n    }\n};\nfunction defineReactive(data, key) {\n    var dep = new dep_1.Dep();\n    var val = data[key];\n    // 嵌套属性对象\n    if (util_1.isObject(val)) {\n        exports.observe(val);\n    }\n    Object.defineProperty(data, key, {\n        enumerable: true,\n        configurable: true,\n        get: function () {\n            var value = val;\n            if (dep_1.Dep.target) {\n                dep.depend();\n            }\n            return value;\n        },\n        set: function (newVal) {\n            if (newVal === val) {\n                return;\n            }\n            val = newVal;\n            dep.notify();\n        }\n    });\n}\n\n\n//# sourceURL=webpack://Lie/./src/observe.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isObject(val) {\n    return typeof val === \"object\";\n}\nexports.isObject = isObject;\n\n\n//# sourceURL=webpack://Lie/./src/util.ts?");

/***/ }),

/***/ "./src/watcher.ts":
/*!************************!*\
  !*** ./src/watcher.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dep_1 = __webpack_require__(/*! ./dep */ \"./src/dep.ts\");\n/**\n ** 负责触发compiler\n */\nvar Watcher = /** @class */ (function () {\n    function Watcher(lie, func) {\n        this.subs = [];\n        this.lie = lie;\n        this.updateFunc = func;\n        this.get();\n    }\n    Watcher.prototype.addDep = function (dep) {\n        this.subs.push(dep);\n        dep.addSub(this);\n    };\n    Watcher.prototype.get = function () {\n        var lie = this.lie;\n        dep_1.pushTarget(this);\n        this.updateFunc.call(lie, lie);\n        dep_1.popTarget();\n    };\n    return Watcher;\n}());\nexports.Watcher = Watcher;\n\n\n//# sourceURL=webpack://Lie/./src/watcher.ts?");

/***/ })

/******/ });
});