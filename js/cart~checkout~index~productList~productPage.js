(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cart~checkout~index~productList~productPage"],{

/***/ "./src/js/apiServer.js":
/*!*****************************!*\
  !*** ./src/js/apiServer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApiService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var baseUrl = 'http://localhost:3030/';
var baseImgUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&category=fashion+industry';
var apiKeyImg = '19817444-e2944238b0133b6bab479e2af';

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
}

var ApiService = /*#__PURE__*/function () {
  function ApiService() {
    _classCallCheck(this, ApiService);

    this.searchQuery = '';
    this.page = 1;
  }

  _createClass(ApiService, [{
    key: "getPics",
    value: function getPics(limit, search) {
      var urlImg = "".concat(baseImgUrl, "&page=").concat(this.page, "&q=").concat(search, "&per_page=").concat(limit, "&key=").concat(apiKeyImg);
      return makeRequest('GET', urlImg).then(function (datums) {
        return datums;
      }).catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
      });
    }
  }, {
    key: "getPrice",
    value: function getPrice(limit) {
      var url = "".concat(baseUrl, "products?$sort[upc]=1&$limit=").concat(limit);
      return makeRequest('GET', url).then(function (datums) {
        return datums;
      }).catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
      });
    }
  }, {
    key: "setPage",
    value: function setPage() {
      this.page += 1;
    }
  }, {
    key: "resetPage",
    value: function resetPage() {
      this.page = 1;
    }
  }]);

  return ApiService;
}();



/***/ }),

/***/ "./src/js/cart/renderCart.js":
/*!***********************************!*\
  !*** ./src/js/cart/renderCart.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/js/cart/services.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderService */ "./src/js/renderService.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../render */ "./src/js/render.js");
/* harmony import */ var _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../templates/productList.hbs */ "./src/templates/productList.hbs");
/* harmony import */ var _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_productList_hbs__WEBPACK_IMPORTED_MODULE_6__);






var renderService = new _render__WEBPACK_IMPORTED_MODULE_5__["default"](_renderService__WEBPACK_IMPORTED_MODULE_4__["default"].commonArray);

var cartTotalDOM = document.querySelector('.table__price');
var addedCoupon;

function displayCartTotal(obj) {
  if (!obj) return;
  var coupons = ['VALTECH5', 'ILoveJS10', 'myLostCreativity25'];
  var payments = JSON.parse(localStorage.getItem('payments')) || {};
  var promoInput = document.querySelector(".promo-input");
  var submitCoupon = document.querySelector(".apply-btn");
  var discount = 0;
  var total, finalTotal;
  var servicesTotal = obj.reduce(function (prev, curr) {
    return Number(prev) + Number(curr.price * curr.amount * Number(curr.services) / 100);
  }, 0);
  var maxShipping = obj.reduce(function (prev, current) {
    return Number(prev.shipping) > Number(current.shipping) ? prev : current;
  }, {});

  if (payments.installmentsPrice !== undefined) {
    total = Number(payments.installmentsPrice.totalPrice);
  } else {
    total = obj.reduce(function (total, cartItem) {
      return total += cartItem.price * cartItem.amount;
    }, 0);
  }

  if (obj.length < 1) {
    total = 0;
    maxShipping.shipping = 0;
  }

  if (total < 1 || !payments.discount) {
    finalTotal = (total + maxShipping.shipping + servicesTotal).toFixed(2);
    cartTotalDOM.innerHTML = "\n        <span>Pay for shipping only once! Shipping cost is &dollar;".concat(maxShipping.shipping, "</span>\n        <span class=\"services-total\">Additional guarantee services:  &dollar;").concat(servicesTotal.toFixed(2), "</span>\n        <span>Total</span>\n        <span class=\"price\">&dollar;").concat(finalTotal, " </span>\n    ");
  } else if (payments.discount || addedCoupon) {
    finalTotal = (total * (100 - payments.discount) / 100 + maxShipping.shipping + servicesTotal).toFixed(2);
    cartTotalDOM.innerHTML = "\n        <span>Pay for shipping only once! Shipping cost is &dollar;".concat(maxShipping.shipping, "</span>\n        <span class=\"services-total\">Additional guarantee services:  &dollar;").concat(servicesTotal.toFixed(2), "</span>\n        <span>*Discount is not included in shipping and services cost</span>\n        <span>Total</span>\n        <span class=\"price\">&dollar;<strike>").concat((Number(total) + Number(maxShipping.shipping) + Number(servicesTotal)).toFixed(2), "</strike></span>\n        <p class=\"discount-price\"><span>Price including discount</span> <span class=\"price discount\">&dollar;").concat(finalTotal, "</span></p>\n    ");
    document.querySelector(".total__promo").classList.add('hidden');
  }

  submitCoupon.addEventListener('click', function () {
    if (coupons.find(function (e) {
      return e === promoInput.value;
    }) && total > 0) {
      addedCoupon = promoInput.value;

      if (addedCoupon === 'VALTECH5') {
        discount = 5;
      } else if (addedCoupon === 'ILoveJS10') {
        discount = 10;
      } else if (addedCoupon === 'myLostCreativity25') {
        discount = 25;
      }

      payments.discount = discount;
      _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].setStorageItem('payments', payments);
      displayCartTotal(obj);
    } else if (!coupons.find(function (e) {
      return e === promoInput.value;
    }) || total == 0 && promoInput.value !== '') {
      _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].toastFail.text = "Ivalid code!";
      toastify_js__WEBPACK_IMPORTED_MODULE_0___default()(_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].toastFail).showToast();
    }
  });
  var allPrices = document.querySelectorAll(".item-price");

  for (var i = 0; i < allPrices.length; i++) {
    var e = allPrices[i];

    if (obj[i] !== undefined) {
      e.textContent = (obj[i].price * obj[i].amount).toFixed(2);
    }
  }

  Object.assign(payments, {
    shipping: Number(maxShipping.shipping).toFixed(2),
    services: Number(servicesTotal).toFixed(2),
    totalItemsPrice: "".concat((Number(finalTotal) - Number(servicesTotal) - Number(maxShipping.shipping)).toFixed(2)),
    finalTotal: Number(finalTotal).toFixed(2)
  });
  _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].setStorageItem('payments', payments);
}

