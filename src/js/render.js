
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

    getAll(gallery, tpl, searchQuery, array) {
        gallery.innerHTML = '';
        this.filtered = array.filter(e =>
            e.tags.includes(`${searchQuery}`)
        )
        gallery.insertAdjacentHTML('beforeend', tpl(this.filtered));
        // viewNum.textContent = `${newArray.length} items`

    }
    getCategoryAll(gallery, tpl, searchQuery) {
        gallery.innerHTML = '';
        this.filtered = this.arr.filter(e =>
            e.tags.includes(`${searchQuery}`)
        )
        gallery.insertAdjacentHTML('beforeend', tpl(this.filtered));
        // viewNum.textContent = `${newArray.length} items`

    }
    getSearch(gallery, tpl, query) {
        gallery.innerHTML = '';
        this.filtered = this.arr.filter(e =>
            e.tags.includes(`${query}`)
        )
        gallery.insertAdjacentHTML('beforeend', tpl(this.filtered));
        // viewNum.textContent = `${newArray.length} items`
    }

    sortUp() {
        if (this.filtered !== undefined) return this.filtered.sort((a, b) => a.price - b.price);
    }
    sortDown() {
        if (this.filtered !== undefined) return this.filtered.sort((a, b) => b.price - a.price);
    }

    paginate() {
        const itemsPerPage = 9;
        console.log(this.arr)
        const numberOfPages = Math.ceil(this.arr.length / itemsPerPage)

        const newPages = Array.from({ length: numberOfPages }, (_, index) => {
            const start = index * itemsPerPage;
            return this.arr.slice(start, start + itemsPerPage)
        })
        return newPages
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
