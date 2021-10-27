import '../../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import { counter, generateStars, displayCartItemCount } from '../utils'
import form from './formProductPage';

import render from '../renderService'
import RenderService from '../render';
import productGalleryTpl from '../../templates/productPageGallery.hbs'
const renderService = new RenderService(render.commonArray);

const sliderSimilar = document.querySelector('.slides-similar');
const sliderRecent = document.querySelector('.slides-recent');
const productSection = document.querySelector('.product.section');
const getId = window.location.search.replace("?", "").replace("=", "")
const submitBtn = document.querySelector(".form__field-btn");

const init = async () => {
    await render.init();
    let reviewedProducts = await renderService.getByIdReviews(Number(getId))
    const product = await renderService.getById(Number(getId))
    await renderProduct(product) // render product 
    await counter(product)
    await displayCartItemCount()
    //open products  from sliders

    //render reviews
    submitBtn.addEventListener('click', () => form.checkInputs(reviewedProducts))
    await form.renderReviews(reviewedProducts)
    let iconWrapper = document.querySelectorAll(".wrapper__description-icons");
    await generateStars(reviewedProducts, iconWrapper)


    const viewAllBtns = document.querySelectorAll('.section__view-button');
    viewAllBtns[0].addEventListener('click', () => window.location.href = `http://localhost:3000/productList.html?=${product.tags.split(', ')[0]}`)
    viewAllBtns[1].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=viewed");
    await addToCart()
    $('.slides').slick({
        slidesToShow: 4,
        autoplay: true,
        arrows: true,
        lazyLoad: 'progressive',
        responsive: [{

            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                arrows: false,
            }
        }]

    });
}

function renderProduct(obj) {

    productSection.innerHTML = `
            <img src=${obj.webformatURL} class="product__image" alt="" data-id=${obj.id}>
            <div class="product__info" >
                <h2 class="product__info-title" data-id=${obj.id}>${obj.tags}</h2>
                <p class="product__info-price" data-id=${obj.id}>&dollar;${obj.price}</p>
                <p class="product__info-shipping" data-id=${obj.id}>${obj.shipping == 0 ? `<span class="free">FREE SHIPPING!</span>` : `Shipping:  &dollar;${obj.shipping}`}</p>
                <p class="product__info-manufacturer" data-id=${obj.id}><b>Manufacturer</b>: ${obj.manufacturer}</p>
                <p class="product__info-description" data-id=${obj.id}>${obj.description}</p>
                 
                <div class="product__info-counter">
                    <span>Quantity</span>
                    <div class="counter__wrapper">
                    <button class="counter-decrease button"><span>-</span></button>
                    <p class="counter-amount">1</p>
                    <button class="counter-increase button"><span>+</span></button></div>
                </div>
                <button type="button" class="add-button button"><span>Add to cart <i class="fas fa-cart-plus"></i></span></button>

            </div>
    
    `

    if (obj.quantity == 0) {
        document.querySelector(".add-button span").textContent = "Is not available"
        document.querySelector(".add-button").classList.add('unavailable-btn')
    } else if (obj.quantity > 0 && obj.quantity <= 5) {
        let quantityDOM = document.createElement('p');
        quantityDOM.classList.add('quantity-text', 'free')
        quantityDOM.textContent = 'Is running out!'
        document.querySelector(".add-button").previousElementSibling.append(quantityDOM);
    }
    // render similar   products by 1st word in tags and recent products
    const similarProducts = renderService.getFiltered(obj.tags.split(', ')[0]);
    const recentProducts = renderService.getHistoryById();
    renderService.getCategoryAll(sliderSimilar, productGalleryTpl, similarProducts);
    renderService.getCategoryAll(sliderRecent, productGalleryTpl, recentProducts);
    getItems()
}
//  open products  from sliders

function getItems() {
    const items = document.querySelectorAll(".slider__item-img");
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
function addToCart() {
    const item = document.querySelector('.add-button')
    const amount = document.querySelector(".counter-amount")
    const product = renderService.getById(Number(getId))
    let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    let newProduct = cartArray.every(cartItem => cartItem.id !== Number(getId));
    if (!newProduct) {
        item.classList.add("unavailable-btn", 'valid')
        item.innerHTML = `<span>Added to cart <i class="fas fa-check"></i></span>       
                `
        document.querySelector(".product__info-counter").classList.add('hidden')

    }
    item.addEventListener('click', () => {

        if (cartArray.length > 0) {
            if (newProduct) {
                cartArray.push({ "id": Number(product.id), "price": Number(product.price), "image": product.webformatURL, "name": product.tags, "amount": Number(amount.textContent) });
                localStorage.setItem('cart', JSON.stringify(cartArray));
                item.classList.add("unavailable-btn", 'valid')
                item.innerHTML = `<span>Added to cart <i class="fas fa-check"></i></span>       
                `
                document.querySelector(".product__info-counter").classList.add('hidden')
                displayCartItemCount()
            } else return

        } else if (cartArray.length === 0 && product.quantity > 0) {
            cartArray.push({ "id": Number(product.id), "price": Number(product.price), "image": product.webformatURL, "name": product.tags, "amount": Number(amount.textContent) });
            localStorage.setItem('cart', JSON.stringify(cartArray));
            item.classList.add("unavailable-btn", 'valid')
            item.innerHTML = `<span>Added to cart <i class="fas fa-check"></i></span>       
                `
            document.querySelector(".product__info-counter").classList.add('hidden')
            displayCartItemCount()
        }

    })

}
window.addEventListener('DOMContentLoaded', init);