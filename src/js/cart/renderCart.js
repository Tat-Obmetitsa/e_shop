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
    const coupons = ['VALTECH5', 'ILoveJS10', 'myLostCreativity25'];
    const promoInput = document.querySelector(".promo-input");
    const submitCoupon = document.querySelector(".apply-btn");
    let discount;

    let servicesTotal = obj.reduce(function (prev, curr) { return Number(prev) + Number(((curr.price * curr.amount) * Number(curr.services)) / 100) }, 0)

    let total = obj.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);
    let maxShipping = obj.reduce((prev, current) => Number(prev.shipping) > Number(current.shipping) ? prev : current, {});
    if (obj.length < 1) { total = 0; maxShipping.shipping = 0 }
    if (!addedCoupon || total < 1) {
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping.shipping}</span>
        <span class="services-total">Additional guarantee services:  &dollar;${servicesTotal.toFixed(2)}</span>
        <span>Total</span>
        <span class="price">&dollar;${(total + maxShipping.shipping).toFixed(2)} </span>
    `
    } else {
        if (addedCoupon === 'VALTECH5') { discount = (total * 95) / 100 } else if (addedCoupon === 'ILoveJS10') { discount = (total * 90) / 100 } else if (addedCoupon === 'myLostCreativity25') { discount = (total * 75) / 100 }
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping.shipping}</span>
        <span class="services-total">Additional guarantee services:  &dollar;${servicesTotal.toFixed(2)}</span>
        <span>*Discount is not included in shipping and services cost</span>
        <span>Total</span>
        <span class="price">&dollar;<strike>${(total + maxShipping.shipping + servicesTotal).toFixed(2)}</strike></span>
        <p class="discount-price"><span>Price including discount</span> <span class="price discount">&dollar;${(discount + maxShipping.shipping).toFixed(2)}</span></p>
    `
        document.querySelector(".total__promo").classList.add('hidden')
    }

    submitCoupon.addEventListener('click', () => {
        if (coupons.find(e => e === promoInput.value) && total > 0) {
            addedCoupon = promoInput.value;
            displayCartTotal(obj)
        } else {
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
                         <form action="">
                        <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check"  checked> 3 months guarantee</label>
                        <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check" > 6 months guarantee</label>
                        <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check"  > 12 months guarantee</label>
                        </form>
                    </td>

                </tr>
                <tr>
                    <td class="table__heading">Price</td>
                    <td class="item-price">&dollar;${(item.price * item.amount).toFixed(2)}</td>

                </tr>
                <tr>
                    <td class="table__heading">Shipping</td>
                    <td>&dollar;${item.shipping}</td>

                </tr>
        `
        cartItemsMobile.appendChild(tableMobile)
        const radioInputs = document.querySelectorAll(".guarantee-check")

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
    // displayCartTotal(obj)

}
export default { addToCartDOM, displayCartTotal }

