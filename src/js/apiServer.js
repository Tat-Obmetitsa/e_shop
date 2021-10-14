const baseUrl = 'http://localhost:3030/';
const baseImgUrl = 'https://pixabay.com/api/'
const apiKeyImg = '19817444-e2944238b0133b6bab479e2af';

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

//  featured products 

function getFeaturedPrice() {
    const params = `products?$sort[upc]=1&$limit=12`;
    let url = baseUrl + params;
    let featuredPrice = makeRequest('GET', url)
        .then(function (datums) {
            return datums
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
    return featuredPrice
}

function getFeaturedPics(limit) {
    const urlImg = `${baseImgUrl}?image_type=photo&orientation=horizontal&category=industry&page=1&per_page=${limit}&key=${apiKeyImg}`;
    let featuredPics = makeRequest('GET', urlImg)
        .then(function (datums) {
            return datums
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
    return featuredPics
}

//  popular products 

function getPopularPrice() {
    const params = `products?$sort[upc]=1&$limit=9`;
    let url = baseUrl + params;
    let popularPrice = makeRequest('GET', url)
        .then(function (datums) {
            return datums
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
    return popularPrice
}

function getPopularPics(query, limit) {
    const url = `${baseImgUrl}?image_type=photo&orientation=horizontal&category=fashion&q=${query}&page=1&per_page=${limit}&key=${apiKeyImg}`;
    let popularPics = makeRequest('GET', url)
        .then(function (datums) {
            return datums
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        });
    return popularPics
}



export default { getFeaturedPrice, getFeaturedPics, getPopularPrice, getPopularPics };