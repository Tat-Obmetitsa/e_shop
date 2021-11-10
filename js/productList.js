/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"productList": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/productList/productList.js","vendors~cart~checkout~index~productList~productPage","cart~checkout~index~productList~productPage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/productList/productList.js":
/*!*******************************************!*\
  !*** ./src/js/productList/productList.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils.js");
/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderList */ "./src/js/productList/renderList.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../renderService */ "./src/js/renderService.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../render */ "./src/js/render.js");
/* harmony import */ var _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../templates/productList.hbs */ "./src/templates/productList.hbs");
/* harmony import */ var _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var renderService = new _render__WEBPACK_IMPORTED_MODULE_7__["default"](_renderService__WEBPACK_IMPORTED_MODULE_6__["default"].commonArray);
var paginationContainer = document.querySelector('.pagination');
var productGallery = document.querySelector('.list__gallery');
var input = document.querySelectorAll('.header__wrapper-input');
var upBtn = document.querySelector('.up');
var downBtn = document.querySelector('.down');
var viewNum = document.querySelector('.list__view-results');
var categoriesBtns = document.querySelectorAll('.categories-btn.button');
var _ = undefined;
var index = 0;
var pages = [];
var data;
var active = [];
var activeRating = [];
var minPrice = [];
var maxPrice = [];
var stars = [];
var priceItem = document.querySelectorAll('.list__filter-item_price .price_list');
var ratingItem = document.querySelectorAll('.list__filter-item_rating .rating_list'); // pagination  

paginationContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('pagination')) return;

  if (e.target.classList.contains('page-btn')) {
    index = parseInt(e.target.dataset.index);
  }

  if (e.target.classList.contains('next-btn')) {
    index++;

    if (index > pages.length - 1) {
      index = 0;
    }
  }

  if (e.target.classList.contains('prev-btn')) {
    index--;

    if (index < 0) {
      index = pages.length - 1;
    }
  }

  viewNumItems(index, data.length, 9);
  getData();
  renderCategories();
}); // sort by price and render

