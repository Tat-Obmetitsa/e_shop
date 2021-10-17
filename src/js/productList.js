import '../scss/main.scss'
// import search from './header';
import 'regenerator-runtime/runtime.js';
import render from './renderService';
import RenderService from './render';
const renderService = new RenderService(render.commonArray);
const paginationContainer = document.querySelector('.pagination')
import productListTpl from '../templates/productList.hbs';
const productGallery = document.querySelector('.list__gallery');
const searchBtn = document.querySelectorAll('.search');
const input = document.querySelectorAll('.header__wrapper-input')



// let priceMax = document.querySelectorAll('.active + label .price_num high')
// let priceMin = document.querySelectorAll('.active + label')
const priceSortBtn = document.querySelector('.sort-btn-price')
const priceSortBtnSpan = document.querySelector('.sort-btn-price span')
const upBtn = document.querySelector('.up')
const downBtn = document.querySelector('.down')
// // .price_num high
// // .price_num low


const viewNum = document.querySelector('.list__view-results')
const categoriesBtns = document.querySelectorAll('.categories-btn.button')
const priceCheck = document.querySelectorAll(".list__filter-item_list input")

// const setupUI = () => {
//     renderService.getAll(productGallery, productListTpl, '', render.pages[render.index]);
//     render.displayButtons(paginationContainer, render.pages, render.index)
// }


paginationContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('pagination')) return
    if (e.target.classList.contains('page-btn')) {
        render.index = parseInt(e.target.dataset.index)
    }
    if (e.target.classList.contains('next-btn')) {
        render.index++
        if (render.index > render.pages.length - 1) {
            render.index = 0
        }
    }
    if (e.target.classList.contains('prev-btn')) {
        render.index--
        if (render.index < 0) {
            render.index = render.pages.length - 1
        }
    }
    // setupUI()
    renderCategories()
})




const sort = async () => {
    await render.init();
    // setupUI()

    upBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        let array = renderService.sortUp()
        productGallery.insertAdjacentHTML('beforeend', productListTpl(array));
    })
    downBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        let array = renderService.sortDown()
        productGallery.insertAdjacentHTML('beforeend', productListTpl(array));
    })


    // await renderService.getCategoryAll(productGallery, productListTpl, '');

    await renderCategories()

}
function searchData(evt) {

    evt.preventDefault();
    renderService.query = evt.currentTarget.value;

    if (renderService.query === '') {
        return alert('Nothing was found ');
    }


    renderService.getSearch(productGallery, productListTpl, `${renderService.query}`)
}

function renderCategories() {
    renderService.getAll(productGallery, productListTpl, '', render.pages[render.index]);


    categoriesBtns[0].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'jacket',);
    })
    categoriesBtns[1].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'shirt');
    })
    categoriesBtns[2].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'jeans');
    })
    categoriesBtns[3].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'shoes');
    })
    categoriesBtns[4].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'dress');
    })
    categoriesBtns[5].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, '');
    })

    categoriesBtns.forEach(e => {
        e.addEventListener('click', () => {
            upBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';
                let array = renderService.sortUp()
                productGallery.insertAdjacentHTML('beforeend', productListTpl(array));
            })
            downBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';
                let array = renderService.sortDown()
                productGallery.insertAdjacentHTML('beforeend', productListTpl(array));
            })

        })
    })
    render.displayButtons(paginationContainer, render.pages, render.index)

}


input.forEach(el => {
    el.addEventListener('keyup', searchData)
});


window.addEventListener('DOMContentLoaded', sort);





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





