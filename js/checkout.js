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
/******/ 		"checkout": 0
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
/******/ 	deferredModules.push(["./src/js/checkout/checkout.js","vendors~cart~checkout~index~productList~productPage","vendors~checkout","cart~checkout~index~productList~productPage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/checkout/checkout.js":
/*!*************************************!*\
  !*** ./src/js/checkout/checkout.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps */ "./src/js/checkout/maps.js");
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_maps__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _np_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./np-map */ "./src/js/checkout/np-map.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ "./src/js/checkout/validation.js");
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
/* harmony import */ var _refs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./refs */ "./src/js/checkout/refs.js");






 // let formData = new FormData(form);
// year and month select, short forms

(function () {
  _utils__WEBPACK_IMPORTED_MODULE_5__["default"].displayCartItemCount();
  var today = new Date();
  var year = today.getFullYear();
  var yearArr = [];
  var monthsArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  yearArr.push(year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4);

  for (var i = 0; i < monthsArr.length; i++) {
    var el = document.createElement('option');
    el.textContent += monthsArr[i];
    el.setAttribute('value', monthsArr[i]);
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].monthSelect.appendChild(el);
  }

  for (var _i = 0; _i < 9; _i++) {
    var _el = document.createElement('option');

    var shortYear = yearArr[_i].toString().slice(2);

    _el.textContent += Number(shortYear);

    _el.setAttribute('value', shortYear);

    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].yearSelect.appendChild(_el);
  }
})(); // add value to card


_refs__WEBPACK_IMPORTED_MODULE_6__["default"].nameInput.oninput = function () {
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].nameCard.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].nameInput.value.toLocaleUpperCase();
};

$('.card-number').on('input', function () {
  $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''));
});
$('.card-number').mask("0000 0000 0000 0000");

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].numInput.oninput = function () {
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].numCard.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].numInput.value;
};

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].monthSelect.onchange = function () {
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].monthCard.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].monthSelect.value;
};

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].yearSelect.onchange = function () {
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].yearCard.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].yearSelect.value;
};

$('.cvv').on('input', function () {
  $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''));
});
$('.cvv').mask('000');

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvInput.oninput = function () {
  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvInput.value.length > 3) {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvInput.value = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvInput.value.slice(0, 3);
  }

  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvCard.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].cvvInput.value.toLocaleUpperCase();
};