var sort = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _pages;

    var manufacturers, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _renderService__WEBPACK_IMPORTED_MODULE_6__["default"].init();

          case 2:
            manufacturers = renderService.getFilteredManufacturer();
            _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].renderManufacturers(manufacturers); // open by clicking on homepage

            _context.t0 = window.location.search;
            _context.next = _context.t0 === '?=jacket' ? 7 : _context.t0 === '?=shirt' ? 10 : _context.t0 === '?=jeans' ? 13 : _context.t0 === '?=shoes' ? 16 : _context.t0 === '?=dress' ? 19 : _context.t0 === '?=fashion' ? 22 : _context.t0 === '?=featured' ? 25 : _context.t0 === '?=arrivals' ? 28 : _context.t0 === '?=popular' ? 31 : _context.t0 === '?=viewed' ? 34 : _context.t0 === '' ? 43 : 46;
            break;

          case 7:
            _context.next = 9;
            return getCategory('jacket');

          case 9:
            return _context.abrupt("break", 49);

          case 10:
            _context.next = 12;
            return getCategory('shirt');

          case 12:
            return _context.abrupt("break", 49);

          case 13:
            _context.next = 15;
            return getCategory('jeans');

          case 15:
            return _context.abrupt("break", 49);

          case 16:
            _context.next = 18;
            return getCategory('shoes');

          case 18:
            return _context.abrupt("break", 49);

          case 19:
            _context.next = 21;
            return getCategory('dress');

          case 21:
            return _context.abrupt("break", 49);

          case 22:
            _context.next = 24;
            return getCategory('fashion');

          case 24:
            return _context.abrupt("break", 49);

          case 25:
            _context.next = 27;
            return getCategory('cloth');

          case 27:
            return _context.abrupt("break", 49);

          case 28:
            _context.next = 30;
            return getCategory('tie');

          case 30:
            return _context.abrupt("break", 49);

          case 31:
            _context.next = 33;
            return getCategory('fashion');

          case 33:
            return _context.abrupt("break", 49);

          case 34:
            data = renderService.getHistoryById();
            response = renderService.paginate(data);
            pages = [];

            (_pages = pages).push.apply(_pages, _toConsumableArray(response));

            viewNumItems(index, data.length, 9);
            _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
            _context.next = 42;
            return productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index];

          case 42:
            return _context.abrupt("break", 49);

          case 43:
            _context.next = 45;
            return getCategory('');

          case 45:
            return _context.abrupt("break", 49);

          case 46:
            _context.next = 48;
            return getCategory(window.location.search.replace("?", "").replace("=", ""));

          case 48:
            return _context.abrupt("break", 49);

          case 49:
            // sort by price
            upBtn.addEventListener('click', function () {
              var _pages2;

              productGallery.innerHTML = '';
              upBtn.classList.add("v-hidden");
              downBtn.classList.remove("v-hidden");

              if (active.length > 0) {
                priceSort();
              } else if (activeRating.length > 0) {
                ratingFiltered();
              }

              data = renderService.sortUp(data);
              var response = renderService.paginate(data);
              pages = [];

              (_pages2 = pages).push.apply(_pages2, _toConsumableArray(response));

              viewNumItems(index, data.length, 9);
              _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
              renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
              getItems();
            });
            downBtn.addEventListener('click', function () {
              var _pages3;

              productGallery.innerHTML = '';
              downBtn.classList.add("v-hidden");
              upBtn.classList.remove("v-hidden");

              if (active.length > 0) {
                priceSort();
              } else if (activeRating.length > 0) {
                ratingFiltered();
              }

              data = renderService.sortDown(data);
              var response = renderService.paginate(data);
              pages = [];

              (_pages3 = pages).push.apply(_pages3, _toConsumableArray(response));

              viewNumItems(index, data.length, 9);
              _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
              renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
              getItems();
            }); // filter by price

            priceItem.forEach(function (e) {
              e.addEventListener('click', function (ev) {
                var element = ev.target;

                if (!element.classList.contains('active')) {
                  element.classList.add('active');
                } else {
                  element.classList.remove('active');
                }

                if (active.find(function (item) {
                  return item == element;
                })) {
                  active.forEach(function (item, i) {
                    if (item == element) {
                      active.splice(i, 1);
                    }
                  });
                } else {
                  active.push(element);
                }

                priceSort();
                getItems();
              });
            }); // filter by rating

            ratingItem.forEach(function (e) {
              e.addEventListener('click', function (ev) {
                var element = ev.target;

                if (!element.classList.contains('active-rating')) {
                  element.classList.add('active-rating');
                } else {
                  element.classList.remove('active-rating');
                }

                if (activeRating.find(function (item) {
                  return item == element;
                })) {
                  activeRating.forEach(function (item, i) {
                    if (item == element) {
                      activeRating.splice(i, 1);
                    }
                  });
                } else {
                  activeRating.push(element);
                }

                ratingFiltered();
              });
            });
            _context.next = 55;
            return getItems();

          case 55:
            _context.next = 57;
            return getData();

          case 57:
            _context.next = 59;
            return renderCategories();

          case 59:
            _context.next = 61;
            return _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();

          case 61:
            _context.next = 63;
            return getItems();

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sort() {
    return _ref.apply(this, arguments);
  };
}(); // add search on Product Page


function searchData(evt) {
  evt.preventDefault();
  renderService.query = evt.currentTarget.value;

  if (renderService.query === '') {
    return alert('Nothing was found ');
  }

  getCategory(renderService.query);
  renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
  getItems();
}

input.forEach(function (el) {
  el.addEventListener('keyup', searchData);
});

function priceSort() {
  var _pages4;

  minPrice = [];
  maxPrice = [];
  active.forEach(function (e) {
    minPrice.push(Number(e.dataset.minvalue));
    maxPrice.push(Number(e.dataset.maxvalue));
  });
  var setMin = new Set(minPrice);
  var setMax = new Set(maxPrice);
  var min = Array.from(setMin);
  var max = Array.from(setMax);

  if (min.length === 0) {
    min.push(0);
    max.push(10000000);
  }

  productGallery.innerHTML = '';
  data = renderService.sortPrice(min, max);
  var response = renderService.paginate(data);
  pages = [];

  (_pages4 = pages).push.apply(_pages4, _toConsumableArray(response));

  viewNumItems(index, data.length, 9);
  _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
  renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
}

