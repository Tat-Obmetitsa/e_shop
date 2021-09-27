import '../../scss/main.scss'
import 'slick-carousel';


$('.slick').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    lazyLoad: 'progressive',
    mobileFirst: true,
    slidesToShow: 1,
    infinite: true,
    responsive: [{

        breakpoint: 1200,
        settings: {
            arrows: true,
            dots: true,
        }

    }]
});

$('.slider').slick({
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    lazyLoad: 'progressive',
    mobileFirst: true,
    responsive: [{
        breakpoint: 765,
        settings: {
            slidesToShow: 2,
        },

        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            arrows: true,
        }
    }]

});


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
                console.log(searchBtn)
            });

        })

    })

})();