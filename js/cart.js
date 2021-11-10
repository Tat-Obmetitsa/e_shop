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
/******/ 		"cart": 0
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
/******/ 	deferredModules.push(["./src/js/cart/cart.js", "vendors~cart~checkout~index~productList~productPage", "cart~checkout~index~productList~productPage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
  /******/
})
/************************************************************************/
/******/({

/***/ "./src/js/cart/cart.js":
/*!*****************************!*\
  !*** ./src/js/cart/cart.js ***!
  \*****************************/
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
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./src/js/cart/services.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../renderService */ "./src/js/renderService.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../render */ "./src/js/render.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
/* harmony import */ var _renderCart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./renderCart */ "./src/js/cart/renderCart.js");
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

      function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










      var renderService = new _render__WEBPACK_IMPORTED_MODULE_6__["default"](_renderService__WEBPACK_IMPORTED_MODULE_5__["default"].commonArray);
      var cart = JSON.parse(localStorage.getItem('cart'));

      function removeItem(id) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart.filter(function (cartItem) {
          return cartItem.id !== id;
        });
        return cart;
      }

      function increaseAmount(id) {
        cart = JSON.parse(localStorage.getItem('cart'));
        var newAmount;
        cart = cart.map(function (cartItem) {
          if (cartItem.id === id && cartItem.quantity > cartItem.amount) {
            newAmount = cartItem.amount + 1;
            cartItem = _objectSpread(_objectSpread({}, cartItem), {}, {
              amount: newAmount
            });
          } else if (cartItem.id === id && cartItem.quantity == cartItem.amount) {
            newAmount = cartItem.amount;
            cartItem = _objectSpread(_objectSpread({}, cartItem), {}, {
              amount: newAmount
            });
          }

          return cartItem;
        });
        return newAmount;
      }

      function decreaseAmount(id) {
        cart = JSON.parse(localStorage.getItem('cart'));
        var newAmount;
        cart = cart.map(function (cartItem) {
          if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;

            if (newAmount < 1) {
              newAmount = 1;
            }

            cartItem = _objectSpread(_objectSpread({}, cartItem), {}, {
              amount: newAmount
            });
          }

          return cartItem;
        });
        return newAmount;
      }

      var setupCartFunctionality = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var cartItemsDesktop, cartItemsMobile;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cart = JSON.parse(localStorage.getItem('cart'));
                  cartItemsDesktop = document.querySelector('.table__wrapper-desktop');
                  cartItemsMobile = document.querySelector('.table.section.mobile');
                  cartItemsDesktop.addEventListener('click', function (e) {
                    var element = e.target;
                    var parentID = Number(e.target.dataset.id); // remove

                    if (element.classList.contains('cart-item-remove-btn')) {
                      cart = removeItem(parentID);
                      element.parentElement.parentElement.remove();
                      _utils__WEBPACK_IMPORTED_MODULE_7__["default"].toastFail.text = "Item was removed from the cart!";
                      toastify_js__WEBPACK_IMPORTED_MODULE_2___default()(_utils__WEBPACK_IMPORTED_MODULE_7__["default"].toastFail).showToast();
                    } // increase


                    if (element.classList.contains('counter-increase')) {
                      var newAmount = increaseAmount(parentID);
                      element.previousElementSibling.textContent = newAmount;
                    } // decrease


                    if (element.classList.contains('counter-decrease')) {
                      var _newAmount = decreaseAmount(parentID);

                      element.nextElementSibling.textContent = _newAmount;
                    }

                    _utils__WEBPACK_IMPORTED_MODULE_7__["default"].setStorageItem('cart', cart);
                    _services__WEBPACK_IMPORTED_MODULE_4__["default"].addServices(cart);
                    var payments = _utils__WEBPACK_IMPORTED_MODULE_7__["default"].getStorageItem("payments");

                    if (payments.installmentsPrice) {
                      _services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cart);
                    }

                    _renderCart__WEBPACK_IMPORTED_MODULE_8__["default"].displayCartTotal(cart);
                    _utils__WEBPACK_IMPORTED_MODULE_7__["default"].displayCartItemCount(cart);
                  });
                  cartItemsMobile.addEventListener('click', function (e) {
                    var element = e.target;
                    var parentID = Number(e.target.dataset.id); // remove

                    if (element.classList.contains('cart-item-remove-btn')) {
                      cart = removeItem(parentID);
                      element.parentElement.parentElement.parentElement.parentElement.remove();
                      _utils__WEBPACK_IMPORTED_MODULE_7__["default"].toastFail.text = "Item was removed from the cart!";
                      toastify_js__WEBPACK_IMPORTED_MODULE_2___default()(_utils__WEBPACK_IMPORTED_MODULE_7__["default"].toastFail).showToast();
                    } // increase


                    if (element.classList.contains('counter-increase')) {
                      var newAmount = increaseAmount(parentID);
                      element.previousElementSibling.textContent = newAmount;
                    } // decrease


                    if (element.classList.contains('counter-decrease')) {
                      var _newAmount2 = decreaseAmount(parentID);

                      element.nextElementSibling.textContent = _newAmount2;
                    }

                    _utils__WEBPACK_IMPORTED_MODULE_7__["default"].setStorageItem('cart', cart);
                    _services__WEBPACK_IMPORTED_MODULE_4__["default"].addServices(cart);
                    var payments = _utils__WEBPACK_IMPORTED_MODULE_7__["default"].getStorageItem("payments");

                    if (payments.installmentsPrice) {
                      _services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cart);
                    }

                    _renderCart__WEBPACK_IMPORTED_MODULE_8__["default"].displayCartTotal(cart);
                    _utils__WEBPACK_IMPORTED_MODULE_7__["default"].displayCartItemCount(cart);
                  });

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function setupCartFunctionality() {
          return _ref.apply(this, arguments);
        };
      }();

      function getImageItems() {
        var items = document.querySelectorAll(".card_image");
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

      function displayCartItemsDOM() {
        var cart = JSON.parse(localStorage.getItem('cart'));

        if (cart) {
          cart.forEach(function (cartItem) {
            _renderCart__WEBPACK_IMPORTED_MODULE_8__["default"].addToCartDOM(cartItem);
          });
          document.querySelector(".total.section").classList.remove("hidden");
          document.querySelector(".similar.section").classList.remove("hidden");
          document.querySelectorAll(".table.section").forEach(function (e) {
            return e.classList.remove("hidden");
          });
        } else {
          document.querySelector(".total.section").classList.add("hidden");
          document.querySelector(".similar.section").classList.add("hidden");
          document.querySelectorAll(".table.section").forEach(function (e) {
            return e.classList.add("hidden");
          });
        }
      }

      document.querySelector(".credit-btn").addEventListener('click', function () {
        document.querySelector(".credit.section").classList.remove("modal-hidden");
        _services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cart);
      });
      document.querySelector(".close-button").addEventListener('click', function () {
        document.querySelector(".credit.section").classList.add("modal-hidden");
      });

      var cartSetup = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var cart, payments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  cart = JSON.parse(localStorage.getItem('cart'));
                  _context2.next = 3;
                  return _renderService__WEBPACK_IMPORTED_MODULE_5__["default"].init();

                case 3:
                  _context2.next = 5;
                  return displayCartItemsDOM();

                case 5:
                  _context2.next = 7;
                  return _renderCart__WEBPACK_IMPORTED_MODULE_8__["default"].displayCartTotal(cart);

                case 7:
                  _context2.next = 9;
                  return _utils__WEBPACK_IMPORTED_MODULE_7__["default"].displayCartItemCount();

                case 9:
                  _context2.next = 11;
                  return _services__WEBPACK_IMPORTED_MODULE_4__["default"].addServices(cart);

                case 11:
                  payments = _utils__WEBPACK_IMPORTED_MODULE_7__["default"].getStorageItem("payments");

                  if (!payments.installmentsPrice) {
                    _context2.next = 15;
                    break;
                  }

                  _context2.next = 15;
                  return _services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cart);

                case 15:
                  _context2.next = 17;
                  return setupCartFunctionality();

                case 17:
                  _context2.next = 19;
                  return getImageItems();

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function cartSetup() {
          return _ref2.apply(this, arguments);
        };
      }();

      window.addEventListener('load', function () {
        return _utils__WEBPACK_IMPORTED_MODULE_7__["default"].spinner();
      });
      window.addEventListener('DOMContentLoaded', cartSetup);

      /***/
})

  /******/
});
//# sourceMappingURL=cart.js.map