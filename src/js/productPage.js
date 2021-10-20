import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';

import render from './renderService';
import RenderService from './render';
import productGalleryTpl from '../templates/productPageGallery.hbs';
import reviewsTpl from '../templates/reviews.hbs';
const renderService = new RenderService(render.commonArray);

const sliderSimilar = document.querySelector('.slides-similar');
const sliderRecent = document.querySelector('.slides-recent');
const reviewsSection = document.querySelector(".reviews__wrapper");
const productSection = document.querySelector('.product.section');
const getId = window.location.search.replace("?", "").replace("=", "")
const iconsWrapper = document.querySelectorAll('.wrapper__description-icons')

const init = async () => {
    await render.init();
    const reviewedProducts = await renderService.getById(Number(getId))
    const product = reviewedProducts[0]
    await renderProduct(product)
    await counter()
    await getItems()


    await renderService.getCategoryAll(reviewsSection, reviewsTpl, reviewedProducts);

    const viewAllBtns = document.querySelectorAll('.section__view-button');
    viewAllBtns[0].addEventListener('click', () => window.location.href = `http://localhost:3000/productList.html?=${product.tags.split(', ')[0]}`)
    viewAllBtns[1].addEventListener('click', () => window.location.href = "http://localhost:3000/productList.html?=viewed");



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

    // render similar   products by 1st word in tags and recent products
    const similarProducts = renderService.getFiltered(obj.tags.split(', ')[0]);
    const recentProducts = renderService.getHistoryById();
    renderService.getCategoryAll(sliderSimilar, productGalleryTpl, similarProducts);
    renderService.getCategoryAll(sliderRecent, productGalleryTpl, recentProducts);




}

//  open products  from sliders
function getItems() {
    const items = document.querySelectorAll(".slider__item-img");
    items.forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `http://localhost:3000/productPage.html?=${item.dataset.id}`
        })
    })



}

function getStars(array) {
    reviewedProducts.forEach(el => {


        for (let i = 0; i <= el.star; i++) {
            const element = iconsWrapper[i];

            // element.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // `
        }
    })










    iconsWrapper.forEach(e => {
        array.forEach(el => {
            console.log(iconsWrapper)
            // if (el.stars == 1) {
            //     e.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // `

            // } else if (el.star == 2) {
            //     e.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // `

            // } else if (el.star == 3) {
            //     e.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // `

            // } else if (el.star == 4) {
            //     e.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // `

            // } else if (el.star == 5) {
            //     e.innerHTML = `
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // <i width="24" height="24" class="fas fa-star"></i>
            // `

            // }
        })
    })
}




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



//  comment form

const formReview = document.querySelector(".review__form")
let formData = new FormData(formReview);
const inputs = document.querySelectorAll('.review__form input')
let object = {
    "name": "",
    "email": "",
    "comment": "",
};


formReview.addEventListener('input', (e) => {
    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();
    if (el.classList.contains("name") && el.validity.valid) {
        formData.append('name', elValue);
    }

    if (el.classList.contains("email") && el.validity.valid) {
        formData.append('email', elValue);
    }
    if (el.classList.contains("comment") && el.validity.valid) {
        formData.append('comment', elValue)
    }

})

const submitBtn = document.querySelector(".form__field-btn");
submitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    checkInputs()
    return false
})

function checkInputs() {
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    let finalObj = Object.values(object).every(e => e !== "")
    if (finalObj) {
        localStorage.setItem('comment', json);
        inputs.forEach(e => e.value = '');
        alert('Success!')
    }
}