var addToCartDOM = function addToCartDOM() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var cartItemsMobile = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getElement('.table.section.mobile');
  var cartItemsDesktop = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getElement('.table__wrapper-desktop');
  var cartItemCountDOM = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getElement('.counter-amount');
  cartItemsDesktop.innerHTML = "";
  cartItemsMobile.innerHTML = "";
  var amount = cart.reduce(function (total, cartItem) {
    return total += cartItem.amount;
  }, 0);
  cartItemCountDOM.textContent = amount;
  var headingTr = document.createElement('tr');
  headingTr.classList.add("table__heading");
  headingTr.innerHTML = "\n        <th>Product</th>\n        <th>Quantity</th>\n        <th>Price</th>\n        <th>Shipping & Services</th> \n        <th></th>\n         ";

  for (var index = 0; index < cart.length; index++) {
    var item = cart[index]; // add desktop cart

    var trProduct = document.createElement('tr');
    trProduct.classList.add("table__item");
    trProduct.innerHTML = "\n                            <td class=\"table__item-card\">\n                                <img  class=\"card_image\"  src=\"".concat(item.image, "\" data-id=\"").concat(item.id, "\" alt=\"").concat(item.name, "\">\n                                <h3 data-id=\"").concat(item.id, "\">").concat(item.name, "</h3>\n                            </td>\n                            <td class=\"item__info\">\n                                <div class=\"counter-column\">\n                                    <div class=\"table__item-counter\">\n                                    <button class=\"counter-decrease button\" data-id=\"").concat(item.id, "\" value=\"-\">-</button>\n                                    <p class=\"counter-amount\" data-id=\"").concat(item.id, "\">").concat(item.amount, "</p>\n                                    <button class=\"counter-increase button\" data-id=\"").concat(item.id, "\" value=\"+\">+</button>\n                                    </div>\n                                    <p>Available in stock: ").concat(item.quantity, " </p>\n                                </div>\n                                 \n                                <div class=\"services__wrapper\">\n                                    <form action=\"\" class=\"services-form\" data-id=\"").concat(item.id, "\" >\n                                    <label><input class=\"guarantee-check tree-m\" value=\"0\" type=\"radio\" name=\"guarantee-check\" ").concat(item.services == 0 ? " checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\"  > 3 months guarantee</label>\n                                    <label><input class=\"guarantee-check six-m\" value=\"1\" type=\"radio\" name=\"guarantee-check\"  ").concat(item.services == 1 ? "checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\" > 6 months guarantee</label>\n                                    <label><input class=\"guarantee-check twelve-m\" value=\"5\" type=\"radio\" name=\"guarantee-check\"  ").concat(item.services == 5 ? "checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\"> 12 months guarantee</label>\n                                    </form>\n                                </div>\n                            </td>\n                            <td class=\"item__info\">\n                                <p>&dollar;<span class=\"item-price\">").concat((item.price * item.amount).toFixed(2), "</span></p>\n                                <p><span class=\"services-percent\">").concat(item.services, "</span>%</p>\n                            </td>\n                            <td class=\"item__info\">\n                                <p>&dollar;").concat(item.shipping, "</p>\n                                <p>&dollar;<span class=\"services-price\">").concat((item.price * item.amount * Number(item.services) / 100).toFixed(2), "</span></p>\n                            </td>\n                            <td><button class=\"cart-item-remove-btn button\" data-id=\"").concat(item.id, "\">&#128473;</button>\n                            </td> \n        ");
    cartItemsDesktop.appendChild(trProduct); // add mobile cart

    var tableMobile = document.createElement('table');
    tableMobile.classList.add("table__wrapper-mobile");
    tableMobile.innerHTML = "\n                <tr class=\"cross\">\n                    <td colspan=\"1\" class=\"table__heading\"></td>\n                    <td>\n                        <button class=\"cart-item-remove-btn button\" data-id=\"".concat(item.id, "\">&#128473;</button>\n                    </td>\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Product</td>\n                    <td class=\"table__item-card\">\n                        <img class=\"card_image\" src=\"").concat(item.image, "\" data-id=\"").concat(item.id, "\" alt=\"").concat(item.name, "\">\n                        <h3 data-id=\"").concat(item.id, "\">").concat(item.name, "</h3>\n                    </td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Quantity</td>\n                    <td>\n                        <div class=\"table__item-counter\">\n                                    <button class=\"counter-decrease button\" data-id=\"").concat(item.id, "\" value=\"-\">-</button>\n                                    <p class=\"counter-amount\" data-id=\"").concat(item.id, "\">").concat(item.amount, "</p>\n                                    <button class=\"counter-increase button\" data-id=\"").concat(item.id, "\" value=\"+\">+</button>\n                        </div>\n                        <p>Available in stock: ").concat(item.quantity, " </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Services</td>\n                    <td class=\"guarantee\">\n                        <form action=\"\" class=\"services-form\" data-id=\"").concat(item.id, "\" >\n                                    <label><input class=\"guarantee-check tree-m\" value=\"0\" type=\"radio\" name=\"guarantee-check\" ").concat(item.services == 0 ? " checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\"  > 3 months guarantee</label>\n                                    <label><input class=\"guarantee-check six-m\" value=\"1\" type=\"radio\" name=\"guarantee-check\"  ").concat(item.services == 1 ? "checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\" > 6 months guarantee</label>\n                                    <label><input class=\"guarantee-check twelve-m\" value=\"5\" type=\"radio\" name=\"guarantee-check\"  ").concat(item.services == 5 ? "checked = \"checked\"" : "", " data-id=\"").concat(item.id, "\"> 12 months guarantee</label>\n                                    </form>\n                    </td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Services Price</td>\n                    <td><span class=\"services-percent\">").concat(item.services, "</span>%   &dollar;<span class=\"services-price\">").concat((item.price * item.amount * Number(item.services) / 100).toFixed(2), "</span></td>\n                    </tr>\n                <tr>\n                    <td class=\"table__heading\">Price</td>\n                    <td class=\"item-price\">  &dollar;").concat((item.price * item.amount).toFixed(2), "</td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Shipping</td>\n                    <td>&dollar;").concat(item.shipping, "</td>\n\n                </tr>\n        ");
    cartItemsMobile.appendChild(tableMobile);
  }

  cartItemsDesktop.prepend(headingTr);
  getSimilar(cart);
  _services__WEBPACK_IMPORTED_MODULE_2__["default"].addServices(cart);
  window.addEventListener('load', function () {
    return _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].spinner();
  });
};

