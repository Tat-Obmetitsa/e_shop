
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

    sortUp() {
        if (this.filtered !== undefined) return this.filtered.sort((a, b) => a.price - b.price);
    }

    sortDown() {
        if (this.filtered !== undefined) return this.filtered.sort((a, b) => b.price - a.price);
    }

    paginate() {
        const itemsPerPage = 9;
        const numberOfPages = Math.ceil(this.filtered.length / itemsPerPage)

        const newPages = Array.from({ length: numberOfPages }, (_, index) => {
            const start = index * itemsPerPage;
            return this.filtered.slice(start, start + itemsPerPage)
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
