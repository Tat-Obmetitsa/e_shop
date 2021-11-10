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
/******/ 		"productPage": 0
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
/******/ 	deferredModules.push(["./src/js/productPage/productPage.js", "vendors~cart~checkout~index~productList~productPage", "cart~checkout~index~productList~productPage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
  /******/
})
/************************************************************************/
/******/({

/***/ "./src/js/productPage/formProductPage.js":
/*!***********************************************!*\
  !*** ./src/js/productPage/formProductPage.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils.js");
      //  comment form



      var reviewsSection = document.querySelector(".reviews__wrapper");
      var formReview = document.querySelector(".review__form");
      var formData = new FormData(formReview);
      var radio = document.querySelectorAll('.radio');
      formReview.addEventListener('input', function (e) {
        var el = e.target;
        var elValue = e.target.value;
        elValue.trim();

        if (el.classList.contains("name") && el.validity.valid) {
          formData.append("user", elValue);
        }

        if (el.classList.contains("email") && el.validity.valid) {
          formData.append("email", elValue);
        }

        if (el.classList.contains("comment") && el.validity.valid) {
          formData.append("description", elValue);
        }
      });

      function renderReviews(obj) {
        reviewsSection.innerHTML = " ";

        for (var i = 0; i < obj.length; i++) {
          var e = obj[i];
          var liItem = document.createElement('li');

          if (e.userImageURL === undefined || e.userImageURL === null || e.userImageURL === "") {
            e.userImageURL = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png";
          }

          liItem.classList.add('reviews__wrapper-item');
          liItem.innerHTML = "\n            <div class=\"reviews__wrapper-item_info\">\n             <img src=".concat(e.userImageURL, " class=\"user__image\"   alt=\"avatar\">\n             <h4 class=\"user__name\">").concat(e.user, "</h4>\n              <div class=\"wrapper__description-icons\" data-id=").concat(e.id, "></div >\n        </div>\n        <p class=\"user__review\"  >").concat(e.description, "</p>\n        ");
          reviewsSection.appendChild(liItem);
        }

        var starsWrapper = document.querySelectorAll(".wrapper__description-icons");
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].generateStars(obj, starsWrapper);
      }

      function checkInputs(ob) {
        var object = {
          "user": "",
          "email": "",
          "description": "",
          "star": "",
          "id": window.location.search.replace("?", "").replace("=", "")
        };
        radio.forEach(function (el) {
          if (el.checked) {
            formData.append("star", el.value);
          }
        });
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        var json = JSON.stringify(object);
        var finalObj = Object.values(object).every(function (e) {
          return e !== "";
        });

        if (finalObj) {
          var commentArray = JSON.parse(localStorage.getItem('comment')) || [];
          commentArray.push(object);
          localStorage.setItem('comment', JSON.stringify(commentArray));
          document.querySelector(".name.input").value = "";
          document.querySelector(".email.input").value = "";
          document.querySelector("textarea").value = "";
          ob.push(object);
          formData.forEach(function (value, key) {
            formData.delete(key);
          });
          renderReviews(ob);
          _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].toastSuccess.text = "Your comment is very important to us :) ";
          toastify_js__WEBPACK_IMPORTED_MODULE_0___default()(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].toastSuccess).showToast();
        }
      }

/* harmony default export */ __webpack_exports__["default"] = ({
        checkInputs: checkInputs,
        renderReviews: renderReviews
      });

      /***/
}),

