import { getItems } from '../utils';
const items = document.querySelectorAll(".list__gallery-img");


function renderManufacturers(array) {
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        let manufacturerBtn = document.createElement('button');
        manufacturerBtn.classList.add('filter-manufacturer', 'button');
        manufacturerBtn.value = e
        manufacturerBtn.textContent = e
        document.querySelector(".list__view-sort_manufacturer").appendChild(manufacturerBtn)
    }
}
// pagination btns

function displayButtons(container, page, activeIndex) {
    let btns = page.map((_, pageIndex) => {
        return `<button class="page-btn button ${activeIndex === pageIndex ? 'active-btn' : 'null '
            }" data-index="${pageIndex}">
                        ${pageIndex + 1}
                        </button>`

    })
    btns.push(`<button class="next-btn button">&#10095;</button>`)
    btns.unshift(`<button class="prev-btn button">&#10094;</button>`)
    container.innerHTML = btns.join('')
    getItems(items)
}


// burger menu appearing click

(() => {
    const menuBtnRef = document.querySelector("[data-menu-button]");
    const mobileMenuRef = document.querySelector("[data-menu]");

    menuBtnRef.addEventListener("click", () => {
        const expanded =
            menuBtnRef.getAttribute("aria-expanded") === "true" || false;

        menuBtnRef.classList.toggle("is-open");
        menuBtnRef.setAttribute("aria-expanded", !expanded);

        mobileMenuRef.classList.toggle("is-open");
    });
})();

export default { renderManufacturers, displayButtons }