const baseUrl = 'http://localhost:3030/';
const baseImgUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&category=fashion+industry'
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
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    getSearchPics(limit) {
        const urlImg = `${baseImgUrl}&page=${this.page}&q=${this.searchQuery}&per_page=${limit}&key=${apiKeyImg}`;

        return makeRequest('GET', urlImg)
            .then(function (datums) {
                return datums
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }
    getPics(limit, search) {
        const urlImg = `${baseImgUrl}&page=${this.page}&q=${search}&per_page=${limit}&key=${apiKeyImg}`;

        return makeRequest('GET', urlImg)
            .then(function (datums) {
                return datums
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }
    getPrice(limit) {
        const url = `${baseUrl}products?$sort[upc]=1&$limit=${limit}`;
        return makeRequest('GET', url)
            .then(function (datums) {
                return datums
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }

    setPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}