function getData() {
  var payments = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].getStorageItem("payments");
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsPrice.textContent = "$".concat(Number(payments.totalItemsPrice).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsDiscount.textContent = "".concat(payments.discount ? payments.discount : 0, "%");
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsServices.textContent = "$".concat(Number(payments.services).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent = "$".concat(Number(payments.finalTotal).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryPrice[0].textContent = "$".concat(Number(0).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryPrice[1].textContent = "$".concat(Number(payments.shipping).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryPrice[2].textContent = "$".concat((Number(payments.shipping) + 20).toFixed(2), " ");
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent = "$".concat((Number(payments.finalTotal) - Number(payments.shipping) + Number(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsShipping.textContent.slice(1))).toFixed(2));
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentPrice.textContent = "".concat((Number(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent.slice(1)) * 5 / 100).toFixed(2));

  if (!_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[0].checked) {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent = "$".concat((Number(payments.finalTotal) - Number(payments.shipping) + Number(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsShipping.textContent.slice(1))).toFixed(2));
  } else {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent = "".concat((Number(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsTotalPrice.textContent.slice(1)) + Number(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentPrice.textContent)).toFixed(2));
  }

  if (payments.installmentsPrice !== undefined) {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].installmetPrice.innerHTML = "\n        * ".concat(payments.installmentsPrice.paymentsNumber, " payments $").concat(payments.installmentsPrice.paymentPrice, " for ").concat(payments.installmentsPrice.paymentsDuration, " months via ").concat(payments.installmentsPrice.bank, " ");
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].installmetPrice.classList.remove('hidden');
  }
}

getData(); // add info to notification card

function checkInputs() {
  validatePayment();

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[0].checked) {
    _validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment = {
      paymentMethod: 'On Delivery',
      postagePercent: "5%",
      postageFees: Number(document.querySelector(".postage__price").textContent)
    };
  }

  document.getElementsByName("address").forEach(function (el) {
    el.required = false;

    if (el.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[0].checked) {
      if (el.value !== "Akademika Hlushkova Ave, 31А, Kyiv" && el.value !== "вул. Оптимістична, 1, Hatne" && el.value !== "Kyivska St, 166, Obukhiv") {
        el.setCustomValidity("Choose the store from the list");
      } else {
        _validation__WEBPACK_IMPORTED_MODULE_3__["default"].address = el.value;
        el.setCustomValidity('');
        el.setAttribute("readonly", true);
      }
    }

    if (document.querySelectorAll(".map-places")[1].length == 0 && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[1].checked) {
      el.setCustomValidity("Type city name in Russian on Ukrainian and click Search");
    } else {
      document.querySelectorAll(".office_item").forEach(function (e) {
        e.addEventListener("click", function () {
          return _validation__WEBPACK_IMPORTED_MODULE_3__["default"].address = e.textContent;
        });
        el.setCustomValidity("");
      });
    }

    if (el.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[2].checked) {
      _validation__WEBPACK_IMPORTED_MODULE_3__["default"].address = el.value + ", apartment: " + document.getElementById("flat").value;
    } else if (el.value == '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[2].checked) {
      el.setCustomValidity("Choose address from the list ");
    }

    if (el.required && e.value == '') {
      el.setCustomValidity('');
    } else if (el.required && e.value !== '') {
      _validation__WEBPACK_IMPORTED_MODULE_3__["default"].address = el.value;
    }
  }); // add into to submit notification

  var notificationDOM = "\n    <li><h3>Full Name:</h3><span>".concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].name, "</span></li >\n    <li><h3>Contact</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].contact, "</span></li>\n    <li><h3>Delivery Method:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].deliveryMethod, "</span></li>\n    <li><h3>Address:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].address, "</span></li>    ");

  if (_validation__WEBPACK_IMPORTED_MODULE_3__["default"].deliveryMethod === 'Courier Delivery') {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].detailsBuyer.innerHTML = notificationDOM + "<li><h3>Zip Code:</h3><span>".concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].zip, "</span></li>\n        <li><h3>Delivery date</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].delivery_date, "</span></li>");
  } else {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].detailsBuyer.innerHTML = notificationDOM;
  }

  if (_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.paymentMethod === 'Online') {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].detailsPayment.innerHTML = "\n        <li><h3>Payment Method:</h3><span>".concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.paymentMethod, "</span></li >\n        <li><h3>Pay by:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.payBy, "</span></li>\n         <li><h3>Name on Card:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.cardName, "</span></li>\n          <li><h3>Card Number:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.cardNumber, "</span></li>\n           <li><h3>CVV Code:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.cvv, "</span></li>\n         <li><h3>Expiration Month:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.expirationMonth, "</span></li>\n          <li><h3>Expiration Year:</h3><span>").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.expirationYear, "</span></li>");
  } else if (_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.paymentMethod === 'On Delivery') {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].detailsPayment.innerHTML = "\n            <li><h3>Payment Method:</h3><span>".concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.paymentMethod, "</span></li >\n            <li><h3>Postage Percent Method:</h3><span>5%</span></li >\n            <li><h3>Postage fees:</h3><span>$").concat(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment.postageFees, "</span></li >\n        ");
  }

  var finalObj = Object.values(_validation__WEBPACK_IMPORTED_MODULE_3__["default"]).every(function (e) {
    return e !== "" && e !== undefined;
  });
  var paymentObj = Object.values(_validation__WEBPACK_IMPORTED_MODULE_3__["default"].payment).every(function (e) {
    return e !== "" && e !== undefined;
  });
  var payments = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].getStorageItem("payments");
  payments.shipping = document.querySelector(".items-shipping").textContent;
  payments.finalTotal = document.querySelector(".items-total-price").textContent;

  if (finalObj && paymentObj) {
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].formOverlay.classList.add('show');
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].completeWrapper.classList.add('show');
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].form.classList.add('hide');
    document.querySelector(".order").classList.add('v-hidden');
    document.querySelector(".cart-amount").textContent = 0;
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].sectionTitle.classList.add('hidden');
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].spans.forEach(function (el) {
      return el.classList.add('active');
    });
    var cart = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].getStorageItem("cart"); // make single json of the order

    var order = {};
    order.items = cart;
    order.delivery = _validation__WEBPACK_IMPORTED_MODULE_3__["default"];
    order.payments = payments;
    localStorage.clear();
    _utils__WEBPACK_IMPORTED_MODULE_5__["default"].setStorageItem("order", JSON.stringify(order));
  }

  ;
}

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].checkBtn.addEventListener('click', function () {
  checkInputs();
}); // on close notification

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].closeFormBtn.addEventListener('click', function () {
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].formOverlay.classList.remove('show');
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].form.action = "checkout.html";
});

