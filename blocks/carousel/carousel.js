import { $$, addClass, addVendorFilesToDOM, generateUniqueId, hasClass, wrapElements, } from '../../scripts/__constants.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = `<div class="container"><div class="row"><div class="col-12 col-md-10 offset-md-1 col-xxl-8 offset-xxl-2"><div class="swiper overflow-visible" id="{{carousel-id}}"><div class="swiper-wrapper">{{carousel-slides}}</div><div class="swiper-controls d-flex py-4 py-md-0 justify-content-between align-items-center"><button type="button" class="position-static m-0 order-2 swiper-button-next position-md-absolute btn btn-solid-primary btn-pill btn-icon-only" aria-label="Go to next image"><span class="icon-gm">arrow_forward_ios</span></button> <button type="button" class="position-static m-0 order-0 swiper-button-prev position-md-absolute btn btn-solid-primary btn-pill btn-icon-only" aria-label="Go to previous image"><span class="icon-gm">arrow_back_ios_new</span></button><div class="swiper-pagination position-static position-md-absolute order-1 d-md-flex justify-content-center align-items-center"></div><div class="autoplay-progress"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"></circle></svg> <span></span></div></div></div></div></div></div>`;
const init = (block) => {
    const allSlides = $$(block, ':scope > div');
    const carouselParent = block.closest('.carousel-section');
    let allSlidesStr = '';
    const swiperId = generateUniqueId('swiper');
    if (hasClass(block, 'carousel-image')) {
        addClass(carouselParent, 'carousel-image');
    }
    wrapElements([carouselParent], {
        className: 'container-max overflow-hidden',
    });
    allSlides.forEach((slide, index) => {
        addClass(slide, 'swiper-slide');
        index !== 0 && (allSlidesStr += slide.outerHTML);
    });
    carouselParent.innerHTML = markup
        .replace('{{carousel-slides}}', allSlidesStr)
        .replace('{{carousel-id}}', swiperId);
    if (Swiper) {
        new Swiper(`#${swiperId}`, {
            slidesPerView: 1.024,
            loop: true,
            centeredSlides: true,
            // autoplay: {
            //   delay: 4000,
            //   disableOnInteraction: false,
            // },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });
    }
};
export default async function decorate(block) {
    addVendorFilesToDOM('carousel', () => {
        init(block);
    });
}

//# sourceMappingURL=carousel.js.map
