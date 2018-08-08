/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/greet.js":
/*!**********************!*\
  !*** ./src/greet.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n// var num = 99\n// var greet = function() {\n//   var greet = document.createElement('div');\n//   greet.textContent = \"Hi there and greetings!\";\n//   return greet;\n// }\n// export {num, greet}\n\nvar firstName = 'Michael';\nvar greet = function greet() {\n  var greet = document.createElement('div');\n  greet.textContent = \"Hi there and greetings!\";\n  return greet;\n};\nexports.firstName = firstName;\nexports.greet = greet;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ3JlZXQuanM/ZDJhNCJdLCJuYW1lcyI6WyJmaXJzdE5hbWUiLCJncmVldCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJQSxZQUFZLFNBQWhCO0FBQ0EsSUFBSUMsUUFBUyxpQkFBVztBQUN0QixNQUFJQSxRQUFRQyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQUYsUUFBTUcsV0FBTixHQUFvQix5QkFBcEI7QUFDQSxTQUFPSCxLQUFQO0FBQ0QsQ0FKRDtRQUtRRCxTLEdBQUFBLFM7UUFBV0MsSyxHQUFBQSxLIiwiZmlsZSI6Ii4vc3JjL2dyZWV0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyB2YXIgbnVtID0gOTlcbi8vIHZhciBncmVldCA9IGZ1bmN0aW9uKCkge1xuLy8gICB2YXIgZ3JlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgZ3JlZXQudGV4dENvbnRlbnQgPSBcIkhpIHRoZXJlIGFuZCBncmVldGluZ3MhXCI7XG4vLyAgIHJldHVybiBncmVldDtcbi8vIH1cbi8vIGV4cG9ydCB7bnVtLCBncmVldH1cblxudmFyIGZpcnN0TmFtZSA9ICdNaWNoYWVsJztcbnZhciBncmVldCA9ICBmdW5jdGlvbigpIHtcbiAgdmFyIGdyZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdyZWV0LnRleHRDb250ZW50ID0gXCJIaSB0aGVyZSBhbmQgZ3JlZXRpbmdzIVwiO1xuICByZXR1cm4gZ3JlZXQ7XG59O1xuZXhwb3J0IHtmaXJzdE5hbWUsIGdyZWV0fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/greet.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _moduleHelp = __webpack_require__(/*! ./moduleHelp */ \"./src/moduleHelp.js\");\n\nvar moduleHelp = _interopRequireWildcard(_moduleHelp);\n\nvar _greet = __webpack_require__(/*! ./greet */ \"./src/greet.js\");\n\nvar _greet2 = _interopRequireDefault(_greet);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// var g = document.createElement('div');\n// g.textContent = \"Hi there and greetings!\";\n// document.querySelector('#root').appendChild(g)\n\n// as 重命名\n\n//可以连起来写\nconsole.log('num1', _moduleHelp.num1);\n//导入单个元素，必须括号，没括号，则默认是default\n\nconsole.log('num2', moduleHelp.default, _moduleHelp.num2);\nconsole.log('default', moduleHelp.default);\nconsole.log('module', moduleHelp);\nconsole.log(moduleHelp.num1);\n\n//require\nvar hello = __webpack_require__(/*! ./moduleExportsHelp */ \"./src/moduleExportsHelp.js\");\nconsole.log('require', hello.a, hello.hello, hello.name);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJtb2R1bGVIZWxwIiwiY29uc29sZSIsImxvZyIsIm51bTEiLCJfIiwibnVtMiIsImFueSIsImhlbGxvIiwicmVxdWlyZSIsImEiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOztBQUVBOztJQUtZQSxVOztBQUVaOzs7Ozs7OztBQUVBO0FBQ0E7QUFDQTs7QUFQQTs7QUFIQTtBQVlBQyxRQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQkMsZ0JBQXBCO0FBZEE7O0FBZUFGLFFBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CRSxrQkFBcEIsRUFBdUJDLGdCQUF2QjtBQUNBSixRQUFRQyxHQUFSLENBQVksU0FBWixFQUF1Qkksa0JBQXZCO0FBQ0FMLFFBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixVQUF0QjtBQUNBQyxRQUFRQyxHQUFSLENBQVlGLFdBQVdHLElBQXZCOztBQUVBO0FBQ0EsSUFBSUksUUFBUSxtQkFBQUMsQ0FBUSx1REFBUixDQUFaO0FBQ0FQLFFBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCSyxNQUFNRSxDQUE3QixFQUFnQ0YsTUFBTUEsS0FBdEMsRUFBNkNBLE1BQU1HLElBQW5EIiwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vL+WvvOWFpeWNleS4quWFg+e0oO+8jOW/hemhu+aLrOWPt++8jOayoeaLrOWPt++8jOWImem7mOiupOaYr2RlZmF1bHRcbmltcG9ydCB7bnVtMX0gZnJvbSAnLi9tb2R1bGVIZWxwJ1xuLy/lj6/ku6Xov57otbfmnaXlhplcbmltcG9ydCBfLCB7bnVtMiwgZnVuMn0gZnJvbSAnLi9tb2R1bGVIZWxwJ1xuaW1wb3J0IGFueSBmcm9tICcuL21vZHVsZUhlbHAnXG4vLyBhcyDph43lkb3lkI1cbmltcG9ydCAqIGFzIG1vZHVsZUhlbHAgZnJvbSAnLi9tb2R1bGVIZWxwJ1xuXG5pbXBvcnQgZ3JlZXQgZnJvbSAnLi9ncmVldCdcblxuLy8gdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIGcudGV4dENvbnRlbnQgPSBcIkhpIHRoZXJlIGFuZCBncmVldGluZ3MhXCI7XG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpLmFwcGVuZENoaWxkKGcpXG5cbmNvbnNvbGUubG9nKCdudW0xJywgbnVtMSlcbmNvbnNvbGUubG9nKCdudW0yJywgXywgbnVtMik7XG5jb25zb2xlLmxvZygnZGVmYXVsdCcsIGFueSlcbmNvbnNvbGUubG9nKCdtb2R1bGUnLCBtb2R1bGVIZWxwKTtcbmNvbnNvbGUubG9nKG1vZHVsZUhlbHAubnVtMSk7XG5cbi8vcmVxdWlyZVxudmFyIGhlbGxvID0gcmVxdWlyZSgnLi9tb2R1bGVFeHBvcnRzSGVscCcpXG5jb25zb2xlLmxvZygncmVxdWlyZScsIGhlbGxvLmEsIGhlbGxvLmhlbGxvLCBoZWxsby5uYW1lKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/moduleExportsHelp.js":
