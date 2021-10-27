import { init } from './cart/cart';
import render from './renderService';
import RenderService from './render';
const renderService = new RenderService(render.commonArray);

const getElement = (selection) => {
    const element = document.querySelector(selection)
    if (element) return element
    throw new Error(`Please check "${selection}" selector, no such element exist`)
}
const getStorageItem = (item) => {
    let storageItem = localStorage.getItem(item)
    if (storageItem) {
        storageItem = JSON.parse(localStorage.getItem(item))
    } else {
        storageItem = []
    }
    return storageItem
}

const setStorageItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item))
}


const counter = (item) => {
    let counterValueRef = document.querySelector('.counter-amount');
    let addCounter = document.querySelector('.counter-increase');
    let removeCounter = document.querySelector('.counter-decrease');
    if (item.quantity == 0) {
        counterValueRef.textContent = 0;
        addCounter.classList.add('hidden');
        removeCounter.classList.add('hidden')
        return
    } else if (counterValueRef.textContent == '1') {
        removeCounter.classList.add("unavailable-btn")
    }
    let counterValue = 1;
    if (counterValueRef.textContent == item.quantity) {
        addCounter.classList.add("unavailable-btn")
    }
    function onIncrementClick() {
        if (counterValueRef.textContent < item.quantity && item.quantity > 0) {
            counterValueRef.textContent = counterValue += 1;
            removeCounter.classList.remove("unavailable-btn");
            if (counterValueRef.textContent == item.quantity) {
                addCounter.classList.add("unavailable-btn")
            }
        }
    }
    function onDecrementClick() {
        if (counterValueRef.textContent > 1 && item.quantity > 0) {
            counterValueRef.textContent = counterValue -= 1;
            if (addCounter.classList.contains("unavailable-btn")) {
                addCounter.classList.remove("unavailable-btn")
            }
        } else if (counterValueRef.textContent == '1' && item.quantity > 0) {
            removeCounter.classList.add("unavailable-btn")
            counterValueRef.textContent = '1'
        }

    }
    addCounter.addEventListener('click', onIncrementClick);
    removeCounter.addEventListener('click', onDecrementClick);
};

function generateStars(obj, wrapper) {

    obj.forEach((e, i) => {

        const starSign = '<i width="24" height="24" class="fas fa-star"></i>'
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

    })
}

function displayCartItemCount() {
    let cart = getStorageItem('cart');
    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    document.querySelectorAll(".cart-amount").forEach(e => e.textContent = amount)
}

function getItems() {
    let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    const addBtns = document.querySelectorAll(".add-btn");
    const items = document.querySelectorAll(".product-container");

    items.forEach(item => {
        addBtns.forEach(btn => {
            let newProduct = cartArray.every(cartItem => cartItem.id !== Number(btn.dataset.id))

            if (renderService.getById(btn.dataset.id).quantity == 0) {
                btn.innerHTML = `
                <i class="fas fa-times unavailable-btn"></i>`;
                btn.classList.remove('add-btn')
            }
            if (!newProduct) {
                btn.innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`
                btn.classList.remove('add-btn')
            }
        })

        item.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement;
            const parentElementID = e.target.parentElement.parentElement.dataset.id;
            const product = renderService.getById(Number(parentElementID));
            if (parentElement.classList.contains('details') && e.target.parentElement.classList.contains('details')) {
                let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
                if (viewedArray.length > 5) { viewedArray.shift(); }
                viewedArray.push(parentElementID);
                localStorage.setItem('viewed', JSON.stringify(viewedArray));
            }
            if (parentElement.classList.contains('add-btn') || e.target.classList.contains('add-btn')) {
                if (cartArray.length > 0) {
                    let newProduct = cartArray.every(cartItem => cartItem.id !== Number(parentElementID))

                    if (newProduct && product.quantity > 0) {
                        cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "name": product.tags, "amount": 1 });
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                        e.target.closest("button").classList.add("unavailable-btn", "valid")
                        e.target.closest("button").innerHTML = `<i class="fas fa-check  "></i>`
                        displayCartItemCount()
                        init()

                    } else return

                } else if (cartArray.length === 0 && product.quantity > 0) {
                    cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "name": product.tags, "amount": 1 });
                    localStorage.setItem('cart', JSON.stringify(cartArray));

                    e.target.closest("button").innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`

                    displayCartItemCount()
                }
            }

        })
    })
}

export {
    getElement, getStorageItem, setStorageItem, counter, generateStars, displayCartItemCount, getItems
}