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
    let total = obj.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);
    let maxShipping = obj.reduce((acc, curr) => acc.shipping > curr.shipping ? acc.shipping : curr);
    if (!addedCoupon || total < 1) {
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping}</span>
        <span>Total</span>
        <span class="price">&dollar;${(total + maxShipping).toFixed(2)} </span>
    `
    } else {
        if (addedCoupon === 'VALTECH5') { discount = (total * 95) / 100 } else if (addedCoupon === 'ILoveJS10') { discount = (total * 90) / 100 } else if (addedCoupon === 'myLostCreativity25') { discount = (total * 75) / 100 }
        cartTotalDOM.innerHTML = `
        <span>Pay for shipping only once! Shipping cost is &dollar;${maxShipping}</span>
        <span>*Discount is not included in shipping cost</span>
        <span>Total</span>
        <span class="price">&dollar;<strike>${(total + maxShipping).toFixed(2)}</strike></span>
        <p class="discount-price"><span>Price including discount</span> <span class="price discount">&dollar;${(discount + maxShipping).toFixed(2)}</span></p>
    `
        document.querySelector(".total__promo").classList.add('hidden')
    }

    submitCoupon.addEventListener('click', () => {
        if (coupons.find(e => e === promoInput.value) && total > 0) {
            addedCoupon = promoInput.value;
            displayCartTotal(obj)
        } else {
            alert("Incorrect promo code")
        }
    })
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
        <th>Shipping</th>
        <th></th>
         `

    for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        let productQuantity = renderService.getById(Number(item.id)).quantity
        if (productQuantity < item.amount) {
            productQuantity === item.amount;
        }

        const trProduct = document.createElement('tr');
        trProduct.classList.add("table__item");
        trProduct.innerHTML = `
                            <td class="table__item-card">
                                <img  class="card_image"  src="${item.image}" data-id="${item.id}" alt="${item.name}">
                                <h3 data-id="${item.id}">${item.name}</h3>
                            </td>
                            <td>
                                <div class="table__item-counter">
                                    <button class="counter-decrease button" data-id="${item.id}" value="-">-</button>
                                    <p class="counter-amount" data-id="${item.id}">${item.amount}</p>
                                    <button class="counter-increase button" data-id="${item.id}" value="+">+</button>
                                </div>
                                <p>Available in stock: ${productQuantity} </p>
                            </td>
                            <td>&dollar;${(item.price * item.amount).toFixed(2)}</td>
                            <td>&dollar;${item.shipping}</td>
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
                        <p>Available in stock: ${productQuantity} </p>
                    </td>
                </tr>
                <tr>
                    <td class="table__heading">Price</td>
                    <td>&dollar;${(item.price * item.amount).toFixed(2)}</td>

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
    displayCartTotal(cart)

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
    displayCartTotal(obj)

}
export default addToCartDOM