/*!**********************************!*\
  !*** ./src/moduleExportsHelp.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// module.exports = 'hello';\n// 也可以写成 exports = 'Hello require!';\n// 也可以写成 module.exports = 'Hello require!';\n\nmodule.exports = {\n    a: 'jxf',\n    hello: function hello() {\n        console.log('hello');\n    }\n};\nmodule.exports.name = 'jinxiaofei';\n//类\n/*\nmodule.exports = function(name, age) {\n    this.name = name;\n    this.age = age;\n    this.about = function() {\n        console.log(this.name +' is '+ this.age +' years old');\n    };\n};\n*/\n\n/*\n所有的exports收集到的属性和方法，都赋值给了Module.exports。\n当然，这有个前提，就是Module.exports本身不具备任何属性和方法。\n如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。\n*///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlRXhwb3J0c0hlbHAuanM/OGExMCJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiYSIsImhlbGxvIiwiY29uc29sZSIsImxvZyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBOztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE9BQUcsS0FEWTtBQUVmQyxXQUFPLGlCQUFXO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRDtBQUpjLENBQWpCO0FBTUFMLE9BQU9DLE9BQVAsQ0FBZUssSUFBZixHQUFzQixZQUF0QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUFVQSIsImZpbGUiOiIuL3NyYy9tb2R1bGVFeHBvcnRzSGVscC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1vZHVsZS5leHBvcnRzID0gJ2hlbGxvJztcbi8vIOS5n+WPr+S7peWGmeaIkCBleHBvcnRzID0gJ0hlbGxvIHJlcXVpcmUhJztcbi8vIOS5n+WPr+S7peWGmeaIkCBtb2R1bGUuZXhwb3J0cyA9ICdIZWxsbyByZXF1aXJlISc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhOiAnanhmJyxcbiAgaGVsbG86IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cy5uYW1lID0gJ2ppbnhpYW9mZWknXG4vL+exu1xuLypcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmFnZSA9IGFnZTtcbiAgICB0aGlzLmFib3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArJyBpcyAnKyB0aGlzLmFnZSArJyB5ZWFycyBvbGQnKTtcbiAgICB9O1xufTtcbiovXG5cbi8qXG7miYDmnInnmoRleHBvcnRz5pS26ZuG5Yiw55qE5bGe5oCn5ZKM5pa55rOV77yM6YO96LWL5YC857uZ5LqGTW9kdWxlLmV4cG9ydHPjgIJcbuW9k+eEtu+8jOi/meacieS4quWJjeaPkO+8jOWwseaYr01vZHVsZS5leHBvcnRz5pys6Lqr5LiN5YW35aSH5Lu75L2V5bGe5oCn5ZKM5pa55rOV44CCXG7lpoLmnpzvvIxNb2R1bGUuZXhwb3J0c+W3sue7j+WFt+Wkh+S4gOS6m+WxnuaAp+WSjOaWueazle+8jOmCo+S5iGV4cG9ydHPmlLbpm4bmnaXnmoTkv6Hmga/lsIbooqvlv73nlaXjgIJcbiovXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/moduleExportsHelp.js\n");

