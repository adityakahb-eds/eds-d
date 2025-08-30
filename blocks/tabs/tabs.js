import { $, addClass, addEvent, createElement, generateUniqueId, hasClass, removeClass, wrapElements, } from '../../scripts/__constants.js';
const init = (block) => {
    const parent = block.closest('.tabs-section');
    const tabArr = [];
    if (parent.getAttribute('data-containerize') === 'true') {
        addClass(block.closest('.tabs-wrapper'), 'container');
        wrapElements([block], {
            className: 'col-12',
        });
        wrapElements([block.closest('.col-12')], {
            className: 'row',
        });
    }
    const tabItems = Array.from(block.children);
    let selectedTab = 0;
    let isOpenSelected = false;
    const tabListParent = createElement('div');
    tabListParent.setAttribute('role', 'tablist');
    addClass(tabListParent, 'tabs-toggles');
    block.parentNode.insertBefore(tabListParent, block);
    tabItems.forEach((tabItem, index) => {
        const [, , tabToggle] = Array.from(tabItem.children);
        const isOpen = ($(tabToggle, 'p')?.textContent || '') === 'open';
        if (!isOpenSelected && isOpen) {
            selectedTab = index;
            isOpenSelected = true;
        }
    });
    tabItems.forEach((tabItem, index) => {
        addClass(tabItem, 'tabs-item');
        const [tabHeader, tabBody, tabToggle] = Array.from(tabItem.children);
        const uniqueId = generateUniqueId('tab_button_');
        const uniqueItemId = generateUniqueId('tab_item_');
        const headerBtn = createElement('button');
        headerBtn.innerHTML = tabHeader.innerHTML;
        addClass(headerBtn, 'tabs-button');
        tabListParent.appendChild(headerBtn);
        addClass(tabHeader, 'tabs-header');
        addClass(tabBody, 'tabs-body');
        addClass(tabToggle, 'tabs-toggle');
        headerBtn.id = uniqueId;
        headerBtn.setAttribute('role', 'tab');
        headerBtn.setAttribute('aria-controls', uniqueItemId);
        tabItem.setAttribute('aria-describedby', uniqueId);
        tabItem.setAttribute('role', 'tabpanel');
        if (index === selectedTab) {
            addClass(tabItem, 'tabs-item-active');
            addClass(headerBtn, 'tabs-button-active');
            tabItem.setAttribute('tabindex', '0');
            headerBtn.setAttribute('aria-selected', 'true');
        }
        else {
            tabItem.setAttribute('tabindex', '-1');
            headerBtn.setAttribute('aria-selected', 'false');
        }
        const obj = {
            tab: headerBtn,
            content: tabItem,
            count: index,
        };
        tabArr.push(obj);
        addEvent(obj.tab, 'click', (event) => {
            event.preventDefault();
            tabArr.forEach((tabObj, index2) => {
                if (obj.count === index2) {
                    if (!hasClass(tabObj.tab, 'tabs-button-active')) {
                        addClass(tabObj.tab, 'tabs-button-active');
                        addClass(tabObj.content, 'tabs-item-active');
                        tabObj.content.setAttribute('tabindex', '0');
                        tabObj.tab.setAttribute('aria-selected', 'true');
                    }
                }
                else {
                    removeClass(tabObj.tab, 'tabs-button-active');
                    removeClass(tabObj.content, 'tabs-item-active');
                    tabObj.content.setAttribute('tabindex', '-1');
                    tabObj.tab.setAttribute('aria-selected', 'false');
                }
            });
        });
    });
};
export default async function decorate(block) {
    init(block);
}

//# sourceMappingURL=tabs.js.map