function validatePayment() {
  var cardName = document.querySelector(".name");
  var cardCvv = document.querySelector(".cvv");
  var cardNum = document.querySelector(".card-number");

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[1].checked) {
    // validation of online payment 
    cardName.required = true;
    cardNum.required = true;
    cardCvv.required = true;
  }

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[0].checked) {
    cardName.required = false;
    cardNum.required = false;
    cardCvv.required = false;
  }
}

$(document).ready(function () {
  $('#contact').mask('+380 00 000 0000');
  $('#code').mask('00000'); // $("#card-number").mask("0000 0000 0000 0000");

  $(".cvv").focus(function () {
    $(".card").addClass('flipped');
  });
  $(".cvv").blur(function () {
    $(".card").removeClass('flipped');
  });
  $("#req_date").flatpickr({
    altInput: true,
    enableTime: true,
    altFormat: "d.m.Y / H:i",
    dateFormat: "d-m-Y H:i",
    disableMobile: true,
    minDate: "today",
    maxDate: new Date().fp_incr(14),
    minTime: "09:00",
    maxTime: "20:30",
    allowInput: true
  });
});
/* harmony default export */ __webpack_exports__["default"] = ({
  getData: getData
});

/***/ }),

/***/ "./src/js/checkout/maps.js":
/*!*********************************!*\
  !*** ./src/js/checkout/maps.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//  map with Rozetka Stores
function initMapStores() {
  var kyiv = {
    lat: 50.230,
    lng: 30.596
  };
  var mapStores = new google.maps.Map(document.getElementById("map-canvas"), {
    center: kyiv,
    zoom: 9,
    mapId: "8d193001f940fde3"
  });
  var service = new google.maps.places.PlacesService(mapStores);
  service.nearbySearch({
    location: kyiv,
    radius: 15000,
    name: "Rozetka",
    type: "store"
  }, function (results, status) {
    if (status !== "OK" || !results) return;
    addPlaces(results, mapStores);
  });
}

function addPlaces(places, map) {
  var placesList = document.getElementById("places");

  var _iterator = _createForOfIteratorHelper(places),
      _step;

  try {
    var _loop = function _loop() {
      var place = _step.value;

      if (place.geometry && place.geometry.location) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          placeId: place.place_id,
          address: place.vicinity,
          icon: image,
          title: place.name + "   " + place.vicinity,
          position: place.geometry.location
        });
        marker.addListener("click", function () {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
          document.querySelector(".store-address").value = marker.address;
        });
        var li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.classList.add("store_item");
        li.addEventListener("click", function () {
          map.setCenter(place.geometry.location);
          document.querySelector(".store-address").value = place.vicinity;
          document.getElementById("address").setAttribute("readonly", true);
        });
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} //  map with autocomplete


var placeSearch, autocomplete;
var componentForm = {
  street_number: 'long_name',
  route: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  locality: 'long_name',
  postal_code: 'short_name'
};

function initAutocompleteForm() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 40.749933,
      lng: -73.98633
    },
    zoom: 13,
    mapTypeControl: false
  });
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete-address'), {
    types: ['address'],
    strictBounds: false,
    componentRestrictions: {
      country: 'ua'
    }
  });
  autocomplete.bindTo("bounds", map);
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  autocomplete.addListener('place_changed', fillInAddress);

  function fillInAddress() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = place.formatted_address;
    infowindow.open(map, marker);
    var fetched_address = [];

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];

      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        fetched_address[addressType] = val;
      }
    } // Prefill


    var combined_address = "";

    if (typeof fetched_address['street_number'] != "undefined") {
      combined_address = fetched_address['street_number'];
    }

    if (typeof fetched_address['route'] != "undefined") {
      if (combined_address != "") {
        combined_address += " ";
      }

      combined_address += fetched_address['route'];
    }

    if (typeof fetched_address['postal_code'] == "undefined") {
      fetched_address['postal_code'] = '-';
    }

    if (typeof fetched_address['administrative_area_level_1'] == "undefined") {
      fetched_address['administrative_area_level_1'] = '-';
    }

    $('#bill_address').val(combined_address);
    $('#city').val(fetched_address['locality']);
    $('#bill_state').val(fetched_address['administrative_area_level_1']);
    $('#code').val(fetched_address['postal_code']);
    $('#bill_country').val(fetched_address['country']);
    var $addressform = $('#address-mini-form');
    $addressform.addClass('has-success has-feedback');

    if (!$addressform.find('.form-control-feedback').length) {
      $addressform.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
    }
  }
}

$(function () {
  var geolocate = function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  };

  $('.address-container').on('focus', '#address', function (e) {
    geolocate();
  });
  $('#address-mini-form input').on('keyup', function (e) {
    var $this = $(this),
        $parent = $this.parents('#address-mini-form');
    $parent.removeClass('has-success has-feedback');
    $parent.find('.form-control-feedback').remove();
  });
  $('[data-show-fullform]').click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href'));
    $target.show();
    $('#address-mini-form').hide();
  });
});
google.maps.event.addDomListener(window, 'load', initMapStores);
google.maps.event.addDomListener(window, 'load', initAutocompleteForm);

/***/ }),