function getSimilar(obj) {
  var viewAllBtn = document.querySelector('.section__view-button');
  var similarSection = document.querySelector(".similar__list");
  var similarDescription = document.querySelector(".similar__info");

  if (obj.length > 0) {
    var similarProducts = renderService.getFiltered(obj[0].name.split(', ')[0]);

    if (similarProducts.length > 4) {
      renderService.getCategoryAll(similarSection, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_6___default.a, similarProducts.slice(0, 4));
      viewAllBtn.addEventListener('click', function () {
        return window.location.href = "http://localhost:3000/productList.html?=".concat(obj[0].name.split(', ')[0]);
      });
    } else if (similarProducts.length > 0 && similarProducts.length < 5) {
      renderService.getCategoryAll(similarSection, _templates_productList_hbs__WEBPACK_IMPORTED_MODULE_6___default.a, similarProducts);
      viewAllBtn.classList.add('hidden');
    }
  } else if (obj.length == 0) {
    similarDescription.classList.add('hidden');
    similarSection.innerHTML = '';
  }

  _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getItems();
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addToCartDOM: addToCartDOM,
  displayCartTotal: displayCartTotal
});

/***/ }),

/***/ "./src/js/cart/services.js":
/*!*********************************!*\
  !*** ./src/js/cart/services.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderCart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderCart */ "./src/js/cart/renderCart.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils.js");



function addServices(obj) {
  if (!obj) return;
  var radioCheck = document.querySelectorAll(".guarantee-check");
  var percentWrapperDesktop = document.querySelectorAll(".desktop .services-percent");
  var percentWrapperMobile = document.querySelectorAll(".mobile .services-percent");
  var priceWrapperDesktop = document.querySelectorAll(".desktop .services-price");
  var priceWrapperMobile = document.querySelectorAll(".mobile .services-price");

  var _loop = function _loop(index) {
    var element = obj[index];

    if (percentWrapperDesktop[index]) {
      percentWrapperDesktop[index].textContent = obj[index].services;
    } else if (percentWrapperMobile[index]) {
      percentWrapperMobile[index].textContent = obj[index].services;
    }

    if (priceWrapperDesktop[index]) {
      priceWrapperDesktop[index].textContent = (obj[index].price * obj[index].amount * Number(obj[index].services) / 100).toFixed(2);
    } else if (priceWrapperMobile[index]) {
      priceWrapperMobile[index].textContent = (obj[index].price * obj[index].amount * Number(obj[index].services) / 100).toFixed(2);
    }

    radioCheck.forEach(function (e) {
      //change services
      e.addEventListener("change", function (ev) {
        if (e.parentElement.parentElement.dataset.id == element.id) {
          obj[index].services = Number(ev.target.value);
          percentWrapperDesktop[index].textContent = ev.target.value;
          percentWrapperMobile[index].textContent = ev.target.value;
          priceWrapperDesktop[index].textContent = (obj[index].price * obj[index].amount * Number(ev.target.value) / 100).toFixed(2);
          priceWrapperMobile[index].textContent = (obj[index].price * obj[index].amount * Number(ev.target.value) / 100).toFixed(2);
          localStorage.setItem('cart', JSON.stringify(obj));
          _renderCart__WEBPACK_IMPORTED_MODULE_0__["default"].displayCartTotal(obj);
        }
      });
    });
  };

  for (var index = 0; index < obj.length; index++) {
    _loop(index);
  }
}