/***/ "./src/js/productPage/productPage.js":
/*!*******************************************!*\
  !*** ./src/js/productPage/productPage.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
/* harmony import */ var _formProductPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formProductPage */ "./src/js/productPage/formProductPage.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../renderService */ "./src/js/renderService.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../render */ "./src/js/render.js");
/* harmony import */ var _templates_productPageGallery_hbs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../templates/productPageGallery.hbs */ "./src/templates/productPageGallery.hbs");
/* harmony import */ var _templates_productPageGallery_hbs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_productPageGallery_hbs__WEBPACK_IMPORTED_MODULE_8__);
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

      function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










      var renderService = new _render__WEBPACK_IMPORTED_MODULE_7__["default"](_renderService__WEBPACK_IMPORTED_MODULE_6__["default"].commonArray);
      var sliderSimilar = document.querySelector('.slides-similar');
      var sliderRecent = document.querySelector('.slides-recent');
      var productSection = document.querySelector('.product.section');
      var getId = window.location.search.replace("?", "").replace("=", "");
      var submitBtn = document.querySelector(".form__field-btn");

      var init = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var reviewedProducts, product, iconWrapper, viewAllBtns;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _renderService__WEBPACK_IMPORTED_MODULE_6__["default"].init();

                case 2:
                  _context.next = 4;
                  return renderService.getByIdReviews(Number(getId));

                case 4:
                  reviewedProducts = _context.sent;
                  _context.next = 7;
                  return renderService.getById(Number(getId));

                case 7:
                  product = _context.sent;
                  _context.next = 10;
                  return renderProduct(product);

                case 10:
                  _context.next = 12;
                  return _utils__WEBPACK_IMPORTED_MODULE_4__["default"].counter(product);

                case 12:
                  _context.next = 14;
                  return _utils__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();

                case 14:
                  //render reviews
                  submitBtn.addEventListener('click', function () {
                    return _formProductPage__WEBPACK_IMPORTED_MODULE_5__["default"].checkInputs(reviewedProducts);
                  });
                  _context.next = 17;
                  return _formProductPage__WEBPACK_IMPORTED_MODULE_5__["default"].renderReviews(reviewedProducts);

                case 17:
                  iconWrapper = document.querySelectorAll(".wrapper__description-icons");
                  _context.next = 20;
                  return _utils__WEBPACK_IMPORTED_MODULE_4__["default"].generateStars(reviewedProducts, iconWrapper);

                case 20:
                  viewAllBtns = document.querySelectorAll('.section__view-button');
                  viewAllBtns[0].addEventListener('click', function () {
                    return window.location.href = "http://github.com/Tat-Obmetitsa/e_shop/productList.html?=".concat(product.tags.split(', ')[0]);
                  });
                  viewAllBtns[1].addEventListener('click', function () {
                    return window.location.href = "http://github.com/Tat-Obmetitsa/e_shop/productList.html?=viewed";
                  });
                  _context.next = 25;
                  return addToCart();

                case 25:
                  $('.slides').slick({
                    slidesToShow: 4,
                    autoplay: true,
                    arrows: true,
                    lazyLoad: 'progressive',
                    responsive: [{
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 2,
                        arrows: false
                      }
                    }]
                  });

                case 26:
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

      function renderProduct(obj) {
        productSection.innerHTML = "\n            <img src=".concat(obj.webformatURL, " class=\"product__image\" alt=\"\" data-id=").concat(obj.id, ">\n            <div class=\"product__info\" >\n                <h2 class=\"product__info-title\" data-id=").concat(obj.id, ">").concat(obj.tags, "</h2>\n                <p class=\"product__info-price\" data-id=").concat(obj.id, ">&dollar;").concat(obj.price, "</p>\n                <p class=\"product__info-shipping\" data-id=").concat(obj.id, ">").concat(obj.shipping == 0 ? "<span class=\"free\">FREE SHIPPING!</span>" : "Shipping:  &dollar;".concat(obj.shipping), "</p>\n                <p class=\"product__info-manufacturer\" data-id=").concat(obj.id, "><b>Manufacturer</b>: ").concat(obj.manufacturer, "</p>\n                <p class=\"product__info-description\" data-id=").concat(obj.id, ">").concat(obj.description, "</p>\n                 \n                <div class=\"product__info-counter\">\n                    <span>Quantity</span>\n                    <div class=\"counter__wrapper\">\n                    <button class=\"counter-decrease button\"><span>-</span></button>\n                    <p class=\"counter-amount\">1</p>\n                    <button class=\"counter-increase button\"><span>+</span></button></div>\n                </div>\n                <button type=\"button\" class=\"add-button button\"><span>Add to cart <i class=\"fas fa-cart-plus\"></i></span></button>\n\n            </div>\n    \n    ");

        if (obj.quantity == 0) {
          document.querySelector(".add-button span").textContent = "Is not available";
          document.querySelector(".add-button").classList.add('unavailable-btn');
        } else if (obj.quantity > 0 && obj.quantity <= 5) {
          var quantityDOM = document.createElement('p');
          quantityDOM.classList.add('quantity-text', 'free');
          quantityDOM.textContent = 'Is running out!';
          document.querySelector(".add-button").previousElementSibling.append(quantityDOM);
        } // render similar   products by 1st word in tags and recent products


        var similarProducts = renderService.getFiltered(obj.tags.split(', ')[0]);
        var recentProducts = renderService.getHistoryById();
        renderService.getCategoryAll(sliderSimilar, _templates_productPageGallery_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, similarProducts);
        renderService.getCategoryAll(sliderRecent, _templates_productPageGallery_hbs__WEBPACK_IMPORTED_MODULE_8___default.a, recentProducts);
        getItems();
      } //  open products  from sliders


      function getItems() {
        var items = document.querySelectorAll(".slider__item-img");
        items.forEach(function (item) {
          item.addEventListener('click', function () {
            var viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];

            if (viewedArray.length > 5) {
              viewedArray.shift();
            }

            viewedArray.push(item.dataset.id);
            localStorage.setItem('viewed', JSON.stringify(viewedArray));
            window.location.href = "http://github.com/Tat-Obmetitsa/e_shop/productPage.html?=".concat(item.dataset.id);
          });
        });
      }

      function addToCart() {
        var item = document.querySelector('.add-button');
        var amount = document.querySelector(".counter-amount");
        var product = renderService.getById(Number(getId));
        var cartArray = JSON.parse(localStorage.getItem('cart')) || [];
        var newProduct = cartArray.every(function (cartItem) {
          return cartItem.id !== Number(getId);
        });

        if (!newProduct) {
          item.classList.add("unavailable-btn", 'valid');
          item.innerHTML = "<span>Added to cart <i class=\"fas fa-check\"></i></span>       \n                ";
          document.querySelector(".product__info-counter").classList.add('hidden');
          _utils__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess.text = "Item was added to cart";
          toastify_js__WEBPACK_IMPORTED_MODULE_2___default()(_utils__WEBPACK_IMPORTED_MODULE_4__["default"].toastSuccess).showToast();
        }

        item.addEventListener('click', function () {
          if (cartArray.length > 0) {
            if (newProduct) {
              cartArray.push({
                "id": Number(product.id),
                "price": Number(product.price),
                "services": 0,
                "quantity": product.quantity,
                "image": product.webformatURL,
                "name": product.tags,
                "amount": Number(amount.textContent),
                "shipping": Number(product.shipping)
              });
              localStorage.setItem('cart', JSON.stringify(cartArray));
              item.classList.add("unavailable-btn", 'valid');
              item.innerHTML = "<span>Added to cart <i class=\"fas fa-check\"></i></span>       \n                ";
              document.querySelector(".product__info-counter").classList.add('hidden');
              _utils__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();
            } else return;
          } else if (cartArray.length === 0 && product.quantity > 0) {
            cartArray.push({
              "id": Number(product.id),
              "price": Number(product.price),
              "services": 0,
              "quantity": product.quantity,
              "image": product.webformatURL,
              "name": product.tags,
              "amount": Number(amount.textContent),
              "shipping": Number(product.shipping)
            });
            localStorage.setItem('cart', JSON.stringify(cartArray));
            item.classList.add("unavailable-btn", 'valid');
            item.innerHTML = "<span>Added to cart <i class=\"fas fa-check\"></i></span>       \n                ";
            document.querySelector(".product__info-counter").classList.add('hidden');
            _utils__WEBPACK_IMPORTED_MODULE_4__["default"].displayCartItemCount();
          }
        });
      }

      window.addEventListener('load', function () {
        return _utils__WEBPACK_IMPORTED_MODULE_4__["default"].spinner();
      });
      window.addEventListener('DOMContentLoaded', init);

      /***/
}),