/***/ "./src/js/checkout/np-map.js":
/*!***********************************!*\
  !*** ./src/js/checkout/np-map.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apiServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apiServer */ "./src/js/apiServer.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var apiService = new _apiServer__WEBPACK_IMPORTED_MODULE_1__["default"]();

function initMapPost(places) {
  var mapOffices = new google.maps.Map(document.getElementById("map-offices"), {
    center: {
      lat: 50.230,
      lng: 30.596
    },
    zoom: 9,
    mapId: "8d193001f940fde3"
  });
  addPlaces(places, mapOffices);
}

function addPlaces(places, map) {
  var placesList = document.getElementById("offices");
  placesList.innerHTML = '';

  var _iterator = _createForOfIteratorHelper(places),
      _step;

  try {
    var _loop = function _loop() {
      var place = _step.value;
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: place.lat,
          lng: place.lng
        },
        address: place.address,
        title: place.description
      });
      marker.addListener("click", function () {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
        document.querySelector(".office-address").value = marker.address;
        document.querySelector(".office-type").value = place.description.split(":")[0];
      });
      var li = document.createElement("li");
      li.textContent = place.address;
      placesList.appendChild(li);
      li.classList.add("office_item");
      li.addEventListener("click", function () {
        map.setCenter({
          lat: place.lat,
          lng: place.lng
        });
        document.querySelector(".office-num").value = place.description;
        document.querySelector(".office-type").value = place.description.split(":")[0];
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function getPostData() {
  var data = JSON.parse("{\r\n\"apiKey\": \"fd127c11026542ba1c33e03f917d813d\",\r\n \"modelName\": \"AddressGeneral\",\r\n \"calledMethod\": \"getWarehouses\",\r\n \"methodProperties\": {\r\n \"CityName\": \"Київ\"    }\r\n}");
  data.methodProperties.CityName = document.getElementById("office-address").value;
  var settings = {
    "async": "true",
    "crossDomain": "true",
    "url": "https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "processData": "false",
    "data": JSON.stringify(data)
  };
  var datums = $.ajax(settings).done(function (response) {
    var locations = [];

    for (var key in response.data) {
      if (Object.hasOwnProperty.call(response.data, key)) {
        var element = response.data[key];
        locations.push({
          lat: Number(element.Latitude),
          lng: Number(element.Longitude),
          address: element.ShortAddress,
          description: element.Description
        });
      }
    }

    if (document.getElementById("office-address").value == "") {
      locations = [];
    }

    initMapPost(locations);
    return locations;
  });
  return datums;
}

document.querySelector(".search-address").addEventListener("click", function () {
  return getPostData();
});
google.maps.event.addDomListener(window, 'load', getPostData);

/***/ }),