function addPaymentMethod(obj) {
  if (!obj) return;
  var payments = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getStorageItem("payments");
  var allPaymentNumbers = document.querySelectorAll(".payments__number");
  var allSelects = document.querySelectorAll("select");
  var allPrices = document.querySelectorAll(".payments__price");
  var allBankNames = document.querySelectorAll(".bank__name");
  var allSubmitBtns = document.querySelectorAll(".payments__approve");
  var totalPrice = [];
  var total = obj.reduce(function (total, cartItem) {
    return total += cartItem.price * cartItem.amount;
  }, 0);

  var _loop2 = function _loop2(index) {
    var element = allSelects[index];
    allPaymentNumbers[index].textContent = Number(allSelects[index].value) + 1;
    totalPrice.push((Number(total) * (100 + Number(allSelects[index].value)) / 100).toFixed(2));
    allPrices[index].textContent = (Number(totalPrice[index]) / (Number(allSelects[index].value) + 1)).toFixed(2);
    payments.installmentsPrice = {
      paymentsNumber: allPaymentNumbers[index].textContent,
      paymentPrice: allPrices[index].textContent,
      paymentsDuration: "".concat(Number(allPaymentNumbers[index].textContent)),
      bank: allBankNames[index].textContent,
      totalPrice: totalPrice[index]
    };
    $(function () {
      $(element).alwaysChange(function (val) {
        val = Number(val);
        allPaymentNumbers[index].textContent = Number(val) + 1;
        allPrices[index].textContent = (Number(total) * (100 + val) / 100 / (Number(val) + 1)).toFixed(2);
      });
    });
    allSubmitBtns[index].addEventListener('click', function () {
      if (document.querySelector(".payment-info") !== null) {
        document.querySelector(".table__price").lastChild.remove();
      }

      document.querySelector(".price").textContent = "$".concat(totalPrice[index]);
      document.querySelector(".price").classList.add('free');
      var paymentInfo = document.createElement('span');
      document.querySelector(".table__price").appendChild(paymentInfo);
      paymentInfo.textContent = "*".concat(allPaymentNumbers[index].textContent, " payments $").concat(allPrices[index].textContent, " for ").concat(Number(allPaymentNumbers[index].textContent) - 1, " months via ").concat(allBankNames[index].textContent);
      paymentInfo.classList.add('free', "payment-info");

      if (document.querySelector(".discount-price") !== null) {
        document.querySelector(".discount-price").classList.add('v-hidden');
      }

      document.querySelector(".credit.section").classList.add("modal-hidden");
      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].setStorageItem('payments', payments);
    });
  };

  for (var index = 0; index < allSelects.length; index++) {
    _loop2(index);
  }

  $.fn.alwaysChange = function (callback) {
    return this.filter('select').each(function () {
      var elem = this;
      var $this = $(this);
      $this.change(function () {
        callback($this.val());
      }).focus(function () {
        elem.selectedIndex = -1;
        elem.blur();
      });
    });
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addServices: addServices,
  addPaymentMethod: addPaymentMethod
});

/***/ }),

/***/ "./src/js/render.js":
/*!**************************!*\
  !*** ./src/js/render.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RenderService; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderService = /*#__PURE__*/function () {
  function RenderService(commonArray) {
    _classCallCheck(this, RenderService);

    this.arr = commonArray;
    this.filtered = [];
    this.query = '';
  }

  _createClass(RenderService, [{
    key: "getCategoryHome",
    value: function getCategoryHome(gallery, tpl, searchQuery, amount) {
      gallery.innerHTML = '';
      this.filtered = this.arr.filter(function (e) {
        return e.tags.includes("".concat(searchQuery));
      });
      gallery.insertAdjacentHTML('beforeend', tpl(this.filtered.slice(0, amount)));
    }
  }, {
    key: "getHomeRating",
    value: function getHomeRating(gallery, tpl, amount) {
      gallery.innerHTML = '';
      this.filtered = this.arr.filter(function (e) {
        return Number(e.star) >= 3;
      });
      var sliced = this.filtered.slice(0, amount);
      gallery.insertAdjacentHTML('beforeend', tpl(sliced));
      return sliced;
    }
  }, {
    key: "getCategoryAll",
    value: function getCategoryAll(gallery, tpl, array) {
      gallery.innerHTML = '';
      gallery.insertAdjacentHTML('beforeend', tpl(array));
    }
  }, {
    key: "getFiltered",
    value: function getFiltered(searchQuery, str) {
      if (searchQuery !== undefined) {
        this.filtered = this.arr.filter(function (e) {
          return e.tags.includes("".concat(searchQuery));
        });
      } else if (str !== undefined) {
        this.filtered = this.arr.filter(function (e) {
          return e.manufacturer == str;
        });
      }

      return this.filtered;
    }
  }, {
    key: "getFilterRating",
    value: function getFilterRating(star) {
      var _this = this;

      var newArray = [];

      var _loop = function _loop(j) {
        var pr1 = star[j];

        var array = _this.filtered.filter(function (items) {
          return items.star == pr1;
        });

        newArray.push.apply(newArray, _toConsumableArray(array));
      };

      for (var j = 0; j < star.length; j++) {
        _loop(j);
      }

      return newArray;
    }
  }, {
    key: "getManufacturer",
    value: function getManufacturer(str) {
      this.filtered = this.arr.filter(function (e) {
        return e.manufacturer == str;
      });
      return this.filtered;
    }
  }, {
    key: "getById",
    value: function getById(id) {
      return this.arr.find(function (el) {
        return el.id == id;
      });
    }
  }, {
    key: "getArrayById",
    value: function getArrayById(id) {
      var _this2 = this;

      var newArray = [];

      var _loop2 = function _loop2(j) {
        var pr1 = id[j];

        var array = _this2.arr.filter(function (items) {
          return items.id == pr1.productId;
        });

        newArray.push.apply(newArray, _toConsumableArray(array));
      };

      for (var j = 0; j < id.length; j++) {
        _loop2(j);
      }

      return newArray;
    }
  }, {
    key: "getByIdReviews",
    value: function getByIdReviews(id) {
      var array = this.arr.find(function (el) {
        return el.id == id;
      });
      return _toConsumableArray(array.reviews);
    }
  }, {
    key: "getHistoryById",
    value: function getHistoryById() {
      var array = JSON.parse(localStorage.getItem('viewed')) || [];

      if (array.length === 0) {
        array.push(window.location.search.replace("?", "").replace("=", ""));
      }

      localStorage.setItem('viewed', JSON.stringify(array));
      return this.arr.filter(function (el) {
        return array.indexOf("".concat(el.id)) > -1;
      });
    }
  }, {
    key: "sortUp",
    value: function sortUp(array) {
      if (array !== undefined) array.sort(function (a, b) {
        return a.price - b.price;
      });
      return array;
    }
  }, {
    key: "sortDown",
    value: function sortDown(array) {
      if (array !== undefined) array.sort(function (a, b) {
        return b.price - a.price;
      });
      return array;
    }
  }, {
    key: "paginate",
    value: function paginate(array) {
      var itemsPerPage = 9;
      var numberOfPages = Math.ceil(array.length / itemsPerPage);
      var newPages = Array.from({
        length: numberOfPages
      }, function (_, index) {
        var start = index * itemsPerPage;
        var newArray = array.slice(start, start + itemsPerPage);
        return newArray;
      });
      return newPages;
    }
  }, {
    key: "sortPrice",
    value: function sortPrice(price1, price2) {
      var _this3 = this;

      var newArray = [];

      var _loop3 = function _loop3(j) {
        var pr1 = price1[j];
        var pr2 = price2[j];

        var array = _this3.filtered.filter(function (items) {
          return items.price >= pr1 && items.price <= pr2;
        });

        newArray.push.apply(newArray, _toConsumableArray(array));
      };

      for (var j = 0; j < price2.length; j++) {
        _loop3(j);
      }

      return newArray;
    }
  }, {
    key: "getFilteredManufacturer",
    value: function getFilteredManufacturer() {
      var array = [];
      this.filtered = this.arr.forEach(function (e) {
        return array.push(e.manufacturer);
      });
      var result = array.reduce(function (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        array = [];
        return acc;
      }, {});

      for (var key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
          var element = result[key];

          if (element > 4) {
            array.push(key);
          }
        }
      }

      return array;
    }
  }, {
    key: "query",
    get: function get() {
      return this.searchQuery;
    },
    set: function set(newQuery) {
      this.searchQuery = newQuery;
    }
  }]);

  return RenderService;
}();



