import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';

import render from './renderService';
import RenderService from './render';
import productGalleryTpl from '../templates/productPageGallery.hbs';
const renderService = new RenderService(render.commonArray);

const sliderSimilar = document.querySelector('.slides-similar');
const sliderRecent = document.querySelector('.slides-recent');
const reviewsSection = document.querySelector(".reviews__wrapper");
const productSection = document.querySelector('.product.section');
const getId = window.location.search.replace("?", "").replace("=", "")
const submitBtn = document.querySelector(".form__field-btn");




const init = async () => {
    await render.init();
    let reviewedProducts = await renderService.getByIdReviws(Number(getId))
    const product = await renderService.getById(Number(getId))

    await renderProduct(product) // render product
    await counter()
    await getItems()  //open products  from sliders

    //render reviews
    submitBtn.addEventListener('click', () => checkInputs(reviewedProducts))
    await renderReviews(reviewedProducts)

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

function renderReviews(obj) {
    reviewsSection.innerHTML = " "
    for (let i = 0; i < obj.length; i++) {
        const e = obj[i];
        let liItem = document.createElement('li')
        if (e.userImageURL === undefined || e.userImageURL === null || e.userImageURL === "") {
            e.userImageURL = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
        }
        liItem.classList.add('reviews__wrapper-item');
        liItem.innerHTML = `
            <div class="reviews__wrapper-item_info">
             <img src=${e.userImageURL} class="user__image"   alt="avatar">
             <h4 class="user__name">${e.user}</h4>
              <div class="wrapper__description-icons" data-id=${e.id}>
     </div >
        </div>
        <p class="user__review"  >${e.description}</p>
        `

        reviewsSection.appendChild(liItem)
        let iconWrapper = document.querySelectorAll(".wrapper__description-icons");
        const starSign = '<i width="24" height="24" class="fas fa-star"></i>'
        if (e.star == "1") {
            iconWrapper[i].innerHTML = starSign;
        } else if (e.star == "2") {
            iconWrapper[i].innerHTML = starSign + starSign;
        } else if (e.star == "3") {
            iconWrapper[i].innerHTML = starSign + starSign + starSign;
        } else if (e.star == "4") {
            iconWrapper[i].innerHTML = starSign + starSign + starSign + starSign;
        } else if (e.star == "5") {
            iconWrapper[i].innerHTML = starSign + starSign + starSign + starSign + starSign;
        }

    }

}

//  open products  from sliders
function getItems() {
    const items = document.querySelectorAll(".slider__item-img");
    items.forEach(item => {
        item.addEventListener('click', () => {
            let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
            viewedArray.push(item.dataset.id)
            window.location.href = `http://localhost:3000/productPage.html?=${item.dataset.id}`
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

const radio = document.querySelectorAll('.radio')
formReview.addEventListener('input', (e) => {
    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();
    if (el.classList.contains("name") && el.validity.valid) {
        formData.append("user", elValue);
    }

    if (el.classList.contains("email") && el.validity.valid) {
        formData.append("email", elValue);
    }
    if (el.classList.contains("comment") && el.validity.valid) {
        formData.append("description", elValue)
    }


})

function checkInputs(ob) {
    let object = {
        "user": "",
        "email": "",
        "description": "",
        "star": "",
        "id": getId
    };
    radio.forEach(el => {
        if (el.checked) {
            formData.append("star", el.value);
        }
    });
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    let finalObj = Object.values(object).every(e => e !== "")
    if (finalObj) {

        let commentArray = JSON.parse(localStorage.getItem('comment')) || [];
        commentArray.push(object);
        localStorage.setItem('comment', JSON.stringify(commentArray));
        document.querySelector(".name.input").value = "";
        document.querySelector(".email.input").value = "";
        document.querySelector("textarea").value = "";
        ob.push(object)
        formData.forEach(function (value, key) {
            formData.delete(key)
        });
        renderReviews(ob)

    }

}