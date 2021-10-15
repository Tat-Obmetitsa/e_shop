import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import { getElement } from './utils';
// import API from './apiServer';
import ApiService from './apiServer';

const apiService = new ApiService();

import productListTpl from '../templates/productList.hbs';
import './header';
// let priceMax = document.querySelectorAll('.active + label .price_num high')
// let priceMin = document.querySelectorAll('.active + label')
const priceSortBtn = getElement('.sort-btn-price')
const priceSortBtnSpan = getElement('.sort-btn-price span')
const upBtn = getElement('.up')
const downBtn = getElement('.down')
// // .price_num high
// // .price_num low

const productGallery = getElement('.list__gallery');
const viewNum = getElement('.list__view-results')
const categoriesBtns = document.querySelectorAll('.categories-btn.button')
const priceCheck = document.querySelectorAll(".list__filter-item_list input")
let commonArray = []

function sortUp(array) {
    if (array !== undefined) return array.sort((a, b) => a.price - b.price);
}
function sortDown(array,) {
    if (array !== undefined) return array.sort((a, b) => b.price - a.price);
}



function getCommonData(a, b, gallery, view, tpl,) {
    let itemsNum;
    Promise.all([a, b]).then(values => {
        itemsNum = 16;
        let hitsObj = values[0].hits
        let dataObj = values[1].data;
        let arrPrices = []
        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key)) {
                arrPrices.push(dataObj[key].price);
            }
        }
        for (let i = 0; i < arrPrices.length;) {

            for (const jey in hitsObj) {
                Object.assign(hitsObj[jey], { price: `${arrPrices[i]}` });
                i += 1
            }

        }
        commonArray.push(...hitsObj)
        upBtn.addEventListener('click', () => {
            productGallery.innerHTML = '';

            let arr = sortUp(commonArray)
            productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));



        })
        downBtn.addEventListener('click', () => {
            productGallery.innerHTML = '';
            let arr = sortDown(commonArray)
            productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));



        })

        gallery.insertAdjacentHTML('beforeend', tpl(commonArray));
        view.textContent = `${itemsNum} of ${values[0].total}`

    })

}

const sort = async () => {
    const popularPics = await apiService.getPics(200, 'clothes');
    const popularPrice = await apiService.getPrice(200);

    renderCategories()
    getCommonData(popularPics, popularPrice, productGallery, viewNum, productListTpl)


}

function renderCategories() {
    let arr;


    categoriesBtns[0].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => e.tags.includes('jacket'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${arr.length} items`


    })
    categoriesBtns[1].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => e.tags.includes('shirt') || e.tags.includes('blouse'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${arr.length} items`
    })
    categoriesBtns[2].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => e.tags.includes('pants') || e.tags.includes('jeans'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${arr.length} items`
    })
    categoriesBtns[3].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => e.tags.includes('shoes'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${arr.length} items`
    })
    categoriesBtns[4].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => e.tags.includes('dress'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${arr.length} items`
    })
    categoriesBtns[5].addEventListener('click', () => {
        productGallery.innerHTML = '';
        arr = commonArray.filter(e => !e.tags.includes('shirt') && !e.tags.includes('blouse') && !e.tags.includes('dress') && !e.tags.includes('shoes') && !e.tags.includes('pants') && !e.tags.includes('jeans'))
        productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));
        viewNum.textContent = `${16} of ${arr.length}`
    })

    categoriesBtns.forEach(e => {
        e.addEventListener('click', () => {
            upBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';

                let array = sortUp(arr)
                productGallery.insertAdjacentHTML('beforeend', productListTpl(array));



            })
            downBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';
                let array = sortDown(arr)
                productGallery.insertAdjacentHTML('beforeend', productListTpl(array));



            })

        })
    })


}



window.addEventListener('DOMContentLoaded', sort);
