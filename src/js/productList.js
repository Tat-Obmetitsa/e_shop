import '../scss/main.scss'
import './header';
import 'regenerator-runtime/runtime.js';
import render from './renderService';
import RenderService from './render';
const renderService = new RenderService(render.commonArray);

import productListTpl from '../templates/productList.hbs';
const productGallery = document.querySelector('.list__gallery');




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



const sort = async () => {
    await render.init();

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


    await renderService.getCategoryAll(productGallery, productListTpl, '');

    await renderCategories()

}
function searchData() {
    onSearch()

}

function renderCategories() {
    categoriesBtns[0].addEventListener('click', () => {
        renderService.getCategoryAll(productGallery, productListTpl, 'jacket');
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


}



window.addEventListener('DOMContentLoaded', sort);
