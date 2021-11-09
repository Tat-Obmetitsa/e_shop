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

function displayCartItemCount(array) {
    let amount
    if (array) {
        amount = array.reduce((total, cartItem) => {
            return (total += cartItem.amount);
        }, 0);
    } else {
        let cart = getStorageItem('cart');
        amount = cart.reduce((total, cartItem) => {
            return (total += cartItem.amount);
        }, 0);
    }

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
                        addNewToCart(cartArray)
                        services.addServices(cartArray);
                        let payments = getStorageItem("payments")
                        if (payments.installmentsPrice) {
                            services.addPaymentMethod(cartArray)
                        }
                        renderCart.displayCartTotal(cartArray)
                        toastSuccess.text = "Success! Item was added"
                        Toastify(toastSuccess).showToast();
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                        displayCartItemCount()

                    } else return

                } else if (cartArray.length === 0 && product.quantity > 0) {
                    cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "services": 0, "quantity": product.quantity, "name": product.tags, "amount": 1, "shipping": product.shipping });

                    e.target.closest("button").innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`
                    displayCartItemCount()
                    renderCart.addToCartDOM()
                    services.addServices(cartArray);
                    let payments = utils.getStorageItem("payments")
                    if (payments.installmentsPrice) {
                        services.addPaymentMethod(cartArray)
                    }
                    renderCart.displayCartTotal(cartArray)
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
    // add new item from "Similar products" without rerender the whole cart. Desktop
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
                                    <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check" ${lastItem.services == 0 ? ` checked = "checked"` : ""} data-id="${lastItem.id}"  > 3 months guarantee</label>
                                    <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check"  ${lastItem.services == 1 ? `checked = "checked"` : ""} data-id="${lastItem.id}" > 6 months guarantee</label>
                                    <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check"  ${lastItem.services == 5 ? `checked = "checked"` : ""} data-id="${lastItem.id}"> 12 months guarantee</label>
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

    const cartItemsMobile = getElement('.table.section.mobile');
    const tableMobile = document.createElement('table');
    tableMobile.classList.add("table__wrapper-mobile");
    tableMobile.innerHTML = `
                <tr class="cross">
                    <td colspan="1" class="table__heading"></td>
                    <td>
                        <button class="cart-item-remove-btn button" data-id="${lastItem.id}">&#128473;</button>
                    </td>
                </tr>
                <tr>
                    <td class="table__heading">Product</td>
                    <td class="table__item-card">
                        <img class="card_image" src="${lastItem.image}" data-id="${lastItem.id}" alt="${lastItem.name}">
                        <h3 data-id="${lastItem.id}">${lastItem.name}</h3>
                    </td>

                </tr>
                <tr>
                    <td class="table__heading">Quantity</td>
                    <td>
                        <div class="table__item-counter">
                                    <button class="counter-decrease button" data-id="${lastItem.id}" value="-">-</button>
                                    <p class="counter-amount" data-id="${lastItem.id}">${lastItem.amount}</p>
                                    <button class="counter-increase button" data-id="${lastItem.id}" value="+">+</button>
                        </div>
                        <p>Available in stock: ${lastItem.quantity} </p>
                    </td>
                </tr>
                <tr>
                    <td class="table__heading">Services</td>
                    <td class="guarantee">
                        <form action="" class="services-form" data-id="${lastItem.id}" >
                                    <label><input class="guarantee-check tree-m" value="0" type="radio" name="guarantee-check" ${lastItem.services == 0 ? ` checked = "checked"` : ""} data-id="${lastItem.id}"  > 3 months guarantee</label>
                                    <label><input class="guarantee-check six-m" value="1" type="radio" name="guarantee-check"  ${lastItem.services == 1 ? `checked = "checked"` : ""} data-id="${lastItem.id}" > 6 months guarantee</label>
                                    <label><input class="guarantee-check twelve-m" value="5" type="radio" name="guarantee-check"  ${lastItem.services == 5 ? `checked = "checked"` : ""} data-id="${lastItem.id}"> 12 months guarantee</label>
                                    </form>
                    </td>

                </tr>
                <tr>
                    <td class="table__heading">Services Price</td>
                    <td><span class="services-percent">${lastItem.services}</span>%   &dollar;<span class="services-price">${(((lastItem.price * lastItem.amount) * Number(lastItem.services)) / 100).toFixed(2)}</span></td>
                    </tr>
                <tr>
                    <td class="table__heading">Price</td>
                    <td class="item-price">  &dollar;${(lastItem.price * lastItem.amount).toFixed(2)}</td>

                </tr>
                <tr>
                    <td class="table__heading">Shipping</td>
                    <td>&dollar;${lastItem.shipping}</td>

                </tr>
        `
    cartItemsMobile.appendChild(tableMobile)
}






function spinner() {
    let mask = document.querySelector(".mask");
    mask.classList.add("transparent-loader");
    setTimeout(() => {
        mask.remove()
    }, 2000);
}
export default {
    getElement, getStorageItem, setStorageItem, counter, generateStars, displayCartItemCount, getItems, toastSuccess, toastFail, spinner
}