/***/ "./src/templates/productPageGallery.hbs":
/*!**********************************************!*\
  !*** ./src/templates/productPageGallery.hbs ***!
  \**********************************************/
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

          return "<div class=\"slider__item\">\r\n    <img class=\"slider__item-img\" src=\""
            + ((stack1 = ((helper = (helper = lookupProperty(helpers, "webformatURL") || (depth0 != null ? lookupProperty(depth0, "webformatURL") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "webformatURL", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 39 }, "end": { "line": 3, "column": 57 } } }) : helper))) != null ? stack1 : "")
            + "\" alt=\""
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 64 }, "end": { "line": 3, "column": 72 } } }) : helper)))
            + "\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 3, "column": 82 }, "end": { "line": 3, "column": 88 } } }) : helper)))
            + " />\r\n    <div class=\"slider__item-description\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 4, "column": 50 }, "end": { "line": 4, "column": 56 } } }) : helper)))
            + ">\r\n        <h3 class=\"slider__item-title\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 47 }, "end": { "line": 5, "column": 53 } } }) : helper)))
            + ">"
            + alias4(((helper = (helper = lookupProperty(helpers, "tags") || (depth0 != null ? lookupProperty(depth0, "tags") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "tags", "hash": {}, "data": data, "loc": { "start": { "line": 5, "column": 54 }, "end": { "line": 5, "column": 62 } } }) : helper)))
            + "</h3>\r\n        <span class=\"slider__item-text\" data-id="
            + alias4(((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "id", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 48 }, "end": { "line": 6, "column": 54 } } }) : helper)))
            + ">&dollar;"
            + alias4(((helper = (helper = lookupProperty(helpers, "price") || (depth0 != null ? lookupProperty(depth0, "price") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "price", "hash": {}, "data": data, "loc": { "start": { "line": 6, "column": 63 }, "end": { "line": 6, "column": 72 } } }) : helper)))
            + "</span>\r\n    </div>\r\n</div>\r\n";
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
})

  /******/
});
//# sourceMappingURL=productPage.js.map