import { getElement } from './utils'
import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';
import ApiService from './apiServer';

const apiService = new ApiService();

const popularGallery = getElement('.popular__list');
const featuredGallery = getElement('.featured__list');


function getCommonData(a, b, gallery, tpl) {
    Promise.all([a, b]).then(values => {
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
        gallery.insertAdjacentHTML('beforeend', tpl(hitsObj));
    })

}
const init = async () => {
    const featuredPics = await apiService.getPics(12, 'cloth');
    const featuredPrice = await apiService.getPrice(12);
    const popularPics = await apiService.getPics(9, 'outfit');
    const popularPrice = await apiService.getPrice(9);


    getCommonData(popularPics, popularPrice, popularGallery, popularTpl);
    getCommonData(featuredPics, featuredPrice, featuredGallery, featuredTpl);

};



export default { init };