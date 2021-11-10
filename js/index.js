/******/ (function (modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for (; i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
        /******/
      }
/******/ 			installedChunks[chunkId] = 0;
      /******/
    }
/******/ 		for (moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
/******/ 		if (parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while (resolves.length) {
/******/ 			resolves.shift()();
      /******/
    }
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
    /******/
  };
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for (var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for (var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if (installedChunks[depId] !== 0) fulfilled = false;
        /******/
      }
/******/ 			if (fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
        /******/
      }
      /******/
    }
/******/
/******/ 		return result;
    /******/
  }
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
    /******/
  };
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
      /******/
    }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
    };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
  }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
    /******/
  };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
  };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/homepage/index.js", "vendors~cart~checkout~index~productList~productPage", "vendors~index", "cart~checkout~index~productList~productPage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
  /******/
})
/************************************************************************/
/******/({

/***/ "./src/js/homepage/index.js":
/*!**********************************!*\
  !*** ./src/js/homepage/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../renderService */ "./src/js/renderService.js");
/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sliders */ "./src/js/homepage/sliders.js");
/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_sliders__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../render */ "./src/js/render.js");
/* harmony import */ var _templates_popularGallery_hbs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../templates/popularGallery.hbs */ "./src/templates/popularGallery.hbs");
/* harmony import */ var _templates_popularGallery_hbs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_popularGallery_hbs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_featuredGallery_hbs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../templates/featuredGallery.hbs */ "./src/templates/featuredGallery.hbs");
/* harmony import */ var _templates_featuredGallery_hbs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_featuredGallery_hbs__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _templates_arrivalsGallery_hbs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../templates/arrivalsGallery.hbs */ "./src/templates/arrivalsGallery.hbs");
/* harmony import */ var _templates_arrivalsGallery_hbs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_templates_arrivalsGallery_hbs__WEBPACK_IMPORTED_MODULE_11__);
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

      function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }













      var renderService = new _render__WEBPACK_IMPORTED_MODULE_8__["default"](_renderService__WEBPACK_IMPORTED_MODULE_6__["default"].commonArray);

      var init = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var popularGallery, featuredGallery, arrivalsGallery, popularArr, iconDiv;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  popularGallery = document.querySelector('.popular__list');
                  featuredGallery = document.querySelector('.featured__list');
                  arrivalsGallery = document.getElementById('arrivals__list');
                  _context.next = 5;
                  return _renderService__WEBPACK_IMPORTED_MODULE_6__["default"].init();

                case 5:
                  _context.next = 7;
                  return renderService.getHomeRating(popularGallery, _templates_popularGallery_hbs__WEBPACK_IMPORTED_MODULE_9___default.a, 9);

                case 7:
                  popularArr = _context.sent;
                  _context.next = 10;
                  return renderService.getCategoryHome(featuredGallery, _templates_featuredGallery_hbs__WEBPACK_IMPORTED_MODULE_10___default.a, 'cloth', 12);

                case 10:
                  _context.next = 12;
                  return renderService.getCategoryHome(arrivalsGallery, _templates_arrivalsGallery_hbs__WEBPACK_IMPORTED_MODULE_11___default.a, 'tie', 4);

                case 12:
                  _context.next = 14;
                  return getItems();

                case 14:
                  iconDiv = document.querySelectorAll(".wrapper__description-icons");
                  _context.next = 17;
                  return _utils__WEBPACK_IMPORTED_MODULE_5__["default"].generateStars(popularArr, iconDiv);

                case 17:
                  _context.next = 19;
                  return addToCart();

                case 19:
                  _context.next = 21;
                  return _utils__WEBPACK_IMPORTED_MODULE_5__["default"].displayCartItemCount();

                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function init() {
          return _ref.apply(this, arguments);
        };
      }();

      function getItems() {
        var items = document.querySelectorAll(".wrapper__image");
        items.forEach(function (item) {
          item.addEventListener('click', function () {
            // add viewed items' id
            var viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
            var commentArray = JSON.parse(localStorage.getItem('comment')) || [];

            if (viewedArray.length > 5) {
              viewedArray.shift();
            }

            viewedArray.push(item.dataset.id);
            localStorage.setItem('viewed', JSON.stringify(viewedArray));
            localStorage.setItem('comment', JSON.stringify(commentArray));
            window.location.href = "http://tat-obmetitsa.github.io/e_shop/productPage.html?=".concat(item.dataset.id);
          });
        });
      }

      function addToCart() {
        var items = document.querySelectorAll('.add-button');
        var cartArray = JSON.parse(localStorage.getItem('cart')) || [];
        items.forEach(function (item) {
          if (renderService.getById(item.dataset.id).quantity == 0) {
            item.textContent = 'Not available';
            item.classList.add('unavailable-btn');
          }

          cartArray.forEach(function (cartItem) {
            if (cartItem.id == Number(item.dataset.id)) {
              item.classList.add("unavailable-btn", 'valid');
              item.innerHTML = "<span>Added <i class=\"fas fa-check\"></i></span>       \n                ";
            }
          });
          item.addEventListener('click', function (ev) {
            var product = renderService.getById(Number(ev.target.dataset.id));

            if (cartArray.length > 0) {
              var newProduct = cartArray.every(function (cartItem) {
                return cartItem.id !== Number(ev.target.dataset.id);
              });

              if (newProduct && product.quantity > 0) {
                cartArray.push({
                  "id": product.id,
                  "price": product.price,
                  "services": 0,
                  "quantity": product.quantity,
                  "image": product.webformatURL,
                  "name": product.tags,
                  "amount": 1,
                  "shipping": product.shipping
                });
                localStorage.setItem('cart', JSON.stringify(cartArray));
                ev.target.classList.add("unavailable-btn", 'valid');
                ev.target.innerHTML = "<span>Added <i class=\"fas fa-check\"></i></span>\n                ";
                _utils__WEBPACK_IMPORTED_MODULE_5__["default"].displayCartItemCount();
                _utils__WEBPACK_IMPORTED_MODULE_5__["default"].toastSuccess.text = "Item was added to cart!";
                toastify_js__WEBPACK_IMPORTED_MODULE_3___default()(_utils__WEBPACK_IMPORTED_MODULE_5__["default"].toastSuccess).showToast();
              } else return;
            } else if (cartArray.length === 0 && product.quantity > 0) {
              cartArray.push({
                "id": product.id,
                "price": product.price,
                "services": 0,
                "quantity": product.quantity,
                "image": product.webformatURL,
                "name": product.tags,
                "amount": 1,
                "shipping": product.shipping
              });
              localStorage.setItem('cart', JSON.stringify(cartArray));
              ev.target.classList.add("unavailable-btn", 'valid');
              ev.target.innerHTML = "<span>Added <i class=\"fas fa-check\"></i></span>\n                ";
              _utils__WEBPACK_IMPORTED_MODULE_5__["default"].displayCartItemCount();
              _utils__WEBPACK_IMPORTED_MODULE_5__["default"].toastSuccess.text = "Item was added to cart!";
              toastify_js__WEBPACK_IMPORTED_MODULE_3___default()(_utils__WEBPACK_IMPORTED_MODULE_5__["default"].toastSuccess).showToast();
            }
          });
        });
      } // redirect ro product list by "view all" btn


      (function () {
        var featuredBtn = document.querySelector(".section__view-button.featured");
        var arrivalsBtn = document.querySelector(".section__view-button.arrivals");
        var popularBtn = document.querySelector('.section__view-button.popular');
        var bannerBtn = document.querySelector(".button.all");
        var categoriesBtns = document.querySelectorAll('.categories-btn');
        featuredBtn.addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=featured";
        });
        arrivalsBtn.addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=arrivals";
        });
        popularBtn.addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=popular";
        });
        bannerBtn.addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html";
        });
        categoriesBtns[0].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=jacket";
        });
        categoriesBtns[1].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=shirt";
        });
        categoriesBtns[2].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=jeans";
        });
        categoriesBtns[3].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=shoes";
        });
        categoriesBtns[4].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=dress";
        });
        categoriesBtns[5].addEventListener('click', function () {
          return window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=fashion";
        });
      })(); // burger menu appearing click


      (function () {
        var menuBtnRef = document.querySelector("[data-menu-button]");
        var mobileMenuRef = document.querySelector("[data-menu]");
        menuBtnRef.addEventListener("click", function () {
          var expanded = menuBtnRef.getAttribute("aria-expanded") === "true" || false;
          menuBtnRef.classList.toggle("is-open");
          menuBtnRef.setAttribute("aria-expanded", !expanded);
          mobileMenuRef.classList.toggle("is-open");
        });
      })(); // input appearing click


      (function () {
        var searchBtn = document.querySelectorAll('.search');
        var input = document.querySelectorAll('.header__wrapper-input');
        searchBtn.forEach(function (el) {
          el.addEventListener('click', function () {
            input.forEach(function (e) {
              e.addEventListener('keyup', function (ev) {
                ev.preventDefault();

                if (e.value !== '') {
                  el.onclick = function () {
                    window.location.href = "http://tat-obmetitsa.github.io/e_shop/productList.html?=".concat(e.value);
                  };
                }
              });
              e.classList.toggle('hidden');
            });
          });
        });
      })();

      window.addEventListener('load', function () {
        return _utils__WEBPACK_IMPORTED_MODULE_5__["default"].spinner();
      });
      window.addEventListener('DOMContentLoaded', init);

      /***/
    }),