/***/ }),

/***/ "./src/js/renderService.js":
/*!*********************************!*\
  !*** ./src/js/renderService.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apiServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiServer */ "./src/js/apiServer.js");
/* harmony import */ var lorem_ipsum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lorem-ipsum */ "./node_modules/lorem-ipsum/dist/index.js");
/* harmony import */ var lorem_ipsum__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lorem_ipsum__WEBPACK_IMPORTED_MODULE_2__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var apiService = new _apiServer__WEBPACK_IMPORTED_MODULE_1__["default"]();

var lorem = new lorem_ipsum__WEBPACK_IMPORTED_MODULE_2__["LoremIpsum"]({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});
var commonArray = [];

var getCommonData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var popularPics, popularPrice;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popularPics = apiService.getPics(200, 'clothes');
            popularPrice = apiService.getPrice(200);
            _context.next = 4;
            return Promise.all([popularPics, popularPrice]).then(function (values) {
              var hitsObj = values[0].hits;
              var dataObj = values[1].data;
              var arrPrices = [];
              var arrDecriptions = [];
              var arrManufacturer = [];
              var maxObject = hitsObj.reduce(function (prev, current) {
                return prev.likes > current.likes ? prev : current;
              }, {});
              var maxLikes = maxObject.likes;
              var star = 0;
              var quantity = 0;
              var shipping = 0;

              for (var key in dataObj) {
                if (Object.hasOwnProperty.call(dataObj, key)) {
                  arrPrices.push(dataObj[key].price);
                  arrDecriptions.push(dataObj[key].description);
                  arrManufacturer.push(dataObj[key].manufacturer);
                }
              }

              for (var i = 0; i < arrPrices.length;) {
                for (var jey in hitsObj) {
                  if (hitsObj[jey].likes < maxLikes * 20 / 100) {
                    star = 1;
                  } else if (hitsObj[jey].likes >= maxLikes * 30 / 100 && hitsObj[jey].likes < maxLikes * 40 / 100) {
                    star = 2;
                  } else if (hitsObj[jey].likes >= maxLikes * 40 / 100 && hitsObj[jey].likes < maxLikes * 55 / 100) {
                    star = 3;
                  } else if (hitsObj[jey].likes >= maxLikes * 55 / 100 && hitsObj[jey].likes < maxLikes * 80 / 100) {
                    star = 4;
                  } else if (hitsObj[jey].likes >= maxLikes * 80 / 100) {
                    star = 5;
                  }

                  Object.assign(hitsObj[jey], {
                    price: "".concat(arrPrices[i]),
                    description: "".concat(arrDecriptions[i]),
                    quantity: quantity,
                    reviews: [{
                      id: "".concat(hitsObj[jey].id),
                      user: "".concat(hitsObj[jey].user),
                      userImageURL: "".concat(hitsObj[jey].userImageURL),
                      description: "".concat(lorem.generateParagraphs(1)),
                      star: "".concat(star)
                    }, {
                      id: "".concat(hitsObj[jey].id),
                      user: "MyComment",
                      userImageURL: "",
                      description: "".concat(lorem.generateSentences(2)),
                      star: "".concat(star < 5 ? star + 1 : star - 1)
                    }],
                    shipping: shipping,
                    manufacturer: "".concat(arrManufacturer[i]),
                    star: "".concat(star)
                  });
                  i += 1;
                  quantity += 1;
                  shipping += 10;

                  if (quantity > 9) {
                    quantity = 0;
                  } else if (shipping > 50) {
                    shipping = 0;
                  }
                }
              }

              commonArray.push.apply(commonArray, _toConsumableArray(hitsObj));
              var commentArray = JSON.parse(localStorage.getItem('comment')) || [];

              if (commentArray !== []) {
                commentArray.forEach(function (el) {
                  commonArray.forEach(function (e) {
                    if (el.id == e.id) {
                      e.reviews.push(el);
                      e.likes = e.likes + Number(el.star);
                    }

                    return commonArray;
                  });
                });
              }

              return commonArray;
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCommonData() {
    return _ref.apply(this, arguments);
  };
}();

var init = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getCommonData();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  init: init,
  commonArray: commonArray
});

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var _cart_renderCart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart/renderCart */ "./src/js/cart/renderCart.js");
/* harmony import */ var _renderService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderService */ "./src/js/renderService.js");
/* harmony import */ var _cart_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart/services */ "./src/js/cart/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render */ "./src/js/render.js");