/***/ }),

/***/ "./src/moduleHelp.js":
/*!***************************!*\
  !*** ./src/moduleHelp.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.fun2 = fun2;\n\nvar num1 = 9;\nvar fun1 = function fun1() {\n  console.log('fun1');\n};\nexports.num1 = num1;\nexports.fun1 = fun1;\nexports.number1 = num1;\nvar num2 = exports.num2 = 99;\nfunction fun2() {\n  console.log('fun2');\n}\n\n//default 只能用一次\nexports.default = {\n  num3: 999,\n  fun3: function fun3() {\n    console.log('fun3');\n  }\n};\n// var num3 = 999;\n// export {num3 as default}\n\nconsole.log('just log');//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlSGVscC5qcz9iMDI3Il0sIm5hbWVzIjpbImZ1bjIiLCJudW0xIiwiZnVuMSIsImNvbnNvbGUiLCJsb2ciLCJudW1iZXIxIiwibnVtMiIsIm51bTMiLCJmdW4zIl0sIm1hcHBpbmdzIjoiOzs7OztRQVNnQkEsSSxHQUFBQSxJOztBQVJoQixJQUFJQyxPQUFPLENBQVg7QUFDQSxJQUFJQyxPQUFPLFNBQVBBLElBQU8sR0FBVztBQUNwQkMsVUFBUUMsR0FBUixDQUFZLE1BQVo7QUFDRCxDQUZEO1FBR1FILEksR0FBQUEsSTtRQUFNQyxJLEdBQUFBLEk7UUFDRUcsTyxHQUFSSixJO0FBRUQsSUFBSUssc0JBQU8sRUFBWDtBQUNBLFNBQVNOLElBQVQsR0FBZ0I7QUFDckJHLFVBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0Q7O0FBRUQ7a0JBQ2U7QUFDYkcsUUFBTSxHQURPO0FBRWJDLE1BRmEsa0JBRU47QUFDTEwsWUFBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDtBQUpZLEM7QUFNZjtBQUNBOztBQUVBRCxRQUFRQyxHQUFSLENBQVksVUFBWiIsImZpbGUiOiIuL3NyYy9tb2R1bGVIZWxwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgbnVtMSA9IDlcbnZhciBmdW4xID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdmdW4xJylcbn1cbmV4cG9ydCB7bnVtMSwgZnVuMX1cbmV4cG9ydCB7bnVtMSBhcyBudW1iZXIxfVxuXG5leHBvcnQgdmFyIG51bTIgPSA5OVxuZXhwb3J0IGZ1bmN0aW9uIGZ1bjIoKSB7XG4gIGNvbnNvbGUubG9nKCdmdW4yJylcbn1cblxuLy9kZWZhdWx0IOWPquiDveeUqOS4gOasoVxuZXhwb3J0IGRlZmF1bHQge1xuICBudW0zOiA5OTksXG4gIGZ1bjMoKSB7XG4gICAgY29uc29sZS5sb2coJ2Z1bjMnKTtcbiAgfVxufVxuLy8gdmFyIG51bTMgPSA5OTk7XG4vLyBleHBvcnQge251bTMgYXMgZGVmYXVsdH1cblxuY29uc29sZS5sb2coJ2p1c3QgbG9nJyk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/moduleHelp.js\n");

/***/ })

/******/ });