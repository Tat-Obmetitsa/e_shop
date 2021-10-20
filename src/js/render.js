
export default class RenderService {
    constructor(commonArray) {
        this.arr = commonArray
        this.filtered = []
        this.query = ''
    }

    getCategoryHome(gallery, tpl, searchQuery, amount) {
        gallery.innerHTML = '';
        this.filtered = this.arr.filter(e => e.tags.includes(`${searchQuery}`))
        gallery.insertAdjacentHTML('beforeend', tpl(this.filtered.slice(0, amount)));
    }

    getCategoryAll(gallery, tpl, array) {
        gallery.innerHTML = '';
        gallery.insertAdjacentHTML('beforeend', tpl(array));
    }

    getFiltered(searchQuery) {
        this.filtered = this.arr.filter(e =>
            e.tags.includes(`${searchQuery}`)
        )
        return this.filtered
    }


    getById(id) {
        let searchedObj = []
        for (let i = 0; i < this.arr.length; i++) {
            const e = this.arr[i];
            if (e.id === id && i < this.arr.length - 4) {
                searchedObj.push(e, this.arr[i + 1], this.arr[i + 2], this.arr[i + 3])
                break
            } else if (e.id === id && i > this.arr.length - 4) {
                searchedObj.push(e, this.arr[i - 5], this.arr[i + 4], this.arr[i + 3])
                break
            }

        }
        return searchedObj
    }

    getHistoryById() {
        let array = localStorage.getItem("viewed");
        return this.arr.filter(el => array.indexOf(`${el.id}`) > -1);
    }


    sortUp(array) {
        if (array !== undefined) array.sort((a, b) => a.price - b.price);

        return array
    }

    sortDown(array) {
        if (array !== undefined) array.sort((a, b) => b.price - a.price);

        return array
    }

    paginate(array) {
        const itemsPerPage = 9;
        const numberOfPages = Math.ceil(array.length / itemsPerPage)

        const newPages = Array.from({ length: numberOfPages }, (_, index) => {
            const start = index * itemsPerPage;
            let newArray = array.slice(start, start + itemsPerPage)
            return newArray
        })

        return newPages
    }
    sortPrice(price1, price2) {
        let newArray = []

        for (let j = 0; j < price2.length; j++) {
            let pr1 = price1[j];
            let pr2 = price2[j];
            let array = this.filtered.filter((items) => items.price > pr1 && items.price < pr2)
            newArray.push(...array);
        }
        return newArray
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
