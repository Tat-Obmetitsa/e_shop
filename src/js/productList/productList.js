import '../../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import utils from '../utils.js';
import list from './renderList';
import render from '../renderService';
import RenderService from '../render';
import productListTpl from '../../templates/productList.hbs';
const renderService = new RenderService(render.commonArray);

const paginationContainer = document.querySelector('.pagination');
const productGallery = document.querySelector('.list__gallery');
const input = document.querySelectorAll('.header__wrapper-input');

const upBtn = document.querySelector('.up')
const downBtn = document.querySelector('.down')

const viewNum = document.querySelector('.list__view-results')
const categoriesBtns = document.querySelectorAll('.categories-btn.button')
var _ = undefined;

let index = 0;
let pages = [];
let data;
let active = []
let activeRating = []
let minPrice = [];
let maxPrice = [];
let stars = []
const priceItem = document.querySelectorAll('.list__filter-item_price .price_list')
const ratingItem = document.querySelectorAll('.list__filter-item_rating .rating_list')

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
    const manufacturers = renderService.getFilteredManufacturer();
    list.renderManufacturers(manufacturers)

    // open by clicking on homepage
    switch (window.location.search) {
        case '?=jacket':
            await getCategory('jacket');
            break;
        case '?=shirt':
            await getCategory('shirt');
            break;
        case '?=jeans':
            await getCategory('jeans');
            break;
        case '?=shoes':
            await getCategory('shoes');
            break;
        case '?=dress':
            await getCategory('dress');
            break;
        case '?=fashion':
            await getCategory('fashion');
            break;
        case '?=featured':
            await getCategory('cloth');
            break;
        case '?=arrivals':
            await getCategory('tie');
            break;
        case '?=popular':
            await getCategory('fashion');
            break;
        case '?=viewed':
            data = renderService.getHistoryById();
            let response = renderService.paginate(data)
            pages = []
            pages.push(...response)
            viewNumItems(index, data.length, 9)
            list.displayButtons(paginationContainer, pages, index)
            await (productGallery, productListTpl, pages[index]);
            break;
        case '':
            await getCategory('');
            break;
        default:
            await getCategory(window.location.search.replace("?", "").replace("=", ""));
            break;
    }

    // sort by price
    upBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        upBtn.classList.add("v-hidden")
        downBtn.classList.remove("v-hidden")


        if (active.length > 0) {
            priceSort()
        } else if (activeRating.length > 0) {
            ratingFiltered()
        }

        data = renderService.sortUp(data)

        let response = renderService.paginate(data)
        pages = []
        pages.push(...response)
        viewNumItems(index, data.length, 9)
        list.displayButtons(paginationContainer, pages, index)
        renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
        getItems()
    })
    downBtn.addEventListener('click', () => {
        productGallery.innerHTML = '';
        downBtn.classList.add("v-hidden")
        upBtn.classList.remove("v-hidden")
        if (active.length > 0) {
            priceSort()
        } else if (activeRating.length > 0) {
            ratingFiltered()
        }
        data = renderService.sortDown(data)
        let response = renderService.paginate(data)
        pages = []
        pages.push(...response)
        viewNumItems(index, data.length, 9)
        list.displayButtons(paginationContainer, pages, index)
        renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
        getItems()
    })

    // filter by price
    priceItem.forEach(e => {
        e.addEventListener('click', (ev) => {
            let element = ev.target;
            if (!element.classList.contains('active')) {
                element.classList.add('active')
            } else {
                element.classList.remove('active');
            }
            if (active.find(item => item == element)) {
                active.forEach(function (item, i) {
                    if (item == element) {
                        active.splice(i, 1);
                    }
                });
            } else {
                active.push(element);
            }
            priceSort()
            getItems()
        })
    })
    // filter by rating

    ratingItem.forEach(e => {
        e.addEventListener('click', (ev) => {
            let element = ev.target;

            if (!element.classList.contains('active-rating')) {
                element.classList.add('active-rating')
            } else {
                element.classList.remove('active-rating');
            }
            if (activeRating.find(item => item == element)) {
                activeRating.forEach(function (item, i) {
                    if (item == element) {
                        activeRating.splice(i, 1);
                    }
                });
            } else {
                activeRating.push(element);
            }
            ratingFiltered()

        })

    })
    await getItems()
    await getData()
    await renderCategories()
    await utils.displayCartItemCount()
    await getItems()

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
    getItems()
}

input.forEach(el => {
    el.addEventListener('keyup', searchData)
});

function priceSort() {
    minPrice = []
    maxPrice = []
    active.forEach(e => {
        minPrice.push(Number(e.dataset.minvalue))
        maxPrice.push(Number(e.dataset.maxvalue))

    })
    let setMin = new Set(minPrice);
    let setMax = new Set(maxPrice);
    let min = Array.from(setMin)
    let max = Array.from(setMax)
    if (min.length === 0) {
        min.push(0); max.push(10000000)
    }
    productGallery.innerHTML = '';
    data = renderService.sortPrice(min, max)
    let response = renderService.paginate(data)
    pages = []
    pages.push(...response)

    viewNumItems(index, data.length, 9)
    list.displayButtons(paginationContainer, pages, index)
    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);


}
function ratingFiltered() {
    stars = []
    activeRating.forEach(e => {
        stars.push(Number(e.dataset.value))

    })
    let setStars = new Set(stars);
    let min = Array.from(setStars)
    if (min.length === 0) {
        min.push(1, 2, 3, 4, 5)
    }
    productGallery.innerHTML = '';
    data = renderService.getFilterRating(min)
    let response = renderService.paginate(data)
    pages = []
    pages.push(...response)

    viewNumItems(index, data.length, 9)
    list.displayButtons(paginationContainer, pages, index)
    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
    getItems()

}
//  get categories

