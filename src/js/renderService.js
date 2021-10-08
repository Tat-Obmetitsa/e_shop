import { getElement } from './utils'
import API from './apiServer';

import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';
const popularGallery = getElement('.popular__list');
const featuredGallery = getElement('.featured__list');

const init = async () => {
    const featuredProducts = await API.fetchFeatured();
    const popularProducts = await API.fetchPics();
    const priceProfucts = await API.fetchPopular();

    Promise.all([popularProducts, priceProfucts]).then(values => {
        popularGallery.insertAdjacentHTML('beforeend', popularTpl(...values))
    })

    featuredGallery.insertAdjacentHTML('beforeend', featuredTpl(featuredProducts));
};


export default { init };