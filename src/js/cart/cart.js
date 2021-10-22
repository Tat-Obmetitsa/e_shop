import '../../scss/main.scss'
import { getElement, setStorageItem, getStorageItem, counter } from '../utils.js';


let store = getStorageItem('store');
let cart = getStorageItem('cart');
const setupStore = (products) => {
    store = products.map((product) => {
        const {
            id,
            fields: { featured, name, price, company, colors, image: img },
        } = product;
        const image = img[0].thumbnails.large.url;
        return { id, featured, name, price, company, colors, image };
    });
    setStorageItem('store', store);
};


const findProduct = (id) => {
    let product = store.find((product) => product.id === id);
    return product;
};


const tableSection = getElement('.table')

const addToDOM = () => {
    let item = getStorageItem('cartItem');
    const table = document.createElement('table');
    table.classList.add("table__wrapper-desktop");

    table.innerHTML = `
                <tr class="table__heading">
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                <tr class="table__item">
                    <td class="table__item-card">
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                    </td>
                    <td>
                        <div class="table__item-counter">
                            <button class="counter-decrease button" data-id="${item.id}"><span>-</span></button>
                            <p class="counter-amount" data-id="${item.id}">1</p>
                            <button class="counter-increase button" data-id="${item.id}"><span>+</span></button>
                        </div>
                    </td>
                    <td>${item.price}</td>
                    <td> <button class="cart-item-remove-btn" data-id="${item.id}">remove</button>
                    </td>
                </tr>
`
    tableSection.prepend(table)
}

addToDOM()


counter()