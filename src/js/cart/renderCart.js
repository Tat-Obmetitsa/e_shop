import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import services from './services';
import utils from '../utils.js';
import render from '../renderService'
import RenderService from '../render';
const renderService = new RenderService(render.commonArray);
import productGalleryTpl from '../../templates/productList.hbs'

const cartTotalDOM = document.querySelector('.table__price');
let addedCoupon


function displayCartTotal(obj) {
    if (!obj) return
    const coupons = ['VALTECH5', 'ILoveJS10', 'myLostCreativity25'];
    let payments = JSON.parse(localStorage.getItem('payments')) || {};
    const promoInput = document.querySelector(".promo-input");
    const submitCoupon = document.querySelector(".apply-btn");
    let discount = 0;
    let total, finalTotal;

    let servicesTotal = obj.reduce(function (prev, curr) { return Number(prev) + Number(((curr.price * curr.amount) * Number(curr.services)) / 100) }, 0);
    let maxShipping = obj.reduce((prev, current) => Number(prev.shipping) > Number(current.shipping) ? prev : current, {});



    if (payments.installmentsPrice !== undefined) {
        total = Number(payments.installmentsPrice.totalPrice)
    } else {
        total = obj.reduce((total, cartItem) => {
            return (total += cartItem.price * cartItem.amount);
        }, 0);
    }
    if (obj.length < 1) { total = 0; maxShipping.shipping = 0 }
    if (total < 1 || !payments.discount) {

        finalTotal = (total + maxShipping.shipping + servicesTotal).toFixed(2)
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping.shipping}</span>
        <span class="services-total">Additional guarantee services:  &dollar;${servicesTotal.toFixed(2)}</span>
        <span>Total</span>
        <span class="price">&dollar;${finalTotal} </span>
    `
    } else if (payments.discount || addedCoupon) {

        finalTotal = (((total * (100 - payments.discount)) / 100) + maxShipping.shipping + servicesTotal).toFixed(2)
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping.shipping}</span>
        <span class="services-total">Additional guarantee services:  &dollar;${servicesTotal.toFixed(2)}</span>
        <span>*Discount is not included in shipping and services cost</span>
        <span>Total</span>
        <span class="price">&dollar;<strike>${(Number(total) + Number(maxShipping.shipping) + Number(servicesTotal)).toFixed(2)}</strike></span>
        <p class="discount-price"><span>Price including discount</span> <span class="price discount">&dollar;${finalTotal}</span></p>
    `

        document.querySelector(".total__promo").classList.add('hidden')
    }
    submitCoupon.addEventListener('click', () => {
        if (coupons.find(e => e === promoInput.value) && total > 0) {
            addedCoupon = promoInput.value;
            if (addedCoupon === 'VALTECH5') {
                discount = 5;
            } else if (addedCoupon === 'ILoveJS10') {
                discount = 10;
            } else if (addedCoupon === 'myLostCreativity25') {
                discount = 25;
            }
            payments.discount = discount
            utils.setStorageItem('payments', payments);
            displayCartTotal(obj)
        } else if (!coupons.find(e => e === promoInput.value) || total == 0 && promoInput.value !== '') {
            utils.toastFail.text = "Ivalid code!"
            Toastify(utils.toastFail).showToast();
        }
    })
    let allPrices = document.querySelectorAll(".item-price")
    for (let i = 0; i < allPrices.length; i++) {
        const e = allPrices[i];
        if (obj[i] !== undefined) {
            e.textContent = (obj[i].price * obj[i].amount).toFixed(2)

        }

    }
    Object.assign(payments, { shipping: Number(maxShipping.shipping).toFixed(2), services: Number(servicesTotal).toFixed(2), totalItemsPrice: `${(Number(finalTotal) - Number(servicesTotal) - Number(maxShipping.shipping)).toFixed(2)}`, finalTotal: Number(finalTotal).toFixed(2) })
    utils.setStorageItem('payments', payments);
}

