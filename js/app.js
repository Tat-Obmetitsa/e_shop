// import './smth'
import '../scss/main.scss'
import './gallery'
import 'slick-carousel';
$('.slick').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
    lazyLoad: 'progressive',
    mobileFirst: true,
    // responsive: [{

    //     breakpoint: 1024,
    //     settings: {
    //         slidesToShow: 1,
    //         infinite: true
    //     }

    // }, {

    //     breakpoint: 600,
    //     settings: {
    //         slidesToShow: 3,
    //         dots: true
    //     }

    // }, {

    //     breakpoint: 300,
    //     settings: "unslick" // destroys slick

    // }]
});

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

