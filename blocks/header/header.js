import { $, $$, addClass, addEvent, addVendorFilesToDOM, constants, hasClass, removeClass, } from '../../scripts/__constants.js';
import { getFragmentData } from '../../scripts/fragment-loader.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = `<div class="header-content bg-blurred brand-bordered-bottom"><div class="container"><div class="row justify-content-between"><div class="col-auto order-1 order-xl-0 flex-grow-1 flex-grow-xl-0 pr-xl-0"><div class="header-logo-wrapper"><a href="{{logo-link}}" title="{{logo-title}}" class="d-inline-flex header-logo py-3 py-xl-4"><img src="{{logo-light}}" class="header-logo-light" alt="{{logo-text}}"> <img src="{{logo-dark}}" class="header-logo-dark" alt="{{logo-text}}"></a></div></div><div class="col-auto order-0 order-xl-1 flex-grow-xl-1 p-xl-0"><div class="amegmen-wrapper"><div class="amegmen"><div class="amegmen-nav-cta"><button type="button" class="btn btn-lg py-5 btn-icon-only amegmen-nav-cta-open" aria-label="{{open-menu-label}}"><div class="amegmen-nav-cta-icon">{{open-menu}}</div></button> <button type="button" class="btn btn-lg py-5 btn-lg amegmen-nav-cta-close" aria-label="{{close-menu-label}}"><div class="amegmen-nav-cta-icon">{{close-menu}}</div></button></div><div class="amegmen-nav-wrapper"><nav><ul class="amegmen-ul-0">{{nav-items}}</ul></nav></div></div></div></div><div class="col-auto order-2"><div class="header-more-wrapper d-flex justify-content-center align-items-center"><button id="site_mode" type="button" aria-label="Mode" class="mr-3 mr-xl-4 btn btn-outline-base btn-icon-only btn-pill"><span class="icon-gm icon-light-mode">light_mode</span> <span class="icon-gm icon-dark-mode">dark_mode</span></button> <button type="button" aria-label="Search" class="mr-3 mr-xl-4 btn btn-outline-primary btn-icon-only btn-pill">{{search-icon}}</button> <a href="{{user-login-link}}" aria-label="User" class="btn btn-solid-secondary btn-pill d-none d-md-inline-flex">{{user-login-cta}}</a> <a href="{{user-login-link}}" aria-label="User" class="btn btn-icon-only btn-solid-secondary btn-pill d-inline-flex d-md-none">{{user-login-icon-only}}</a></div></div></div></div></div>`;
const init = async () => {
    const thisBlock = await getFragmentData('header', `${constants.paths.experience}/header-fragment`);
    if (!thisBlock) {
        return;
    }
    const headerWrapper = document.querySelector('.header-wrapper');
    const headerEl = headerWrapper?.querySelector('.header');
    const [logoImageRow, logoAltLinkRow, searchRow, userRow1, userRow2, navRow] = $(thisBlock, '.header-c').children;
    const [lightLogo, darkLogo] = logoImageRow.children;
    const [logoAlt, logoLink] = logoAltLinkRow.children;
    const [searchIcon, searchPlaceholder] = searchRow.children;
    const [userCta] = userRow1.children;
    const [userIcon, userMenu] = userRow2.children;
    const [navIcon, navMenu] = navRow.children;
    console.log('==================================================searchPlaceholder, userMenu, navIcon', searchPlaceholder, userMenu, userIcon);
    const navMainLi = $$(navMenu.children[0], ':scope > li'); //$$(navMenu, 'ul > li');
    let navStr = '';
    navMainLi.forEach((l0Li) => {
        const anchor = $(l0Li, ':scope > a');
        const childUl = $(l0Li, ':scope > ul');
        addClass(anchor, 'amegmen-nav-item');
        childUl && addClass(anchor, 'amegmen-has-subnav');
        let subnavStr = '';
        if (childUl) {
            addClass(childUl, 'amegmen-ul-1');
            subnavStr += '<div class="amegmen-subnav"><div class="amegmen-container">';
            subnavStr += `${childUl.outerHTML}</div></div>`;
        }
        navStr += `<li><h2>${anchor.outerHTML}</h2>${subnavStr}</li>`;
    });
    headerEl.innerHTML = markup
        .replaceAll('{{logo-light}}', $(lightLogo, 'a').textContent)
        .replaceAll('{{logo-dark}}', $(darkLogo, 'a').textContent)
        .replaceAll('{{logo-text}}', $(logoAlt, 'p').textContent)
        .replaceAll('{{logo-link}}', $(logoLink, 'a').getAttribute('href'))
        .replaceAll('{{logo-title}}', $(logoLink, 'a').textContent)
        .replaceAll('{{search-icon}}', $(searchIcon, 'p').innerHTML)
        .replaceAll('{{user-login-link}}', $(userCta, 'a').getAttribute('href'))
        .replaceAll('{{user-login-cta}}', $(userCta, 'p:nth-child(2) a').innerHTML)
        .replaceAll('{{user-login-icon-only}}', $(userCta, 'p:nth-child(1) a').innerHTML)
        .replaceAll('{{open-menu}}', $(navIcon, 'p:nth-child(1)').innerHTML)
        .replaceAll('{{open-menu-label}}', $(navIcon, 'p:nth-child(2)').textContent)
        .replaceAll('{{close-menu}}', $(navIcon, 'p:nth-child(3)').innerHTML)
        .replaceAll('{{close-menu-label}}', $(navIcon, 'p:nth-child(4)').textContent)
        .replaceAll('{{nav-items}}', navStr);
    if (typeof AMegMen !== 'undefined') {
        AMegMen.create('.amegmen-wrapper');
    }
    const modeCta = $(headerEl, '#site_mode');
    addEvent(modeCta, 'click', (event) => {
        event.preventDefault();
        if (hasClass(document.body, 'light-mode')) {
            removeClass(document.body, 'light-mode');
            addClass(document.body, 'dark-mode');
        }
        else {
            addClass(document.body, 'light-mode');
            removeClass(document.body, 'dark-mode');
        }
    });
    let lastScrollY = 0; // Initialize with 0, as the page starts at the top
    const scrollHideThreshold = 48; // How many pixels to scroll down past the header's height before it hides
    const topVisibilityOffset = 16; // Header is always visible if scrollY is within this many pixels from top (e.g., 0-10px)
    addEvent(window, 'scroll', () => {
        const currentScrollY = window.scrollY;
        // --- Condition to SHOW the header ---
        // 1. If at or very near the top of the page
        // OR
        // 2. If scrolling up (regardless of how much, for immediate feedback)
        if (currentScrollY <= topVisibilityOffset || currentScrollY < lastScrollY) {
            headerEl.classList.remove('header-hidden');
        }
        // --- Condition to HIDE the header ---
        // Only hide if:
        // 1. Scrolling down
        // AND
        // 2. Scrolled past the combined height of the header plus the scrollHideThreshold
        else if (currentScrollY > lastScrollY &&
            currentScrollY > headerEl.offsetHeight + scrollHideThreshold) {
            headerEl.classList.add('header-hidden');
        }
        // Update the last scroll position for the next comparison
        lastScrollY = currentScrollY;
    });
};
export default function decorate() {
    addVendorFilesToDOM('amegmen', init);
}

//# sourceMappingURL=header.js.map
