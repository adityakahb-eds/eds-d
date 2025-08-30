// import { $, addVendorFilesToDOM } from '../../scripts/__constants.js';
import { $, $$, addClass, addEvent, hasClass, setEqualizeHeights, stringTrim, wrapElements, } from '../../scripts/__constants.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = ``;
// END_MARKUP_INJECTION
/* eslint-enable */
const init = (block) => {
    const cardWrappers = $$(block, ':scope > div');
    if (hasClass(block, 'card-1-col card-2-col card-3-col card-4-col')) {
        addClass(block, 'row');
        wrapElements([block], {
            className: 'container',
        });
    }
    cardWrappers.forEach((cardWrapper, index) => {
        addClass(cardWrapper, 'card-wrap d-flex flex-column justify-content-between');
        let colCss = '';
        let themeClasses = '';
        colCss = hasClass(block, 'card-4-col') ? 'col-md-6 col-xl-3' : '';
        colCss = hasClass(block, 'card-3-col') ? 'col-md-4' : colCss;
        if (hasClass(block, 'row')) {
            wrapElements([cardWrapper], {
                className: `mb-5 mb-xl-7 col-12 ${colCss}`,
            });
        }
        const [cardHeader, cardImg, cardBody, cardCta, cardFooter, cardTheme] = cardWrapper.children;
        stringTrim(cardHeader.textContent || '').length === 0
            ? cardHeader.remove()
            : addClass(cardHeader, 'card-header');
        stringTrim(cardBody.textContent || '').length === 0
            ? cardBody.remove()
            : addClass(cardBody, 'card-body');
        !$(cardImg, 'img') ? cardImg.remove() : addClass(cardImg, 'card-img');
        stringTrim(cardCta.textContent || '').length === 0
            ? cardCta.remove()
            : addClass(cardCta, 'card-cta');
        stringTrim(cardFooter.textContent || '').length === 0
            ? cardFooter.remove()
            : addClass(cardFooter, 'card-footer');
        // stringTrim(cardTheme.textContent || '').length === 0
        //   ? cardTheme.remove()
        //   : addClass(cardFooter, 'card-footer');
        if (stringTrim(cardTheme.textContent || '').length > 0) {
            themeClasses = stringTrim(cardTheme.textContent || '')
                .split(',')
                .join(' ')
                .toLocaleLowerCase();
            addClass(cardWrapper, themeClasses);
        }
        cardTheme.remove();
        if (index === cardWrappers.length - 1) {
            setTimeout(() => {
                setEqualizeHeights($$(block, '.card-body'));
                addEvent(window, 'resize', () => {
                    setEqualizeHeights($$(block, '.card-body'));
                });
            }, 10);
        }
    });
};
export default async function decorate(block) {
    init(block);
}

//# sourceMappingURL=card.js.map
