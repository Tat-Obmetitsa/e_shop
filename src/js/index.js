import '../scss/main.scss';
import 'slick-carousel';
import 'regenerator-runtime/runtime.js';
import { getStorageItem, setStorageItem } from './utils'
import render from './renderService';
import RenderService from './render';
import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';
import arrivalsTpl from '../templates/arrivalsGallery.hbs';


const init = async () => {
    const popularGallery = document.querySelector('.popular__list');
    const featuredGallery = document.querySelector('.featured__list');
    const arrivalsGallery = document.getElementById('arrivals__list');

    await render.init()

    const renderService = new RenderService(render.commonArray);

    await renderService.getCategoryHome(popularGallery, popularTpl, 'fashion', 9)
    await renderService.getCategoryHome(featuredGallery, featuredTpl, 'cloth', 12)
    await renderService.getCategoryHome(arrivalsGallery, arrivalsTpl, 'tie', 4)

};


window.addEventListener('DOMContentLoaded', init);


// add to storage
// window.addEventListener('click', e => {

//     if (e.target.classList.contains("add-button")) {
//         setStorageItem("chosen", e.target.parentElement.dataset.id)

//     }
//     let store = getStorageItem("item");
//     let chosen = Number(getStorageItem("chosen"));
//     store.map((el) => {
//         if (el.id === chosen) {
//             setStorageItem('cartItem', el)
//         }

//     })

// });


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


// homepage sliders
$('.slick').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    lazyLoad: 'progressive',
    mobileFirst: true,
    slidesToShow: 1,
    infinite: true,
    responsive: [{

        breakpoint: 1200,
        settings: {
            arrows: true,
            dots: true,
        }

    }]
});

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