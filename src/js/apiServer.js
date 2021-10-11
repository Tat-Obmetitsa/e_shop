const baseUrl = 'http://localhost:3030/';
import { setStorageItem } from './utils'
const baseImgUrl = 'https://pixabay.com/api/'
const apiKeyImg = '19817444-e2944238b0133b6bab479e2af';
let limit;


// from pixabay "popular"

const fetchPics = async (query, limit) => {
    const url = `${baseImgUrl}?image_type=photo&orientation=horizontal&category=industry&q=${query}&page=1&per_page=${limit}&key=${apiKeyImg}`;
    const response = await fetch(url).then(response => response.json()).catch((err) => console.log(err));

    return response;
};


// from local api 
const fetchFeatured = async (limit) => {
    const params = `products?name[$like]=*over-the-ear*&$limit=${limit}`;
    let url = baseUrl + params;
    const response = await fetch(url).then(response => response.json())
        .then(({ data }) => {
            setStorageItem("item", data)

            return data;
        }).catch((err) => console.log(err));

    return response;
};


// from local "popular"
const fetchPopular = async (limit) => {
    const params = `products?$sort[upc]=1&$limit=${limit}`;
    let url = baseUrl + params;
    const response = await fetch(url).then(response => response.json()).catch((err) => console.log(err));

    return response;
};


export default { fetchFeatured, fetchPopular, fetchPics };