/***/ "./src/js/checkout/refs.js":
/*!*********************************!*\
  !*** ./src/js/checkout/refs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
 // Checkout Page
//  delivery 

var deliveryRadio = document.querySelectorAll(".delivery-check");
var deliveryDetails = document.querySelectorAll(".delivery-details");
var deliveryPrice = document.querySelectorAll(".shipping__delivery-cost");
var paymentRadio = document.querySelectorAll(".payment-check");
var paymentWrap = document.querySelectorAll(".payment__wrap");
var paymentPrice = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".postage__price"); // order

var itemsPrice = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".items-total");
var itemsDiscount = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".items-discount");
var itemsServices = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".items-services");
var itemsShipping = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".items-shipping");
var itemsTotalPrice = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".items-total-price");
var installmetPrice = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement(".installment-payment"); // validation  regular exp.

var regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
var regCity = /^[а-яА-Я]+(([' -][а-яА-Я ])?[а-яА-Я]*)*$/;
var regCvv = /^[0-9]{3}$/;
var regMonthYear = /[\d][0-9]{1}/;
var regZip = /^[0-9]{5}$/;
var regCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
var regPhone = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/; // variables checkout page form

var form = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.form');
var checkBtn = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.form__field-btn');
var address = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.address');
var contact = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.contact');
var checkbox = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.agreement');
var radio = document.querySelectorAll('.radio_btn');
var datepick = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.datepick');
var state = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.state-choice');
var stateOptions = document.querySelectorAll('.state-option'); // form notification

var detailsBuyer = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.details-buyer');
var detailsPayment = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.details-payment');
var formOverlay = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.form-overlay');
var closeFormBtn = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.form-close');
var completeWrapper = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.complete__wrapper');
var sectionTitle = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.section__title');
var spans = document.querySelectorAll('.progress__list span');
var completeBtn = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.complete__wrapper-button'); //  variables for card in form

var nameInput = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.card-name');
var nameCard = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.name-surname');
var numInput = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.card-number');
var numCard = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.card-number_input');
var monthSelect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.month');
var monthCard = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.expiration-month');
var yearSelect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.year');
var yearCard = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.expiration-year');
var cvvInput = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.cvv');
var cvvCard = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getElement('.cvv-card');
/* harmony default export */ __webpack_exports__["default"] = ({
  checkBtn: checkBtn,
  contact: contact,
  radio: radio,
  state: state,
  address: address,
  form: form,
  nameInput: nameInput,
  nameCard: nameCard,
  datepick: datepick,
  numInput: numInput,
  numCard: numCard,
  monthSelect: monthSelect,
  monthCard: monthCard,
  yearSelect: yearSelect,
  yearCard: yearCard,
  cvvInput: cvvInput,
  cvvCard: cvvCard,
  stateOptions: stateOptions,
  regName: regName,
  regCity: regCity,
  regCvv: regCvv,
  regMonthYear: regMonthYear,
  regZip: regZip,
  regCard: regCard,
  regPhone: regPhone,
  checkbox: checkbox,
  detailsBuyer: detailsBuyer,
  detailsPayment: detailsPayment,
  formOverlay: formOverlay,
  closeFormBtn: closeFormBtn,
  completeWrapper: completeWrapper,
  sectionTitle: sectionTitle,
  spans: spans,
  completeBtn: completeBtn,
  itemsPrice: itemsPrice,
  itemsDiscount: itemsDiscount,
  itemsServices: itemsServices,
  itemsShipping: itemsShipping,
  itemsTotalPrice: itemsTotalPrice,
  installmetPrice: installmetPrice,
  deliveryRadio: deliveryRadio,
  deliveryDetails: deliveryDetails,
  deliveryPrice: deliveryPrice,
  paymentWrap: paymentWrap,
  paymentRadio: paymentRadio,
  paymentPrice: paymentPrice
});