const getData = () => {

    categoriesBtns[0].addEventListener('click', () => getCategory('jacket', _))
    categoriesBtns[1].addEventListener('click', () => getCategory('shirt', _))
    categoriesBtns[2].addEventListener('click', () => getCategory('jeans', _))
    categoriesBtns[3].addEventListener('click', () => getCategory('shoes', _))
    categoriesBtns[4].addEventListener('click', () => getCategory('dress', _))
    categoriesBtns[5].addEventListener('click', () => getCategory('fashion', _))
    categoriesBtns[6].addEventListener('click', () => getCategory('', _))
    document.querySelectorAll(".filter-manufacturer").forEach(e => {
        e.addEventListener("click", () => {
            getCategory(_, e.value)
        })

    })


}

const getCategory = async (query, str) => {
    data = []

    data = renderService.getFiltered(query, str)

    let response = renderService.paginate(data)
    pages = []
    pages.push(...response)
    viewNumItems(index, data.length, 9)
    list.displayButtons(paginationContainer, pages, index)
    if (active.length > 0) {
        priceSort()
    } else if (activeRating.length > 0) {
        ratingFiltered()
    }
}

const viewNumItems = (page, total, itemsOnPage) => {
    page = page + 1
    let start = (page - 1) * itemsOnPage + 1;
    let end = Math.min(page * itemsOnPage, total);
    if (data.length > 0) {
        viewNum.textContent = `Viewing ${start} to ${end} of ${total} `
        paginationContainer.classList.remove('hidden')
    } else {
        viewNum.textContent = `Nothing was found :( `;
        paginationContainer.classList.add('hidden')
    }

    return viewNum
};

function renderCategories() {
    renderService.getCategoryAll(productGallery, productListTpl, pages[index]);

    categoriesBtns.forEach(e => {
        e.addEventListener('click', () => {
            index = 0;
            renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
            getItems()
        })

    })
    document.querySelectorAll(".filter-manufacturer").forEach(e => {
        e.addEventListener("click", () => {
            index = 0;
            renderService.getCategoryAll(productGallery, productListTpl, pages[index]);
            getItems()
        })

    })
    getItems()
    list.displayButtons(paginationContainer, pages, index)

}
function getItems() {
    let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    const addBtns = document.querySelectorAll(".add-btn");
    const items = document.querySelectorAll(".product-container");

    items.forEach(item => {
        addBtns.forEach(btn => {
            let newProduct = cartArray.every(cartItem => cartItem.id !== Number(btn.dataset.id))

            if (renderService.getById(btn.dataset.id).quantity == 0) {
                btn.innerHTML = `
                <i class="fas fa-times unavailable-btn"></i>`;
                btn.classList.remove('add-btn')
            }
            if (!newProduct) {
                btn.innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`
                btn.classList.remove('add-btn')
            }
        })

        item.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement;
            const parentElementID = e.target.parentElement.dataset.id;
            const product = renderService.getById(Number(parentElementID));
            if (e.target.parentElement.classList.contains('details')) {
                let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
                if (viewedArray.length > 5) { viewedArray.shift(); }
                viewedArray.push(parentElementID);
                localStorage.setItem('viewed', JSON.stringify(viewedArray));
            }
            if (parentElement.classList.contains('add-btn') || e.target.classList.contains('add-btn')) {
                if (cartArray.length > 0) {
                    let newProduct = cartArray.every(cartItem => cartItem.id !== Number(parentElementID))

                    if (newProduct && product.quantity > 0) {
                        cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "name": product.tags, "amount": 1, "shipping": product.shipping });
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                        e.target.closest("button").classList.add("unavailable-btn", "valid")
                        e.target.closest("button").innerHTML = `<i class="fas fa-check  "></i>`
                        utils.displayCartItemCount()
                        utils.toastSuccess.text = "Item was added to cart!"
                        Toastify(utils.toastSuccess).showToast();
                    } else return

                } else if (cartArray.length === 0 && product.quantity > 0) {
                    cartArray.push({ "id": product.id, "price": product.price, "image": product.webformatURL, "name": product.tags, "amount": 1, "shipping": product.shipping });
                    localStorage.setItem('cart', JSON.stringify(cartArray));

                    e.target.closest("button").innerHTML = `<i class="fas fa-check unavailable-btn valid"></i>`
                    utils.displayCartItemCount()
                    utils.toastSuccess.text = "Item was added to cart!"
                    Toastify(utils.toastSuccess).showToast();
                }
            }

        })
    })
}


window.addEventListener('load', () => utils.spinner())
window.addEventListener('DOMContentLoaded', sort);

