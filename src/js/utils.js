import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import renderCart from './cart/renderCart';
import render from './renderService';
import services from './cart/services'
import RenderService from './render';
const renderService = new RenderService(render.commonArray);


const toastSuccess = {
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
    },
}
const toastFail = {
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
    },
}


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

            const parentElementID = e.target.parentElement.parentElement.dataset.id;
            const product = renderService.getById(Number(parentElementID));
            if (e.target.parentElement.classList.contains('details')) {
                let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
                if (viewedArray.length > 5) { viewedArray.shift(); }
                viewedArray.push(parentElementID);
                localStorage.setItem('viewed', JSON.stringify(viewedArray));
            }
            if (e.target.parentElement.parentElement.classList.contains('add-btn')) {
                if (cartArray.length > 0) {
                    let newProduct = cartArray.every(cartItem => cartItem.id !== Number(parentElementID))

                    if (newProduct && product.quantity > 0) {
                        cartArray.push({ "id": product.id, "price": product.price, "quantity": product.quantity, "services": 0, "image": product.webformatURL, "name": product.tags, "amount": 1, "shipping": product.shipping });

                        e.target.closest("button").classList.add("unavailable-btn", "valid")
                        e.target.closest("button").innerHTML = `<i class="fas fa-check  "></i>`
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                        displayCartItemCount()
                        addNewToCart(cartArray)
                        services.addServices(cartArray)
                        renderCart.displayCartTotal(cartArray)
                        toastSuccess.text = "Success! Item was added"
                        Toastify(toastSuccess).showToast();
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                    } else return

                } else if (cartArray.length === 0 && product.quantity > 0) {
                    cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "services": 0, "quantity": product.quantity, "name": product.tags, "amount": 1, "shipping": product.shipping });

                    e.target.closest("button").innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`
                    displayCartItemCount()
                    renderCart.addToCartDOM()
                    toastSuccess.text = "Success! Item was added"
                    Toastify(toastSuccess).showToast();
                }
            }

        })
    })
}


function addNewToCart(array) {

    const lastItem = array[array.length - 1]
    const cartItemsDesktop = getElement('.table__wrapper-desktop');
    const trProduct = document.createElement('tr');
    trProduct.classList.add("table__item");
    trProduct.innerHTML = `
                            <td class="table__item-card">
                                <img  class="card_image"  src="${lastItem.image}" data-id="${lastItem.id}" alt="${lastItem.name}">
                                <h3 data-id="${lastItem.id}">${lastItem.name}</h3>
                            </td>
                            <td class="item__info">
                                <div class="counter-column">
                                    <div class="table__item-counter">
                                    <button class="counter-decrease button" data-id="${lastItem.id}" value="-">-</button>
                                    <p class="counter-amount" data-id="${lastItem.id}">${lastItem.amount}</p>
                                    <button class="counter-increase button" data-id="${lastItem.id}" value="+">+</button>
                                    </div>
                                    <p>Available in stock: ${lastItem.quantity} </p>
                                </div>
                                 
                                <div class="services__wrapper">
                                    <form action="" class="services-form" data-id="${lastItem.id}" >
                                    <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check" checked > 3 months guarantee</label>
                                    <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check" > 6 months guarantee</label>
                                    <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check" > 12 months guarantee</label> 
                                    </form>
                                </div>
                            </td>
                            <td class="item__info">
                                <p>&dollar;<span class="item-price">${(lastItem.price * lastItem.amount).toFixed(2)}</span></p>
                                <p><span class="services-percent">${lastItem.services}</span>%</p>
                            </td>
                            <td class="item__info">
                                <p>&dollar;${lastItem.shipping}</p>
                                <p>&dollar;<span class="services-price">${(((lastItem.price * lastItem.amount) * Number(lastItem.services)) / 100).toFixed(2)}</span></p>
                            </td>
                            <td><button class="cart-item-remove-btn button" data-id="${lastItem.id}">&#128473;</button>
                            </td> 
        `
    cartItemsDesktop.appendChild(trProduct)

}






function spinner() {
    let mask = document.querySelector(".mask");
    mask.classList.add("transparent-loader");
    setTimeout(() => {
        mask.remove()
    }, 3000);
}
export default {
    getElement, getStorageItem, setStorageItem, counter, generateStars, displayCartItemCount, getItems, toastSuccess, toastFail, spinner
}