import '../../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import services from './services';
import render from '../renderService'
import RenderService from '../render';
import utils from '../utils'
import renderCart from './renderCart';
const renderService = new RenderService(render.commonArray);


let cart = JSON.parse(localStorage.getItem('cart'));
function removeItem(id) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
    cart = JSON.parse(localStorage.getItem('cart'));
    let newAmount;
    cart = cart.map((cartItem) => {
        if (cartItem.id === id && cartItem.quantity > cartItem.amount) {
            newAmount = cartItem.amount + 1;
            cartItem = { ...cartItem, amount: newAmount };
        } else if (cartItem.id === id && cartItem.quantity == cartItem.amount) {
            newAmount = cartItem.amount;
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    });
    return newAmount;
}
function decreaseAmount(id) {
    cart = JSON.parse(localStorage.getItem('cart'));
    let newAmount;
    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;
            if (newAmount < 1) {
                newAmount = 1
            }
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    });
    return newAmount;
}

const setupCartFunctionality = async () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsDesktop = document.querySelector('.table__wrapper-desktop');

    const cartItemsMobile = document.querySelector('.table.section.mobile');
    cartItemsDesktop.addEventListener('click', function (e) {
        const element = e.target;
        const parentID = Number(e.target.dataset.id);
        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(parentID);
            element.parentElement.parentElement.remove();
            utils.toastFail.text = "Item was removed from the cart!"
            Toastify(utils.toastFail).showToast();
        }
        // increase
        if (element.classList.contains('counter-increase')) {
            const newAmount = increaseAmount(parentID);
            element.previousElementSibling.textContent = newAmount;

        }
        // decrease
        if (element.classList.contains('counter-decrease')) {
            const newAmount = decreaseAmount(parentID);
            element.nextElementSibling.textContent = newAmount;
        }
        utils.setStorageItem('cart', cart);

        services.addServices(cart)
        services.addPaymentMethod(cart)
        renderCart.displayCartTotal(cart)
        utils.displayCartItemCount();

    });
    cartItemsMobile.addEventListener('click', function (e) {
        const element = e.target;
        const parentID = Number(e.target.dataset.id);
        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(parentID);
            element.parentElement.parentElement.remove();
            utils.toastFail.text = "Item was removed from the cart!"
            Toastify(utils.toastFail).showToast();
        }
        // increase
        if (element.classList.contains('counter-increase')) {
            const newAmount = increaseAmount(parentID);
            element.previousElementSibling.textContent = newAmount;
        }
        // decrease
        if (element.classList.contains('counter-decrease')) {
            const newAmount = decreaseAmount(parentID);
            element.nextElementSibling.textContent = newAmount;
        }

        if (payments.installmentsPrice !== undefined) {
            services.addServices(cart)
            services.addPaymentMethod(cart)
        }
        utils.setStorageItem('cart', cart);
        services.addServices(cart)
        utils.displayCartItemCount();
    });
}

function getImageItems() {
    const items = document.querySelectorAll(".card_image");
    items.forEach(item => {
        item.addEventListener('click', () => {
            let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
            if (viewedArray.length > 5) { viewedArray.shift(); }
            viewedArray.push(item.dataset.id);
            localStorage.setItem('viewed', JSON.stringify(viewedArray));
            window.location.href = `http://localhost:3000/productPage.html?=${item.dataset.id}`
        })
    })

}
function displayCartItemsDOM() {
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((cartItem) => {
        renderCart.addToCartDOM(cartItem);
    });
}
document.querySelector(".credit-btn").addEventListener('click', () => {
    document.querySelector(".credit.section").classList.remove("modal-hidden")
})
document.querySelector(".close-button").addEventListener('click', () => {
    document.querySelector(".credit.section").classList.add("modal-hidden")
})
const cartSetup = async () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    await render.init();
    await displayCartItemsDOM()
    await renderCart.displayCartTotal(cart)
    await utils.displayCartItemCount();
    await services.addServices(cart)
    await services.addPaymentMethod(cart)
    await setupCartFunctionality();
    await getImageItems()


};
window.addEventListener('load', () => utils.spinner())
window.addEventListener('DOMContentLoaded', cartSetup);
