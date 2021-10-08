import { getElement } from './utils'
import API from './apiServer';
const Handlebars = require("handlebars");
import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';
const popularGallery = getElement('.popular__list');
const featuredGallery = getElement('.featured__list');


const init = async () => {
    const featuredProducts = await API.fetchFeatured();
    const popularProducts = API.fetchPics();
    const priceProfucts = API.fetchPopular();

    Promise.all([popularProducts, priceProfucts]).then(values => {
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
        popularGallery.insertAdjacentHTML('beforeend', popularTpl(hitsObj));
    })


    featuredGallery.insertAdjacentHTML('beforeend', featuredTpl(featuredProducts));
};


export default { init };