/***/ "./src/js/homepage/sliders.js":
/*!************************************!*\
  !*** ./src/js/homepage/sliders.js ***!
  \************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      var _$$slick, _ref;

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      // homepage sliders
      $('.slick').slick((_$$slick = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        lazyLoad: 'progressive',
        mobileFirst: true
      }, _defineProperty(_$$slick, "slidesToShow", 1), _defineProperty(_$$slick, "infinite", true), _defineProperty(_$$slick, "responsive", [{
        breakpoint: 1200,
        settings: {
          arrows: true,
          dots: true
        }
      }]), _$$slick));
      $('.slider').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        lazyLoad: 'progressive',
        mobileFirst: true,
        responsive: [(_ref = {
          breakpoint: 765,
          settings: {
            slidesToShow: 2
          }
        }, _defineProperty(_ref, "breakpoint", 1200), _defineProperty(_ref, "settings", {
          slidesToShow: 3,
          arrows: true
        }), _ref)]
      });

      /***/
    }),

/***/ "./src/templates/arrivalsGallery.hbs":
/*!*******************************************!*\
  !*** ./src/templates/arrivalsGallery.hbs ***!
  \*******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var Handlebars = __webpack_require__(/*! ../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
      function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
      module.exports = (Handlebars["default"] || Handlebars).template({
        "1": function (container, depth0, helpers, partials, data) {
          var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return "<li class=\"arrivals__list-item\">\r\n    <img class=\"wrapper__image\" src=\""
            + ((stack1 = ((helper = (helper = lookupProperty(helpers, "webformatURL") || (depth0 != null ? lookupProperty(depth0, "webformatURL") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "webformatURL", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 37 }, "end": { "line": 3, "column": 55 } } }) : helper))) != null ? stack1 : "")
            + "\" alt=\""
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 62 }, "end": { "line": 3, "column": 70 } } }) : helper)))
            + "\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 80 }, "end": { "line": 3, "column": 86 } } }) : helper)))
            + " />\r\n    <div class=\"wrapper__description cart__card\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 4, "column": 57 }, "end": { "line": 4, "column": 63 } } }) : helper)))
            + ">\r\n        <h3 class=\"wrapper__description-title\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 55 }, "end": { "line": 5, "column": 61 } } }) : helper)))
            + ">"
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 62 }, "end": { "line": 5, "column": 70 } } }) : helper)))
            + "</h3>\r\n        <span class=\"wrapper__description-text\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 56 }, "end": { "line": 6, "column": 62 } } }) : helper)))
            + ">&dollar;"
            + alias4(((helper = (helper = lookupProperty(helpers, "price") || (depth0 != null ? lookupProperty(depth0, "price") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "price", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 71 }, "end": { "line": 6, "column": 80 } } }) : helper)))
            + "</span>\r\n    </div>\r\n</li>\r\n";
        }, "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
          var stack1, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 9, "column": 9 } } })) != null ? stack1 : "");
        }, "useData": true
      });

      /***/
    }),

