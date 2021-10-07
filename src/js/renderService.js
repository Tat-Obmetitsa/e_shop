import { getElement } from './utils'
import API from './apiServer';

import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';

const featuredGallery = getElement('.featured__list');

const init = async () => {
    const featuredProducts = await API.fetchFeatured();
    // const popularProducts = await API.fetchPics(); 
    // popularGallery.insertAdjacentHTML('beforeend', popularTpl(hits));
    API.fetchPics()

    featuredGallery.insertAdjacentHTML('beforeend', featuredTpl(featuredProducts.data));
};


export default { init };