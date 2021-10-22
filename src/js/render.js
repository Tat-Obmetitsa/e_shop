
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
    getHomeRating(gallery, tpl, amount) {
        gallery.innerHTML = '';
        this.filtered = this.arr.filter(e => Number(e.star) >= 3)
        gallery.insertAdjacentHTML('beforeend', tpl(this.filtered.slice(0, amount)));
        return this.filtered
    }

    getCategoryAll(gallery, tpl, array) {
        gallery.innerHTML = '';
        gallery.insertAdjacentHTML('beforeend', tpl(array));
    }

    getFiltered(searchQuery, str) {
        if (searchQuery !== undefined) {
            this.filtered = this.arr.filter(e =>
                e.tags.includes(`${searchQuery}`)
            )
        } else if (str !== undefined) { this.filtered = this.arr.filter(e => e.manufacturer == str) }


        return this.filtered
    }
    getFilterRating(star) {
        let newArray = []
        for (let j = 0; j < star.length; j++) {
            let pr1 = star[j];
            let array = this.filtered.filter((items) => items.star == pr1)
            newArray.push(...array);
        }
        return newArray

    }
    getManufacturer(str) {
        this.filtered = this.arr.filter(e => e.manufacturer == str)
        return this.filtered
    }
    getById(id) {
        return this.arr.find(el => el.id == id);
    }
    getByIdReviws(id) {
        let array = this.arr.find(el => el.id == id);
        return [...array.reviews]
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
            let array = this.filtered.filter((items) => items.price >= pr1 && items.price <= pr2)
            newArray.push(...array);
        }
        return newArray
    }
    getFilteredManufacturer() {
        let array = []
        this.filtered = this.arr.forEach(e =>
            array.push(e.manufacturer)
        )
        let result = array.reduce(function (acc, el) {

            acc[el] = (acc[el] || 0) + 1;
            array = []
            return acc;
        }, {});
        for (const key in result) {
            if (Object.hasOwnProperty.call(result, key)) {
                const element = result[key];
                if (element > 4) { array.push(key) }

            }
        }
        return array
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