/***/ "./src/templates/featuredGallery.hbs":
/*!*******************************************!*\
  !*** ./src/templates/featuredGallery.hbs ***!
  \*******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var Handlebars = __webpack_require__(/*! ../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
      function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
      module.exports = (Handlebars["default"] || Handlebars).template({
        "1": function (container, depth0, helpers, partials, data) {
          var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return "<li class=\"featured__list-item cart__card\">\r\n    <img class=\"wrapper__image\" src=\""
            + ((stack1 = ((helper = (helper = lookupProperty(helpers, "webformatURL") || (depth0 != null ? lookupProperty(depth0, "webformatURL") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "webformatURL", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 37 }, "end": { "line": 3, "column": 55 } } }) : helper))) != null ? stack1 : "")
            + "\" alt=\""
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 62 }, "end": { "line": 3, "column": 70 } } }) : helper)))
            + "\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 80 }, "end": { "line": 3, "column": 86 } } }) : helper)))
            + " />\r\n    <div class=\"wrapper__description\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 4, "column": 46 }, "end": { "line": 4, "column": 52 } } }) : helper)))
            + ">\r\n        <h3 class=\"wrapper__description-title\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 55 }, "end": { "line": 5, "column": 61 } } }) : helper)))
            + ">"
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 62 }, "end": { "line": 5, "column": 70 } } }) : helper)))
            + "</h3>\r\n        <span class=\"wrapper__description-text\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 56 }, "end": { "line": 6, "column": 62 } } }) : helper)))
            + ">&dollar;"
            + alias4(((helper = (helper = lookupProperty(helpers, "price") || (depth0 != null ? lookupProperty(depth0, "price") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "price", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 71 }, "end": { "line": 6, "column": 80 } } }) : helper)))
            + "</span>\r\n        <button type=\"button\" class=\"button add-button\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 7, "column": 64 }, "end": { "line": 7, "column": 70 } } }) : helper)))
            + ">Add to Cart</button>\r\n    </div>\r\n</li>\r\n";
        }, "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
          var stack1, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 10, "column": 9 } } })) != null ? stack1 : "");
        }, "useData": true
      });

      /***/
    }),

