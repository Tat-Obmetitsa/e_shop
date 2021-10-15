


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

// input appearing click

(() => {
    const searchBtn = document.querySelectorAll('.search');
    const input = document.querySelectorAll('.header__wrapper-input')
    searchBtn.forEach(e => {
        e.addEventListener('click', () => {
            input.forEach(e => {
                e.classList.toggle('hidden')
            });

        })

    })


    function onSearch(evt) {
        evt.preventDefault();

        picsApiService.query = evt.currentTarget.elements.query.value;
        clearPicsGallery();
        if (picsApiService.query === '') {
            loadMoreBtn.hide();
            return alert({
                text: 'Try again :)',
            });
        }

        loadMoreBtn.show();
        picsApiService.resetPage();
        clearPicsGallery();
        getPics();
    }

})();