import '../../scss/main.scss';
import 'slick-carousel';
import 'regenerator-runtime/runtime.js';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import utils from '../utils';
import render from '../renderService';
import './sliders'
import RenderService from '../render';


import popularTpl from '../../templates/popularGallery.hbs';
import featuredTpl from '../../templates/featuredGallery.hbs';
import arrivalsTpl from '../../templates/arrivalsGallery.hbs';
const renderService = new RenderService(render.commonArray);

const init = async () => {
    const popularGallery = document.querySelector('.popular__list');
    const featuredGallery = document.querySelector('.featured__list');
    const arrivalsGallery = document.getElementById('arrivals__list');

    await render.init()

    const popularArr = await renderService.getHomeRating(popularGallery, popularTpl, 9)

    await renderService.getCategoryHome(featuredGallery, featuredTpl, 'cloth', 12)
    await renderService.getCategoryHome(arrivalsGallery, arrivalsTpl, 'tie', 4)
    await getItems()

    const iconDiv = document.querySelectorAll(".wrapper__description-icons");
    await utils.generateStars(popularArr, iconDiv)
    await addToCart()
    await utils.displayCartItemCount()
};



function getItems() {
    const items = document.querySelectorAll(".wrapper__image");
    items.forEach(item => {

        item.addEventListener('click', () => {
            // add viewed items' id
            let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
            let commentArray = JSON.parse(localStorage.getItem('comment')) || [];
            if (viewedArray.length > 5) { viewedArray.shift(); }
            viewedArray.push(item.dataset.id);
            localStorage.setItem('viewed', JSON.stringify(viewedArray));
            localStorage.setItem('comment', JSON.stringify(commentArray));
            window.location.href = `http://localhost:3000/productPage.html?=${item.dataset.id}`
        })
    })

}

function addToCart() {
    const items = document.querySelectorAll('.add-button')
    let cartArray = JSON.parse(localStorage.getItem('cart')) || [];

    items.forEach(item => {
        if (renderService.getById(item.dataset.id).quantity == 0) {
            item.textContent = 'Not available';
            item.classList.add('unavailable-btn')
        }
        cartArray.forEach(cartItem => {

            if (cartItem.id == Number(item.dataset.id)) {
                item.classList.add("unavailable-btn", 'valid')
                item.innerHTML = `<span>Added <i class="fas fa-check"></i></span>       
                `
            }
        })

        item.addEventListener('click', (ev) => {

            const product = renderService.getById(Number(ev.target.dataset.id))

            if (cartArray.length > 0) {
                let newProduct = cartArray.every(cartItem => cartItem.id !== Number(ev.target.dataset.id))

                if (newProduct && product.quantity > 0) {
                    cartArray.push({ "id": product.id, "price": product.price, "services": 0, "quantity": product.quantity, "image": product.webformatURL, "name": product.tags, "amount": 1, "shipping": product.shipping });
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                    ev.target.classList.add("unavailable-btn", 'valid')
                    ev.target.innerHTML = `<span>Added <i class="fas fa-check"></i></span>
                `
                    utils.displayCartItemCount()
                    utils.toastSuccess.text = "Item was added to cart!"
                    Toastify(utils.toastSuccess).showToast();

                } else return

            } else if (cartArray.length === 0 && product.quantity > 0) {
                cartArray.push({ "id": product.id, "price": product.price, "services": 0, "quantity": product.quantity, "image": product.webformatURL, "name": product.tags, "amount": 1, "shipping": product.shipping });
                localStorage.setItem('cart', JSON.stringify(cartArray));
                ev.target.classList.add("unavailable-btn", 'valid')
                ev.target.innerHTML = `<span>Added <i class="fas fa-check"></i></span>
                `
                utils.displayCartItemCount()
                utils.toastSuccess.text = "Item was added to cart!"
                Toastify(utils.toastSuccess).showToast();
            }

        })
    })
}


// redirect ro product list by "view all" btn
(() => {
    const featuredBtn = document.querySelector(".section__view-button.featured");
    const arrivalsBtn = document.querySelector(".section__view-button.arrivals");
    const popularBtn = document.querySelector('.section__view-button.popular');
    const bannerBtn = document.querySelector(".button.all")
    const categoriesBtns = document.querySelectorAll('.categories-btn')

    featuredBtn.addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=featured")
    arrivalsBtn.addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=arrivals")
    popularBtn.addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=popular")
    bannerBtn.addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html")

    categoriesBtns[0].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=jacket")
    categoriesBtns[1].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=shirt")
    categoriesBtns[2].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=jeans")
    categoriesBtns[3].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=shoes")
    categoriesBtns[4].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=dress")
    categoriesBtns[5].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=fashion")
})();

// burger menu appearing click

(() => {
    const menuBtnRef = document.querySelector("[data-menu-button]");
    const mobileMenuRef = document.querySelector("[data-menu]");

    menuBtnRef.addEventListener("click", () => {
        const expanded =
            menuBtnRef.getAttribute("aria-expanded") === "true" || false;

        menuBtnRef.classList.toggle("is-open");
        menuBtnRef.setAttribute("aria-expanded", !expanded);

        mobileMenuRef.classList.toggle("is-open");
    });
})();

// input appearing click

(() => {
    const searchBtn = document.querySelectorAll('.search');
    const input = document.querySelectorAll('.header__wrapper-input')

    searchBtn.forEach(el => {
        el.addEventListener('click', () => {
            input.forEach(e => {
                e.addEventListener('keyup', (ev) => {
                    ev.preventDefault();
                    if (e.value !== '') {
                        el.onclick = function () {
                            window.location.href = `http://localhost:3000/productList.html?=${e.value}`
                        };

                    }
                });
                e.classList.toggle('hidden')
            });

        })
    })
})();
window.addEventListener('load', () => utils.spinner())
window.addEventListener('DOMContentLoaded', init);