import { $, addClass, addEvent, createElement, generateUniqueId, hasClass, removeClass, slideDown, slideUp, wrapElements, } from '../../scripts/__constants.js';
const init = (block) => {
    const parent = block.closest('.accordion-section');
    if (parent.getAttribute('data-containerize') === 'true') {
        addClass(block.closest('.accordion-wrapper'), 'container');
        wrapElements([block], {
            className: 'col-12',
        });
        wrapElements([block.closest('.col-12')], {
            className: 'row',
        });
    }
    const accordionItems = Array.from(block.children);
    accordionItems.forEach((accordionItem) => {
        addClass(accordionItem, 'accordion-item');
        const [accordionHeader, accordionBody, accordionToggle] = Array.from(accordionItem.children);
        const uniqueId = generateUniqueId('accordion_item_');
        const headerElement = $(accordionHeader, 'h2, h3, h4, h5, h6');
        const headerBtn = createElement('button');
        const isOpen = ($(accordionToggle, 'p')?.textContent || '') === 'open';
        addClass(accordionBody, 'accordion-collapse');
        addClass(accordionToggle, 'accordion-toggle');
        accordionBody.setAttribute('id', uniqueId);
        accordionToggle.setAttribute('aria-hidden', 'true');
        headerBtn.setAttribute('type', 'button');
        headerBtn.innerHTML = `${headerElement.innerHTML}<span class="icon-gm accordion-icon-open">add</span>
      <span class="icon-gm accordion-icon-close">remove</span>`;
        addClass(headerBtn, 'accordion-button');
        headerBtn.setAttribute('aria-expanded', 'false');
        headerBtn.setAttribute('aria-controls', uniqueId);
        if (isOpen) {
            headerBtn.setAttribute('aria-expanded', 'true');
            addClass(accordionBody, 'accordion-collapse-active');
            addClass(accordionItem, 'accordion-item-active');
            accordionBody.style.display = 'block';
        }
        addEvent(headerBtn, 'click', () => {
            if (hasClass(accordionBody, 'accordion-collapse-active')) {
                slideUp(accordionBody);
                headerBtn.setAttribute('aria-expanded', 'false');
                removeClass(accordionBody, 'accordion-collapse-active');
                removeClass(accordionItem, 'accordion-item-active');
            }
            else {
                slideDown(accordionBody);
                headerBtn.setAttribute('aria-expanded', 'true');
                addClass(accordionBody, 'accordion-collapse-active');
                addClass(accordionItem, 'accordion-item-active');
            }
        });
        headerElement.innerHTML = '';
        headerElement.appendChild(headerBtn);
        addClass(headerElement, 'accordion-header');
    });
};
export default async function decorate(block) {
    init(block);
}

//# sourceMappingURL=accordion.js.map