function ratingFiltered() {
  var _pages5;

  stars = [];
  activeRating.forEach(function (e) {
    stars.push(Number(e.dataset.value));
  });
  var setStars = new Set(stars);
  var min = Array.from(setStars);

  if (min.length === 0) {
    min.push(1, 2, 3, 4, 5);
  }

  productGallery.innerHTML = '';
  data = renderService.getFilterRating(min);
  var response = renderService.paginate(data);
  pages = [];

  (_pages5 = pages).push.apply(_pages5, _toConsumableArray(response));

  viewNumItems(index, data.length, 9);
  _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
  renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
  getItems();
} //  get categories


var getData = function getData() {
  categoriesBtns[0].addEventListener('click', function () {
    return getCategory('jacket', _);
  });
  categoriesBtns[1].addEventListener('click', function () {
    return getCategory('shirt', _);
  });
  categoriesBtns[2].addEventListener('click', function () {
    return getCategory('jeans', _);
  });
  categoriesBtns[3].addEventListener('click', function () {
    return getCategory('shoes', _);
  });
  categoriesBtns[4].addEventListener('click', function () {
    return getCategory('dress', _);
  });
  categoriesBtns[5].addEventListener('click', function () {
    return getCategory('fashion', _);
  });
  categoriesBtns[6].addEventListener('click', function () {
    return getCategory('', _);
  });
  document.querySelectorAll(".filter-manufacturer").forEach(function (e) {
    e.addEventListener("click", function () {
      getCategory(_, e.value);
    });
  });
};

var getCategory = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query, str) {
    var _pages6;

    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = [];
            data = renderService.getFiltered(query, str);
            response = renderService.paginate(data);
            pages = [];

            (_pages6 = pages).push.apply(_pages6, _toConsumableArray(response));

            viewNumItems(index, data.length, 9);
            _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);

            if (active.length > 0) {
              priceSort();
            } else if (activeRating.length > 0) {
              ratingFiltered();
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCategory(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var viewNumItems = function viewNumItems(page, total, itemsOnPage) {
  page = page + 1;
  var start = (page - 1) * itemsOnPage + 1;
  var end = Math.min(page * itemsOnPage, total);

  if (data.length > 0) {
    viewNum.textContent = "Viewing ".concat(start, " to ").concat(end, " of ").concat(total, " ");
    paginationContainer.classList.remove('hidden');
  } else {
    viewNum.textContent = "Nothing was found :( ";
    paginationContainer.classList.add('hidden');
  }

  return viewNum;
};

function renderCategories() {
  renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
  categoriesBtns.forEach(function (e) {
    e.addEventListener('click', function () {
      index = 0;
      renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
      getItems();
    });
  });
  document.querySelectorAll(".filter-manufacturer").forEach(function (e) {
    e.addEventListener("click", function () {
      index = 0;
      renderService.getCategoryAll(productGallery, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, pages[index]);
      getItems();
    });
  });
  getItems();
  _renderList__WEBPACK_IMPORTED_MODULE_5__["default"].displayButtons(paginationContainer, pages, index);
}

function getItems() {
  var cartArray = JSON.parse(localStorage.getItem('cart')) || [];
  var addBtns = document.querySelectorAll(".add-btn");
  var items = document.querySelectorAll(".product-container");
  items.forEach(function (item) {
    addBtns.forEach(function (btn) {
      var newProduct = cartArray.every(function (cartItem) {
        return cartItem.id !== Number(btn.dataset.id);
      });

      if (renderService.getById(btn.dataset.id).quantity == 0) {
        btn.innerHTML = "\n                <i class=\"fas fa-times unavailable-btn\"></i>";
        btn.classList.remove('add-btn');
      }

      if (!newProduct) {
        btn.innerHTML = "<i class=\"fas fa-check unavailable-btn valid\"></i>";
        btn.classList.remove('add-btn');
      }
    });
    item.addEventListener('click', function (e) {
      var parentElement = e.target.parentElement.parentElement;
      var parentElementID = e.target.parentElement.dataset.id;
      var product = renderService.getById(Number(parentElementID));

      if (e.target.parentElement.classList.contains('details')) {
        var viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];

        if (viewedArray.length > 5) {
          viewedArray.shift();
        }

        viewedArray.push(parentElementID);
        localStorage.setItem('viewed', JSON.stringify(viewedArray));
      }

      if (parentElement && parentElement.classList.contains('add-btn') || e.target.classList.contains('add-btn')) {
        if (cartArray.length > 0) {
          var newProduct = cartArray.every(function (cartItem) {
            return cartItem.id !== Number(parentElementID);
          });

          if (newProduct && product && product.quantity > 0) {
            cartArray.push({
              "id": product.id,
              "quantity": product.quantity,
              "price": product.price,
              "services": 0,
              "image": product.webformatURL,
              "name": product.tags,
              "amount": 1,
              "shipping": product.shipping
            });
            localStorage.setItem('cart', JSON.stringify(cartArray));
            e.target.closest("button").classList.add("unavailable-btn", "valid");
            e.target.closest("button").innerHTML = "<i class=\"fas fa-check  \"></i>";
            _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();
            _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess.text = "Item was added to cart!";
            toastify_js__WEBPACK_IMPORTED_MODULE_2___default()(_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess).showToast();
          } else return;
        } else if (cartArray.length === 0 && product.quantity > 0) {
          cartArray.push({
            "id": product.id,
            "quantity": product.quantity,
            "price": product.price,
            "services": 0,
            "image": product.webformatURL,
            "name": product.tags,
            "amount": 1,
            "shipping": product.shipping
          });
          localStorage.setItem('cart', JSON.stringify(cartArray));
          e.target.closest("button").innerHTML = "<i class=\"fas fa-check unavailable-btn valid\"></i>";
          _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();
          _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess.text = "Item was added to cart!";
          toastify_js__WEBPACK_IMPORTED_MODULE_2___default()(_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess).showToast();
        }
      }
    });
  });
}

window.addEventListener('load', function () {
  return _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].spinner();
});
window.addEventListener('DOMContentLoaded', sort);

