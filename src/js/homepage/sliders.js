// homepage sliders
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