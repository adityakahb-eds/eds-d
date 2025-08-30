import { $, $$, createElement } from '../../scripts/__constants.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = `<div class="video-banner-content"><video loop muted playsinline autoplay>{{video}}</video><div class="container d-flex align-items-end"><div class="row"><div class="col-12 col-md-6 col-xxl-4 mb-5 mb-md-7"><div class="video-banner-text p-6 border-rounded-lg bg-blurred">{{header}} {{description}} {{anchor}}</div></div><div class="col-12 col-md-6 col-xxl-8 position-relative mb-5 mb-md-7"><div class="d-none d-md-block video-banner-scroll position-absolute"><button class="btn btn-xl btn-icon-only btn-pill" aria-label="Scroll down"><i class="icon-gm">stat_minus_2</i></button></div></div></div></div></div>`;
// END_MARKUP_INJECTION
/* eslint-enable */
const allBlocks = $$(document, '.video-banner');
const init = () => {
    allBlocks.forEach((block) => {
        const [videoEl, titleEl, introEl, ctaEl] = Array.from(block.children);
        const videoSourceEl = createElement('source');
        videoSourceEl.setAttribute('type', 'video/mp4');
        videoSourceEl.setAttribute('src', $(videoEl, 'a').getAttribute('href'));
        const anchorPara = $(ctaEl, 'p');
        const headerBlockContent = {
            source: videoSourceEl,
            title: titleEl,
            desc: introEl,
            link: anchorPara,
        };
        block.innerHTML = markup
            .replaceAll('{{video}}', headerBlockContent.source.outerHTML)
            .replaceAll('{{header}}', headerBlockContent.title.innerHTML)
            .replaceAll('{{description}}', headerBlockContent.desc.innerHTML)
            .replaceAll('{{anchor}}', anchorPara.innerHTML);
    });
};
export default async function decorate() {
    init();
}
// new Scrollplus(document.querySelectorAll('.reveal'), {
//   screenOffset: 20,
//   animation: 'fade',
//   duration: 600,
//   animate: true,
//   trigger: true,
//   onEnter: el => {
//     console.log('Element entered:', el);
//     // Additional logic like counters, analytics, etc.
//   },
//   onLeave: el => {
//     console.log('Element left:', el);
//   }
// });

//# sourceMappingURL=video-banner.js.map