/***/ }),

/***/ "./src/js/checkout/validation.js":
/*!***************************************!*\
  !*** ./src/js/checkout/validation.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps */ "./src/js/checkout/maps.js");
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_maps__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ "./src/js/checkout/validation.js");
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/js/utils.js");
/* harmony import */ var _checkout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkout */ "./src/js/checkout/checkout.js");
/* harmony import */ var _refs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./refs */ "./src/js/checkout/refs.js");







var object = {
  "name": "",
  "contact": "",
  "agreement": "",
  "address": "",
  "payment": ""
};
var paymentOnline = {
  cardName: "",
  cardNumber: "",
  cvv: ""
};
var date, zip; // validation  

_refs__WEBPACK_IMPORTED_MODULE_6__["default"].form.addEventListener('input', function (e) {
  var el = e.target;
  var elValue = e.target.value;
  elValue.trim(); // buyer: full name, contact, agreement

  if (el.classList.contains("name")) {
    elValue.replace(/[0-9]/g, '');
    _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regName.test(elValue) ? (el.setCustomValidity(''), object.name = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
  } else if (el.classList.contains("contact")) {
    if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].contact.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regPhone.test(_refs__WEBPACK_IMPORTED_MODULE_6__["default"].contact.value)) {
      el.setCustomValidity('');
      object.contact = elValue;
    } else if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].contact.value.length > 17) {
      elValue = elValue.slice(0, 17);
    } else if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].contact.value.length < 17) {
      el.setCustomValidity("Number is too short");
    }
  }

  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].checkbox.checked ? object.agreement = true : object.agreement = false; // delivery

  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio.forEach(function (e) {
    e.addEventListener('change', function () {
      document.getElementsByName("address").forEach(function (e) {
        e.value = '';
        e.required = false;
      });
      validateDelivery(el);
    });
  }); // changes shipping and total in order section according to delivery method

  for (var i = 0; i < _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio.length; i++) {
    if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[i].checked) {
      _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryDetails[i].classList.remove('v-hidden');
      _refs__WEBPACK_IMPORTED_MODULE_6__["default"].itemsShipping.textContent = _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryPrice[i].textContent;
      _checkout__WEBPACK_IMPORTED_MODULE_5__["default"].getData();
    } else if (!_refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[i].checked) {
      _refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryDetails[i].classList.add('v-hidden');
    }
  } // payment 


  if (el.classList.contains("card-name")) {
    el.value.replace(/[0-9]/g, '');
    el.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regName.test(elValue) ? (el.setCustomValidity(''), paymentOnline.cardName = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
  }

  if (el.classList.contains("card-number")) {
    if (el.value !== '' && el.value.length == 19) {
      el.setCustomValidity('');
      paymentOnline.cardNumber = el.value;
    } else if (el.value.length > 19) {
      el.value = el.value.slice(0, 19);
    } else if (el.value.length < 19) {
      el.setCustomValidity('Enter full card number');
    }
  }

  if (el.classList.contains("cvv")) {
    el.value.replace(/[a-zA-Zа-яА-Я]/g, '');

    if (el.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regCvv.test(el.value)) {
      el.setCustomValidity('');
      paymentOnline.cvv = el.value;
    } else if (el.value.length > 3) {
      el.value = el.value.slice(0, 3);
    } else if (!_refs__WEBPACK_IMPORTED_MODULE_6__["default"].regCvv.test(el.value) || el.value.length < 3 || el.value > 3) {
      el.setCustomValidity("Must contain only 3 digits");
    }
  }

  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].radio.forEach(function (el) {
    if (el.checked) {
      paymentOnline.payBy = el.value;
    }
  });
  var monthSelect = document.querySelector(".month");
  var yearSelect = document.querySelector(".year");
  monthSelect.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regMonthYear.test(monthSelect.value) ? (monthSelect.setCustomValidity(''), paymentOnline.expirationMonth = monthSelect.value) : monthSelect.setCustomValidity("Select expiration month");
  yearSelect.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regMonthYear.test(yearSelect.value) ? (yearSelect.setCustomValidity(''), paymentOnline.expirationYear = yearSelect.value) : yearSelect.setCustomValidity("Select expiration year");
  _refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio.forEach(function (e) {
    e.addEventListener('change', function () {
      validatePayment();
    });
  });

  for (var _i = 0; _i < _refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio.length; _i++) {
    if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[_i].checked) {
      _refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentWrap[_i].classList.remove('v-hidden');
    } else if (!_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[_i].checked) {
      _refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentWrap[_i].classList.add('v-hidden');
    }

    _checkout__WEBPACK_IMPORTED_MODULE_5__["default"].getData();
  } // changes total in order section according to payment method


  if (document.querySelector(".datepick").value !== '' || document.querySelector(".code").value !== '') {
    object.delivery_date = document.querySelector(".datepick").value;
    object.zip = document.querySelector(".code").value;
  }

  paymentOnline.paymentMethod = 'Online';
  object.payment = paymentOnline;
});

