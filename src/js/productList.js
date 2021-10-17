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

let index = 0
let pages = []


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
//     renderService.getAll(productGallery, productListTpl, '', pages[index]);
//     render.displayButtons(paginationContainer, pages, index)
// }


paginationContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('pagination')) return
    if (e.target.classList.contains('page-btn')) {
        index = parseInt(e.target.dataset.index)
    }
    if (e.target.classList.contains('next-btn')) {
        index++
        if (index > pages.length - 1) {
            index = 0
        }
    }
    if (e.target.classList.contains('prev-btn')) {
        index--
        if (index < 0) {
            index = pages.length - 1
        }
    }
    // setupUI()
    renderCategories()
})


let data = []

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


    await getData()
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
const getData = async () => {
    await getF('')
    categoriesBtns[0].addEventListener('click', () => getF('jacket'))
    categoriesBtns[1].addEventListener('click', () => getF('shirt'))
    categoriesBtns[2].addEventListener('click', () => getF('jeans'))
    categoriesBtns[3].addEventListener('click', () => getF('shoes'))
    categoriesBtns[4].addEventListener('click', () => getF('dress'))
    categoriesBtns[5].addEventListener('click', () => getF('woman'))
}
const getF = async (query) => {
    data = []
    data = await renderService.getCat(query)
    let response = renderService.paginate(data)
    pages = []
    pages.push(...response)
    console.log(pages)
}
function renderCategories() {
    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
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
            renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
        })
    })
    displayButtons(paginationContainer, pages, index)

}


input.forEach(el => {
    el.addEventListener('keyup', searchData)
});


window.addEventListener('DOMContentLoaded', sort);


function displayButtons(container, page, activeIndex) {
    let btns = page.map((_, pageIndex) => {
        return `<button class="page-btn ${activeIndex === pageIndex ? 'active-btn' : 'null '
            }" data-index="${pageIndex}">
                        ${pageIndex + 1}
                        </button>`
    })

    btns.push(`<button class="next-btn">next</button>`)
    btns.unshift(`<button class="prev-btn">prev</button>`)
    container.innerHTML = btns.join('')
}


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





