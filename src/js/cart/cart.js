import '../../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import render from '../renderService'
import RenderService from '../render';
import utils from '../utils'
import addToCartDOM from './renderCart';
const renderService = new RenderService(render.commonArray);


let cart = JSON.parse(localStorage.getItem('cart'));
function removeItem(id) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
    cart = JSON.parse(localStorage.getItem('cart'));
    let newAmount;
    const product = renderService.getById(Number(id))
    cart = cart.map((cartItem) => {
        if (cartItem.id === id && product.quantity > cartItem.amount) {
            newAmount = cartItem.amount + 1;
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
    const cartItemsDesktop = document.querySelector('.table__wrapper-desktop');

    const cartItemsMobile = document.querySelector('.table.section.mobile');
    cartItemsDesktop.addEventListener('click', function (e) {
        const element = e.target;
        const parentID = Number(e.target.dataset.id);
        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(parentID);
            element.parentElement.parentElement.remove();
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
        addToCartDOM();
        utils.displayCartItemCount();
    });
    cartItemsMobile.addEventListener('click', function (e) {
        const element = e.target;
        const parentID = Number(e.target.dataset.id);
        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(parentID);
            element.parentElement.parentElement.remove();
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
        addToCartDOM();
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

const cartSetup = async () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    await render.init();
    await addToCartDOM();
    await utils.displayCartItemCount();

    await setupCartFunctionality();
    await getImageItems()
};

window.addEventListener('DOMContentLoaded', cartSetup);