function validateDelivery(el) {
  el.required = false;

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[0].checked) {
    // validates pick-up delivery
    el = document.querySelector(".store-address");
    el.required = true;
    object.deliveryMethod = 'Pick from Store';

    if (el.value === '' || el.value !== "Akademika Hlushkova Ave, 31А, Kyiv" && el.value !== "вул. Оптимістична, 1, Hatne" && el.value !== "Kyivska St, 166, Obukhiv") {
      el.setCustomValidity("Choose the store from the list");
    } else if (el.value === "Akademika Hlushkova Ave, 31А, Kyiv" || el.value === "вул. Оптимістична, 1, Hatne" || el.value === "Kyivska St, 166, Obukhiv") {
      el.setCustomValidity('');
      el.setAttribute("readonly", true);
    }
  } else {
    document.querySelector(".store-address").required = false;
  }

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[1].checked) {
    // validates Post delivery 
    object.deliveryMethod = 'Pick from Post Office';
    var cityInput = document.querySelector(".city");
    cityInput.required = true;

    if (el.classList.contains("city")) {
      el.value !== '' && _refs__WEBPACK_IMPORTED_MODULE_6__["default"].regCity.test(el.value) ? el.setCustomValidity('') : el.setCustomValidity("Can contain only letters, - ' in Russian or Ukrainian.Choose address from the list ");
    }
  } else {
    document.querySelector(".city").required = false;
  }

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].deliveryRadio[2].checked) {
    // validates courier delivery
    object.deliveryMethod = 'Courier Delivery';
    document.querySelector(".autocomplete-address").required = true;

    if (el.classList.contains("autocomplete-address")) {
      el.value !== '' ? (el.setCustomValidity(''), object.address = "".concat(document.querySelector(".flat.form-control").value === '' ? el.value : el.value + ", " + document.querySelector(".flat.form-control").value), zip = document.querySelector(".code").value) : el.setCustomValidity("Fill in the address, choose from the list");
    }

    var datepick = document.querySelectorAll(".datepick");
    datepick.forEach(function (e) {
      e.required = true;
    });
  } else {
    var _datepick = document.querySelectorAll(".datepick");

    document.querySelector(".autocomplete-address").required = false;

    _datepick.forEach(function (e) {
      e.required = false;
    });
  }
}

function validatePayment() {
  var cardName = document.querySelector(".card-name");
  var cardCvv = document.querySelector(".cvv");
  var cardNum = document.querySelector(".card-number");

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[1].checked) {
    // validation of online payment
    object.payment = '';
    cardName.required = true;
    cardNum.required = true;
    cardCvv.required = true;
    object.payment = paymentOnline;
  }

  if (_refs__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio[0].checked) {
    cardName.required = false;
    cardNum.required = false;
    cardCvv.required = false;
    object.payment = '';
  }
} // add mask on inputs


/* harmony default export */ __webpack_exports__["default"] = (object);

/***/ })

/******/ });
//# sourceMappingURL=checkout.js.map