import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import render from './renderService';
import RenderService from './render';
import productListTpl from '../templates/productList.hbs';

const renderService = new RenderService(render.commonArray);

const paginationContainer = document.querySelector('.pagination');
const productGallery = document.querySelector('.list__gallery');
const input = document.querySelectorAll('.header__wrapper-input');

const upBtn = document.querySelector('.up')
const downBtn = document.querySelector('.down')

const viewNum = document.querySelector('.list__view-results')
const categoriesBtns = document.querySelectorAll('.categories-btn.button')

let index = 0
let pages = []
let data;

// let priceMax = document.querySelectorAll('.active + label .price_num high')
// let priceMin = document.querySelectorAll('.active + label')
// const searchBtn = document.querySelectorAll('.search');
// const priceCheck = document.querySelectorAll(".list__filter-item_list input")


// pagination  

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
    viewNumItems(index, data.length, 9)
    getData()
    renderCategories()
})


// sort by price and render

const sort = async () => {
    await render.init();
    upBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        upBtn.classList.add("hidden")
        downBtn.classList.remove("hidden")
        data = renderService.sortUp()
        let response = renderService.paginate()
        pages = []
        pages.push(...response)
        viewNumItems(index, data.length, 9)
        displayButtons(paginationContainer, pages, index)
        renderService.getCategoryAll(productGallery, productListTpl, pages[index]);


    })
    downBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        downBtn.classList.add("hidden")
        upBtn.classList.remove("hidden")
        data = renderService.sortDown()
        let response = renderService.paginate()
        pages = []
        pages.push(...response)
        viewNumItems(index, data.length, 9)
        displayButtons(paginationContainer, pages, index)
        renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
    })
    await getCategory('')
    await getData()
    await renderCategories()

}

// add search on Product Page

function searchData(evt) {

    evt.preventDefault();
    renderService.query = evt.currentTarget.value;

    if (renderService.query === '') {
        return alert('Nothing was found ');
    }
    getCategory(renderService.query)
    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
}

input.forEach(el => {
    el.addEventListener('keyup', searchData)
});

//  get categories

const getData = () => {

    categoriesBtns[0].addEventListener('click', () => getCategory('jacket'))
    categoriesBtns[1].addEventListener('click', () => getCategory('shirt'))
    categoriesBtns[2].addEventListener('click', () => getCategory('jeans'))
    categoriesBtns[3].addEventListener('click', () => getCategory('shoes'))
    categoriesBtns[4].addEventListener('click', () => getCategory('dress'))
    categoriesBtns[5].addEventListener('click', () => getCategory('fashion'))

}

const getCategory = async (query) => {
    data = []
    data = renderService.getFiltered(query)
    let response = renderService.paginate()
    pages = []
    pages.push(...response)
    viewNumItems(index, data.length, 9)
    displayButtons(paginationContainer, pages, index)

}

const viewNumItems = (page, total, itemsOnPage) => {
    page = page + 1
    let start = (page - 1) * itemsOnPage + 1;
    let end = Math.min(page * itemsOnPage, total);
    viewNum.textContent = `${start} to ${end} of ${total} `
    return viewNum
};

function renderCategories() {

    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);

    categoriesBtns.forEach(e => {
        e.addEventListener('click', () => {
            upBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';
                upBtn.classList.add("hidden")
                downBtn.classList.remove("hidden")
                data = renderService.sortUp()
                let response = renderService.paginate()
                pages = []
                pages.push(...response)
                viewNumItems(index, data.length, 9)
                displayButtons(paginationContainer, pages, index)
                renderService.getCategoryAll(productGallery, productListTpl, pages[index]);


            })
            downBtn.addEventListener('click', () => {
                productGallery.innerHTML = '';
                downBtn.classList.add("hidden")
                upBtn.classList.remove("hidden")
                data = renderService.sortDown()
                let response = renderService.paginate()
                pages = []
                pages.push(...response)
                viewNumItems(index, data.length, 9)
                displayButtons(paginationContainer, pages, index)
                renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
            })
            index = 0;
            renderService.getCategoryAll(productGallery, productListTpl, pages[index]);

        })

    })
    displayButtons(paginationContainer, pages, index)


}

window.addEventListener('DOMContentLoaded', sort);


// pagination btns

function displayButtons(container, page, activeIndex) {
    let btns = page.map((_, pageIndex) => {
        return `<button class="page-btn button ${activeIndex === pageIndex ? 'active-btn' : 'null '
            }" data-index="${pageIndex}">
                        ${pageIndex + 1}
                        </button>`

    })
    btns.push(`<button class="next-btn button">&#10095;</button>`)
    btns.unshift(`<button class="prev-btn button">&#10094;</button>`)
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