const addToCartDOM = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsMobile = utils.getElement('.table.section.mobile');

    const cartItemsDesktop = utils.getElement('.table__wrapper-desktop');
    const cartItemCountDOM = utils.getElement('.counter-amount');
    cartItemsDesktop.innerHTML = "";
    cartItemsMobile.innerHTML = "";
    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    cartItemCountDOM.textContent = amount;
    const headingTr = document.createElement('tr')
    headingTr.classList.add("table__heading")
    headingTr.innerHTML = `
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Shipping & Services</th> 
        <th></th>
         `

    for (let index = 0; index < cart.length; index++) {
        const item = cart[index];

        // add desktop cart
        const trProduct = document.createElement('tr');
        trProduct.classList.add("table__item");
        trProduct.innerHTML = `
                            <td class="table__item-card">
                                <img  class="card_image"  src="${item.image}" data-id="${item.id}" alt="${item.name}">
                                <h3 data-id="${item.id}">${item.name}</h3>
                            </td>
                            <td class="item__info">
                                <div class="counter-column">
                                    <div class="table__item-counter">
                                    <button class="counter-decrease button" data-id="${item.id}" value="-">-</button>
                                    <p class="counter-amount" data-id="${item.id}">${item.amount}</p>
                                    <button class="counter-increase button" data-id="${item.id}" value="+">+</button>
                                    </div>
                                    <p>Available in stock: ${item.quantity} </p>
                                </div>
                                 
                                <div class="services__wrapper">
                                    <form action="" class="services-form" data-id="${item.id}" >
                                    <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check" ${item.services == 0 ? ` checked = "checked"` : ""} data-id="${item.id}"  > 3 months guarantee</label>
                                    <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check"  ${item.services == 1 ? `checked = "checked"` : ""} data-id="${item.id}" > 6 months guarantee</label>
                                    <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check"  ${item.services == 5 ? `checked = "checked"` : ""} data-id="${item.id}"> 12 months guarantee</label>
                                    </form>
                                </div>
                            </td>
                            <td class="item__info">
                                <p>&dollar;<span class="item-price">${(item.price * item.amount).toFixed(2)}</span></p>
                                <p><span class="services-percent">${item.services}</span>%</p>
                            </td>
                            <td class="item__info">
                                <p>&dollar;${item.shipping}</p>
                                <p>&dollar;<span class="services-price">${(((item.price * item.amount) * Number(item.services)) / 100).toFixed(2)}</span></p>
                            </td>
                            <td><button class="cart-item-remove-btn button" data-id="${item.id}">&#128473;</button>
                            </td> 
        `
        cartItemsDesktop.appendChild(trProduct)

        // add mobile cart
        const tableMobile = document.createElement('table');
        tableMobile.classList.add("table__wrapper-mobile");
        tableMobile.innerHTML = `
                <tr class="cross">
                    <td colspan="1" class="table__heading"></td>
                    <td>
                        <button class="cart-item-remove-btn button" data-id="${item.id}">&#128473;</button>
                    </td>
                </tr>
                <tr>
                    <td class="table__heading">Product</td>
                    <td class="table__item-card">
                        <img class="card_image" src="${item.image}" data-id="${item.id}" alt="${item.name}">
                        <h3 data-id="${item.id}">${item.name}</h3>
                    </td>

                </tr>
                <tr>
                    <td class="table__heading">Quantity</td>
                    <td>
                        <div class="table__item-counter">
                                    <button class="counter-decrease button" data-id="${item.id}" value="-">-</button>
                                    <p class="counter-amount" data-id="${item.id}">${item.amount}</p>
                                    <button class="counter-increase button" data-id="${item.id}" value="+">+</button>
                        </div>
                        <p>Available in stock: ${item.quantity} </p>
                    </td>
                </tr>
                <tr>
                    <td class="table__heading">Services</td>
                    <td class="guarantee">
                        <form action="" class="services-form" data-id="${item.id}" >
                                    <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check" ${item.services == 0 ? ` checked = "checked"` : ""} data-id="${item.id}"  > 3 months guarantee</label>
                                    <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check"  ${item.services == 1 ? `checked = "checked"` : ""} data-id="${item.id}" > 6 months guarantee</label>
                                    <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check"  ${item.services == 5 ? `checked = "checked"` : ""} data-id="${item.id}"> 12 months guarantee</label>
                                    </form>
                    </td>

                </tr>
                <tr>
                    <td class="table__heading">Services Price</td>
                    <td><span class="services-percent">${item.services}</span>%   &dollar;<span class="services-price">${(((item.price * item.amount) * Number(item.services)) / 100).toFixed(2)}</span></td>
                    </tr>
                <tr>
                    <td class="table__heading">Price</td>
                    <td class="item-price">  &dollar;${(item.price * item.amount).toFixed(2)}</td>

                </tr>
                <tr>
                    <td class="table__heading">Shipping</td>
                    <td>&dollar;${item.shipping}</td>

                </tr>
        `
        cartItemsMobile.appendChild(tableMobile)

    }

    cartItemsDesktop.prepend(headingTr)
    getSimilar(cart)
    services.addServices(cart)
    window.addEventListener('load', () => utils.spinner())
}

function getSimilar(obj) {

    const viewAllBtn = document.querySelector('.section__view-button');
    const similarSection = document.querySelector(".similar__list")
    const similarDescription = document.querySelector(".similar__info")
    if (obj.length > 0) {
        const similarProducts = renderService.getFiltered(obj[0].name.split(', ')[0]);
        if (similarProducts.length > 4) {

            renderService.getCategoryAll(similarSection, productGalleryTpl, similarProducts.slice(0, 4));

            viewAllBtn.addEventListener('click', () => window.location.href = `http://localhost:3000/productList.html?=${obj[0].name.split(', ')[0]}`)
        } else if (similarProducts.length > 0 && similarProducts.length < 5) {
            renderService.getCategoryAll(similarSection, productGalleryTpl, similarProducts);
            viewAllBtn.classList.add('hidden');
        }
    } else if (obj.length == 0) {
        similarDescription.classList.add('hidden');
        similarSection.innerHTML = ''
    }
    utils.getItems()

}
export default { addToCartDOM, displayCartTotal }