/***/ "./src/templates/popularGallery.hbs":
/*!******************************************!*\
  !*** ./src/templates/popularGallery.hbs ***!
  \******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var Handlebars = __webpack_require__(/*! ../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
      function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
      module.exports = (Handlebars["default"] || Handlebars).template({
        "1": function (container, depth0, helpers, partials, data) {
          var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return "<li class=\"popular__list-item\">\r\n    <img class=\"wrapper__image\" src=\""
            + alias4(((helper = (helper = lookupProperty(helpers, "webformatURL") || (depth0 != null ? lookupProperty(depth0, "webformatURL") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "webformatURL", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 37 }, "end": { "line": 3, "column": 53 } } }) : helper)))
            + " \" alt=\""
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 61 }, "end": { "line": 3, "column": 69 } } }) : helper)))
            + "\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 79 }, "end": { "line": 3, "column": 85 } } }) : helper)))
            + " />\r\n    <div class=\"wrapper__description\">\r\n        <h3 class=\"wrapper__description-title\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 55 }, "end": { "line": 5, "column": 61 } } }) : helper)))
            + ">"
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 62 }, "end": { "line": 5, "column": 70 } } }) : helper)))
            + "</h3>\r\n        <span class=\"wrapper__description-text\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 56 }, "end": { "line": 6, "column": 62 } } }) : helper)))
            + ">&dollar;"
            + alias4(((helper = (helper = lookupProperty(helpers, "price") || (depth0 != null ? lookupProperty(depth0, "price") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "price", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 71 }, "end": { "line": 6, "column": 80 } } }) : helper)))
            + "</span>\r\n        <div class=\"wrapper__description-icons\"></div>\r\n    </div>\r\n</li>\r\n";
        }, "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
          var stack1, lookupProperty = container.lookupProperty || function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined
          };

          return ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 10, "column": 9 } } })) != null ? stack1 : "");
        }, "useData": true
      });

      /***/
    })

  /******/
});
//# sourceMappingURL=index.js.map