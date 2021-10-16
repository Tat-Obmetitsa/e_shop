
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



    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