var renderService = new _render__WEBPACK_IMPORTED_MODULE_5__["default"](_renderService__WEBPACK_IMPORTED_MODULE_3__["default"].commonArray);
var toastSuccess = {
  text: "",
  duration: 2000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
    borderRadius: "10px"
  }
};
var toastFail = {
  text: "",
  duration: 2000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(-45deg, red, yellow)",
    borderRadius: "10px"
  }
};

var getElement = function getElement(selection) {
  var element = document.querySelector(selection);
  if (element) return element;
  throw new Error("Please check \"".concat(selection, "\" selector, no such element exist"));
};

var getStorageItem = function getStorageItem(item) {
  var storageItem = localStorage.getItem(item);

  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }

  return storageItem;
};

var setStorageItem = function setStorageItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
};

var counter = function counter(item) {
  var counterValueRef = document.querySelector('.counter-amount');
  var addCounter = document.querySelector('.counter-increase');
  var removeCounter = document.querySelector('.counter-decrease');

  if (item.quantity == 0) {
    counterValueRef.textContent = 0;
    addCounter.classList.add('hidden');
    removeCounter.classList.add('hidden');
    return;
  } else if (counterValueRef.textContent == '1') {
    removeCounter.classList.add("unavailable-btn");
  }

  var counterValue = 1;

  if (counterValueRef.textContent == item.quantity) {
    addCounter.classList.add("unavailable-btn");
  }

  function onIncrementClick() {
    if (counterValueRef.textContent < item.quantity && item.quantity > 0) {
      counterValueRef.textContent = counterValue += 1;
      removeCounter.classList.remove("unavailable-btn");

      if (counterValueRef.textContent == item.quantity) {
        addCounter.classList.add("unavailable-btn");
      }
    }
  }

  function onDecrementClick() {
    if (counterValueRef.textContent > 1 && item.quantity > 0) {
      counterValueRef.textContent = counterValue -= 1;

      if (addCounter.classList.contains("unavailable-btn")) {
        addCounter.classList.remove("unavailable-btn");
      }
    } else if (counterValueRef.textContent == '1' && item.quantity > 0) {
      removeCounter.classList.add("unavailable-btn");
      counterValueRef.textContent = '1';
    }
  }

  addCounter.addEventListener('click', onIncrementClick);
  removeCounter.addEventListener('click', onDecrementClick);
};

function generateStars(obj, wrapper) {
  obj.forEach(function (e, i) {
    var starSign = '<i width="24" height="24" class="fas fa-star"></i>';

    if (e.star == "1") {
      wrapper[i].innerHTML = starSign;
    } else if (e.star == "2") {
      wrapper[i].innerHTML = starSign + starSign;
    } else if (e.star == "3") {
      wrapper[i].innerHTML = starSign + starSign + starSign;
    } else if (e.star == "4") {
      wrapper[i].innerHTML = starSign + starSign + starSign + starSign;
    } else if (e.star == "5") {
      wrapper[i].innerHTML = starSign + starSign + starSign + starSign + starSign;
    }
  });
}

