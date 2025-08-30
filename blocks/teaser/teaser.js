// import { $, addVendorFilesToDOM } from '../../scripts/__constants.js';
import { $, addClass, hasClass, wrapElements } from '../../scripts/__constants.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = ``;
const TEASER_CONFIGS = {
    'teaser-image-left': {
        imgOrdCls: ['order-0', 'teaser-image'],
        txtOrdCls: ['order-1', 'teaser-desc', 'd-flex', 'justify-content-start'],
        txtPadCls: ['px-5', 'py-5', 'px-md-5', 'py-md-9', 'px-xl-7'],
        txtIdx: 1, // Text is the second child
        imgIdx: 0, // Image is the first child
    },
    'teaser-image-block-left': {
        bCls: ['container'],
        bpCls: ['row'],
        imgOrdCls: ['col-12', 'col-md-6', 'py-5', 'py-md-9', 'order-0', 'teaser-image'],
        txtOrdCls: ['col-12', 'col-md-6', 'order-1', 'teaser-desc', 'd-flex', 'justify-content-start'],
        txtPadCls: ['py-5', 'py-md-9'],
        txtIdx: 1, // Text is the second child
        imgIdx: 0, // Image is the first child
    },
    'teaser-image-right': {
        imgOrdCls: ['order-0', 'order-md-1', 'teaser-image'],
        txtOrdCls: ['order-1', 'order-md-0', 'teaser-desc', 'd-flex', 'justify-content-end'],
        txtPadCls: ['px-5', 'py-5', 'px-md-5', 'py-md-9', 'px-xl-7'],
        txtIdx: 0, // Text is the first child
        imgIdx: 1, // Image is the second child
    },
    'teaser-image-block-right': {
        bCls: ['container'],
        bpCls: ['row'],
        imgOrdCls: ['col-12', 'col-md-6', 'py-5', 'py-md-9', 'order-0', 'order-md-1', 'teaser-image'],
        txtOrdCls: ['col-12', 'col-md-6', 'order-1', 'teaser-desc', 'd-flex', 'justify-content-start'],
        txtPadCls: ['py-5', 'py-md-9'],
        txtIdx: 0, // Text is the first child
        imgIdx: 1, // Image is the second child
    },
    'teaser-image-background': {
        imgOrdCls: ['order-0', 'teaser-image'],
        txtPadCls: ['col-12', 'px-5', 'py-5', 'px-md-7', 'py-md-9'],
        txtIdx: 1, // Text is the second child
        imgIdx: 0, // Image is the first child
        // Custom wrapping logic for this specific teaser type
        cWrap: (blockTextEl) => {
            const row = wrapElements([blockTextEl], { className: 'row' });
            const container = wrapElements([row], { className: 'container' });
            wrapElements([container], { className: 'order-1 teaser-desc' });
        },
    },
};
const init = (block) => {
    const blockParent = $(block, ':scope > div');
    addClass(blockParent, 'd-flex flex-column flex-md-row');
    for (const className in TEASER_CONFIGS) {
        if (hasClass(block, className)) {
            const config = TEASER_CONFIGS[className]; // Get the specific configuration for this block type.
            if (config.bCls) {
                addClass(block, config.bCls.join(' '));
            }
            if (config.bpCls) {
                addClass(blockParent, config.bpCls.join(' '));
            }
            const blockImgEl = blockParent.children[config.imgIdx];
            const blockTextEl = blockParent.children[config.txtIdx];
            addClass(blockImgEl, config.imgOrdCls.join(' '));
            addClass(blockTextEl, config.txtPadCls.join(' '));
            config.cWrap
                ? config.cWrap(blockTextEl)
                : wrapElements([blockTextEl], { className: config.txtOrdCls.join(' ') });
            break;
        }
    }
};
export default async function decorate(block) {
    init(block);
}

//# sourceMappingURL=teaser.js.map