/***/ }),

/***/ "./src/js/productList/renderList.js":
/*!******************************************!*\
  !*** ./src/js/productList/renderList.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function renderManufacturers(array) {
  for (var i = 0; i < array.length; i++) {
    var e = array[i];
    var manufacturerBtn = document.createElement('button');
    manufacturerBtn.classList.add('filter-manufacturer', 'button');
    manufacturerBtn.value = e;
    manufacturerBtn.textContent = e;
    document.querySelector(".list__view-sort_manufacturer").appendChild(manufacturerBtn);
  }
} // pagination btns


function displayButtons(container, page, activeIndex) {
  var btns = page.map(function (_, pageIndex) {
    return "<button class=\"page-btn button ".concat(activeIndex === pageIndex ? 'active-btn' : 'null ', "\" data-index=\"").concat(pageIndex, "\">\n                        ").concat(pageIndex + 1, "\n                        </button>");
  });
  btns.push("<button class=\"next-btn button\">&#10095;</button>");
  btns.unshift("<button class=\"prev-btn button\">&#10094;</button>");
  container.innerHTML = btns.join('');
} // burger menu appearing click


(function () {
  var menuBtnRef = document.querySelector("[data-menu-button]");
  var mobileMenuRef = document.querySelector("[data-menu]");
  menuBtnRef.addEventListener("click", function () {
    var expanded = menuBtnRef.getAttribute("aria-expanded") === "true" || false;
    menuBtnRef.classList.toggle("is-open");
    menuBtnRef.setAttribute("aria-expanded", !expanded);
    mobileMenuRef.classList.toggle("is-open");
  });
})();

/* harmony default export */ __webpack_exports__["default"] = ({
  renderManufacturers: renderManufacturers,
  displayButtons: displayButtons
});

/***/ })

/******/ });
//# sourceMappingURL=productList.js.map