function displayCartItemCount(array) {
  var amount;

  if (array) {
    amount = array.reduce(function (total, cartItem) {
      return total += cartItem.amount;
    }, 0);
  } else {
    var cart = getStorageItem('cart');
    amount = cart.reduce(function (total, cartItem) {
      return total += cartItem.amount;
    }, 0);
  }

  document.querySelectorAll(".cart-amount").forEach(function (e) {
    return e.textContent = amount;
  });
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
      var parentElementID = e.target.parentElement.parentElement.dataset.id;
      var product = renderService.getById(Number(parentElementID));

      if (e.target.parentElement.classList.contains('details')) {
        var viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];

        if (viewedArray.length > 5) {
          viewedArray.shift();
        }

        viewedArray.push(parentElementID);
        localStorage.setItem('viewed', JSON.stringify(viewedArray));
      }

      if (e.target.parentElement.parentElement.classList.contains('add-btn')) {
        if (cartArray.length > 0) {
          var newProduct = cartArray.every(function (cartItem) {
            return cartItem.id !== Number(parentElementID);
          });

          if (newProduct && product.quantity > 0) {
            cartArray.push({
              "id": product.id,
              "price": product.price,
              "quantity": product.quantity,
              "services": 0,
              "image": product.webformatURL,
              "name": product.tags,
              "amount": 1,
              "shipping": product.shipping
            });
            e.target.closest("button").classList.add("unavailable-btn", "valid");
            e.target.closest("button").innerHTML = "<i class=\"fas fa-check  \"></i>";
            addNewToCart(cartArray);
            _cart_services__WEBPACK_IMPORTED_MODULE_4__["default"].addServices(cartArray);
            var payments = getStorageItem("payments");

            if (payments.installmentsPrice) {
              _cart_services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cartArray);
            }

            _cart_renderCart__WEBPACK_IMPORTED_MODULE_2__["default"].displayCartTotal(cartArray);
            toastSuccess.text = "Success! Item was added";
            toastify_js__WEBPACK_IMPORTED_MODULE_0___default()(toastSuccess).showToast();
            localStorage.setItem('cart', JSON.stringify(cartArray));
            displayCartItemCount();
          } else return;
        } else if (cartArray.length === 0 && product.quantity > 0) {
          cartArray.push({
            "id": product.id,
            "price": product.price,
            "image": product.webformatURL,
            "services": 0,
            "quantity": product.quantity,
            "name": product.tags,
            "amount": 1,
            "shipping": product.shipping
          });
          e.target.closest("button").innerHTML = "<i class=\"fas fa-check unavailable-btn valid\"></i>";
          displayCartItemCount();
          _cart_renderCart__WEBPACK_IMPORTED_MODULE_2__["default"].addToCartDOM();
          _cart_services__WEBPACK_IMPORTED_MODULE_4__["default"].addServices(cartArray);

          var _payments = utils.getStorageItem("payments");

          if (_payments.installmentsPrice) {
            _cart_services__WEBPACK_IMPORTED_MODULE_4__["default"].addPaymentMethod(cartArray);
          }

          _cart_renderCart__WEBPACK_IMPORTED_MODULE_2__["default"].displayCartTotal(cartArray);
          toastSuccess.text = "Success! Item was added";
          toastify_js__WEBPACK_IMPORTED_MODULE_0___default()(toastSuccess).showToast();
        }
      }
    });
  });
}

function addNewToCart(array) {
  var lastItem = array[array.length - 1];
  var cartItemsDesktop = getElement('.table__wrapper-desktop');
  var trProduct = document.createElement('tr');
  trProduct.classList.add("table__item"); // add new item from "Similar products" without rerender the whole cart. Desktop

  trProduct.innerHTML = " \n                            <td class=\"table__item-card\">\n                                <img  class=\"card_image\"  src=\"".concat(lastItem.image, "\" data-id=\"").concat(lastItem.id, "\" alt=\"").concat(lastItem.name, "\">\n                                <h3 data-id=\"").concat(lastItem.id, "\">").concat(lastItem.name, "</h3>\n                            </td>\n                            <td class=\"item__info\">\n                                <div class=\"counter-column\">\n                                    <div class=\"table__item-counter\">\n                                    <button class=\"counter-decrease button\" data-id=\"").concat(lastItem.id, "\" value=\"-\">-</button>\n                                    <p class=\"counter-amount\" data-id=\"").concat(lastItem.id, "\">").concat(lastItem.amount, "</p>\n                                    <button class=\"counter-increase button\" data-id=\"").concat(lastItem.id, "\" value=\"+\">+</button>\n                                    </div>\n                                    <p>Available in stock: ").concat(lastItem.quantity, " </p>\n                                </div>\n                                 \n                                <div class=\"services__wrapper\">\n                                    <form action=\"\" class=\"services-form\" data-id=\"").concat(lastItem.id, "\" >\n                                    <label><input class=\"guarantee-check tree-m\" value=\"0\" type=\"radio\" name=\"guarantee-check\" ").concat(lastItem.services == 0 ? " checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\"  > 3 months guarantee</label>\n                                    <label><input class=\"guarantee-check six-m\" value=\"1\" type=\"radio\" name=\"guarantee-check\"  ").concat(lastItem.services == 1 ? "checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\" > 6 months guarantee</label>\n                                    <label><input class=\"guarantee-check twelve-m\" value=\"5\" type=\"radio\" name=\"guarantee-check\"  ").concat(lastItem.services == 5 ? "checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\"> 12 months guarantee</label>\n                                    </form>\n                                </div>\n                            </td>\n                            <td class=\"item__info\">\n                                <p>&dollar;<span class=\"item-price\">").concat((lastItem.price * lastItem.amount).toFixed(2), "</span></p>\n                                <p><span class=\"services-percent\">").concat(lastItem.services, "</span>%</p>\n                            </td>\n                            <td class=\"item__info\">\n                                <p>&dollar;").concat(lastItem.shipping, "</p>\n                                <p>&dollar;<span class=\"services-price\">").concat((lastItem.price * lastItem.amount * Number(lastItem.services) / 100).toFixed(2), "</span></p>\n                            </td>\n                            <td><button class=\"cart-item-remove-btn button\" data-id=\"").concat(lastItem.id, "\">&#128473;</button>\n                            </td> \n        ");
  cartItemsDesktop.appendChild(trProduct);
  var cartItemsMobile = getElement('.table.section.mobile');
  var tableMobile = document.createElement('table');
  tableMobile.classList.add("table__wrapper-mobile");
  tableMobile.innerHTML = "\n                <tr class=\"cross\">\n                    <td colspan=\"1\" class=\"table__heading\"></td>\n                    <td>\n                        <button class=\"cart-item-remove-btn button\" data-id=\"".concat(lastItem.id, "\">&#128473;</button>\n                    </td>\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Product</td>\n                    <td class=\"table__item-card\">\n                        <img class=\"card_image\" src=\"").concat(lastItem.image, "\" data-id=\"").concat(lastItem.id, "\" alt=\"").concat(lastItem.name, "\">\n                        <h3 data-id=\"").concat(lastItem.id, "\">").concat(lastItem.name, "</h3>\n                    </td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Quantity</td>\n                    <td>\n                        <div class=\"table__item-counter\">\n                                    <button class=\"counter-decrease button\" data-id=\"").concat(lastItem.id, "\" value=\"-\">-</button>\n                                    <p class=\"counter-amount\" data-id=\"").concat(lastItem.id, "\">").concat(lastItem.amount, "</p>\n                                    <button class=\"counter-increase button\" data-id=\"").concat(lastItem.id, "\" value=\"+\">+</button>\n                        </div>\n                        <p>Available in stock: ").concat(lastItem.quantity, " </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Services</td>\n                    <td class=\"guarantee\">\n                        <form action=\"\" class=\"services-form\" data-id=\"").concat(lastItem.id, "\" >\n                                    <label><input class=\"guarantee-check tree-m\" value=\"0\" type=\"radio\" name=\"guarantee-check\" ").concat(lastItem.services == 0 ? " checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\"  > 3 months guarantee</label>\n                                    <label><input class=\"guarantee-check six-m\" value=\"1\" type=\"radio\" name=\"guarantee-check\"  ").concat(lastItem.services == 1 ? "checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\" > 6 months guarantee</label>\n                                    <label><input class=\"guarantee-check twelve-m\" value=\"5\" type=\"radio\" name=\"guarantee-check\"  ").concat(lastItem.services == 5 ? "checked = \"checked\"" : "", " data-id=\"").concat(lastItem.id, "\"> 12 months guarantee</label>\n                                    </form>\n                    </td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Services Price</td>\n                    <td><span class=\"services-percent\">").concat(lastItem.services, "</span>%   &dollar;<span class=\"services-price\">").concat((lastItem.price * lastItem.amount * Number(lastItem.services) / 100).toFixed(2), "</span></td>\n                    </tr>\n                <tr>\n                    <td class=\"table__heading\">Price</td>\n                    <td class=\"item-price\">  &dollar;").concat((lastItem.price * lastItem.amount).toFixed(2), "</td>\n\n                </tr>\n                <tr>\n                    <td class=\"table__heading\">Shipping</td>\n                    <td>&dollar;").concat(lastItem.shipping, "</td>\n\n                </tr>\n        ");
  cartItemsMobile.appendChild(tableMobile);
}

