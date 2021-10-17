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
    await renderService.getCategoryHome(arrivalsGallery, arrivalsTpl, 'dress', 4)

};


window.addEventListener('DOMContentLoaded', init);


// add to storage
window.addEventListener('click', e => {

    if (e.target.classList.contains("add-button")) {
        setStorageItem("chosen", e.target.parentElement.dataset.id)

    }
    let store = getStorageItem("item");
    let chosen = Number(getStorageItem("chosen"));
    store.map((el) => {
        if (el.id === chosen) {
            setStorageItem('cartItem', el)
        }

    })

});


// shift to Product List

(() => {

    const viewAllFeatured = document.querySelector(".featured .section__view-button");
    const viewAllPopular = document.querySelector(".popular .section__view-button");
    const viewAllNew = document.querySelector(".arrivals .section__view-button");
    const viewAllSales = document.querySelector(".banner .button");



    viewAllFeatured.addEventListener('click', () => {
        category = 'featured';
    })
    // viewAllPopular.addEventListener('click', () => {
    //     setStorageItem('sort', 'popular');
    //     setStorageItem('category', 'all');
    // })
    // viewAllNew.addEventListener('click', () => {
    //     setStorageItem('sort', 'new');
    //     setStorageItem('category', 'all');
    // })
    // viewAllSales.addEventListener('click', () => {
    //     setStorageItem('sort', 'sales');
    //     setStorageItem('category', 'all');
    // })

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

    searchBtn.forEach(e => {
        e.addEventListener('click', () => {
            input.forEach(e => {
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