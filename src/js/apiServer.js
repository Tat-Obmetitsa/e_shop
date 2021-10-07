const baseUrl = 'http://localhost:3030/';

const baseImgUrl = 'https://pixabay.com/api/'
const apiKeyImg = '19817444-e2944238b0133b6bab479e2af';

// from pixabay

const fetchPics = async () => {
    const url = `${baseImgUrl}?image_type=photo&category=industry&q=fashion&page=1&per_page=9&key=${apiKeyImg}`;
    const response = await fetch(url).then(response => response.json())
        .then(({ hits }) => {
            return hits;
        }).catch((err) => console.log(err));

    return response;
};


// from local api

const fetchFeatured = async () => {
    const params = `products?name[$like]=*over-the-ear*&$limit=12`;
    let url = baseUrl + params;
    const response = await fetch(url).then(response => response.json())
        .then(({ data }) => {
            return data;
        }).catch((err) => console.log(err));

    return response;
};


const fetchPopular = async () => {
    const params = `products?$sort[upc]=1&$limit=9`;
    let url = baseUrl + params;
    const response = await fetch(url).then(response => response.json())
        .then(({ data }) => {
            return data;
        }).catch((err) => console.log(err));

    return response;
};


export default { fetchFeatured, fetchPopular, fetchPics };