function spinner() {
  var mask = document.querySelector(".mask");
  mask.classList.add("transparent-loader");
  setTimeout(function () {
    mask.remove();
  }, 2000);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  getElement: getElement,
  getStorageItem: getStorageItem,
  setStorageItem: setStorageItem,
  counter: counter,
  generateStars: generateStars,
  displayCartItemCount: displayCartItemCount,
  getItems: getItems,
  toastSuccess: toastSuccess,
  toastFail: toastFail,
  spinner: spinner
});

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/templates/productList.hbs":
/*!***************************************!*\
  !*** ./src/templates/productList.hbs ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"list__gallery-item\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":39},"end":{"line":2,"column":45}}}) : helper)))
    + ">\r\n    <div class=\"product-container\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":43},"end":{"line":3,"column":49}}}) : helper)))
    + ">\r\n        <img class=\"list__gallery-img\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"webformatURL") || (depth0 != null ? lookupProperty(depth0,"webformatURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"webformatURL","hash":{},"data":data,"loc":{"start":{"line":4,"column":44},"end":{"line":4,"column":60}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"tags") || (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tags","hash":{},"data":data,"loc":{"start":{"line":4,"column":67},"end":{"line":4,"column":75}}}) : helper)))
    + "\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":85},"end":{"line":4,"column":91}}}) : helper)))
    + ">\r\n        <div class=\"wrapper\"></div>\r\n        <div class=\"product-icons\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":43},"end":{"line":6,"column":49}}}) : helper)))
    + ">\r\n            <a href=\"http://localhost:3000/productPage.html?="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":7,"column":61},"end":{"line":7,"column":67}}}) : helper)))
    + "\" class=\"product-icon details\">\r\n                <i class=\"fas fa-search\"></i>\r\n            </a>\r\n            <button class=\"product-cart-btn product-icon add-btn\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":10,"column":74},"end":{"line":10,"column":80}}}) : helper)))
    + ">\r\n                <i class=\"fas fa-shopping-cart\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":11,"column":56},"end":{"line":11,"column":62}}}) : helper)))
    + "></i>\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"list__gallery-content\">\r\n        <h4 class=\"list__gallery-title\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":48},"end":{"line":16,"column":54}}}) : helper)))
    + ">"
    + alias4(((helper = (helper = lookupProperty(helpers,"tags") || (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tags","hash":{},"data":data,"loc":{"start":{"line":16,"column":55},"end":{"line":16,"column":63}}}) : helper)))
    + "</h4>\r\n        <p class=\"list__gallery-price\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":47},"end":{"line":17,"column":53}}}) : helper)))
    + ">&dollar;"
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":17,"column":62},"end":{"line":17,"column":71}}}) : helper)))
    + "</p>\r\n    </div>\r\n</li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":20,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ })

}]);
//# sourceMappingURL=cart~checkout~index~productList~productPage.js.map