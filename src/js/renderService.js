import { getElement } from './utils'
import API from './apiServer';
import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';


const popularGallery = getElement('.popular__list');
const featuredGallery = getElement('.featured__list');

function getCommonData(a, b, gallery, tpl) {
    Promise.all([a, b]).then(values => {
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
    })

}
const init = async () => {
    const featuredPics = await API.getFeaturedPics(12);
    const featuredPrice = await API.getFeaturedPrice();
    const popularPics = await API.getPopularPics('outfit', 9);
    const popularPrice = await API.getPopularPrice();


    getCommonData(popularPics, popularPrice, popularGallery, popularTpl);
    getCommonData(featuredPics, featuredPrice, featuredGallery, featuredTpl);

};


export default { init };