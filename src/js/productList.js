import '../scss/main.scss'
import 'regenerator-runtime/runtime.js';
import { getElement } from './utils';
import API from './apiServer';
import productListTpl from '../templates/productList.hbs';

const productGallery = getElement('.list__gallery');
const viewNum = getElement('.list__view-results')


let itemsNum;
function getCommonData(a, b, gallery, view, tpl) {

    Promise.all([a, b]).then(values => {
        itemsNum = 16;
        let hitsObj = values[0].hits;
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
        gallery.insertAdjacentHTML('beforeend', tpl(hitsObj));
        view.textContent = `${itemsNum} of ${values[0].total}`
    })

}

const sort = async () => {

    const popularProducts = await API.fetchPics('fashion', 16);
    const priceProfucts = await API.fetchPopular(16);

    getCommonData(popularProducts, priceProfucts, productGallery, viewNum, productListTpl);
}


window.addEventListener('DOMContentLoaded', sort);
