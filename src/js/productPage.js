import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';

import render from './renderService';
import RenderService from './render';
const renderService = new RenderService(render.commonArray);


const productSection = document.querySelector('.product.section')
const getId = window.location.search.replace("?", "").replace("=", "")
const init = async () => {
    await render.init();
    const product = renderService.getById(Number(getId))

    renderProduct(product)
}



function renderProduct(obj) {
    productSection.innerHTML = `
                <img src=${obj.webformatURL} class="product__image" alt="">
            <div class="product__info">
                <h2 class="product__info-title">${obj.tags}</h2>
                <p class="product__info-price">&dollar;${obj.price}</p>
                <p class="product__info-shipping">${obj.shipping == 0 ? `<span class="free">FREE SHIPPING!</span>` : `Shipping:  &dollar;${obj.shipping}`}</p>
                <p class="product__info-manufacturer"><b>Manufacturer</b>: ${obj.manufacturer}</p>
                <p class="product__info-description">${obj.description}</p>
                 
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
    counter()

}

// homepage sliders

window.addEventListener('DOMContentLoaded', init);

const counter = () => {
    let counterValueRef = document.querySelector('.counter-amount');
    let addCounter = document.querySelector('.counter-increase');
    let removeCounter = document.querySelector('.counter-decrease');

    let counterValue = 1;
    function onIncrementClick() {
        counterValueRef.textContent = counterValue += 1;
    }
    function onDecrementClick() {
        if (counterValueRef.textContent > 1) {
            counterValueRef.textContent = counterValue -= 1;
        } else { counterValueRef.textContent = 1 }
    }

    addCounter.addEventListener('click', onIncrementClick);
    removeCounter.addEventListener('click', onDecrementClick);
};



$('.slider').slick({
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    lazyLoad: 'progressive',
    mobileFirst: true,
    responsive: [{
        breakpoint: 765,
        settings: {
            slidesToShow: 2,
        },

        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            arrows: true,
        }
    }]

});