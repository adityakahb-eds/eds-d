import { $, $$, addClass, createElement } from '../../scripts/__constants.js';
const allBlocks = $$(document, '.banner');
let blockCount = 0;
const init = () => {
    allBlocks.forEach((block) => {
        // block.innerHTML = markup;
        const [bgEl, descEl] = $(block, ':scope > div').children;
        addClass(bgEl, 'banner-img');
        addClass(descEl, 'banner-text p-5 p-xl-7 p-xxl-8 bg-blurred d-flex justify-content-center align-items-center flex-column border-rounded-lg');
        const containerEl = createElement('div');
        addClass(containerEl, 'container');
        containerEl.innerHTML = `<div class="row align-items-center justify-content-center align-items-xl-end justify-content-xl-end">
        <div class="col-12 col-md-6 col-xxl-4">
          ${descEl.outerHTML}
        </div>
      </div>`;
        descEl.replaceWith(containerEl);
    });
};
export default async function decorate() {
    blockCount++;
    if (blockCount === allBlocks.length) {
        // addVendorFilesToDOM('scrollplus', init);
        init();
    }
}

//# sourceMappingURL=banner.js.map
