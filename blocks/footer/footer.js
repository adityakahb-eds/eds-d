import { $, $$, addClass, addEvent, constants } from '../../scripts/__constants.js';
import { decoratorInit } from '../../scripts/decorators.js';
import { getFragmentData } from '../../scripts/fragment-loader.js';
/* eslint-disable */
// START_MARKUP_INJECTION
let markup = `<div class="container"><div class="position-relative"><div class="footer-go-to-top d-none d-md-block position-absolute"><button id="go_to_top_cta" class="btn btn-solid-base btn-xl btn-icon-only btn-pill" title="{{go-to-top}}"><i class="icon-gm">stat_3</i></button></div></div></div><div class="{{footer-mode}} bg-gray-2 brand-bordered-top"><div class="container"><div class="pt-8 pt-md-10"><nav class="footer-nav" aria-label="Footer Navigation"><div class="row"><div class="col-2"><div class="footer-logo-wrapper"><a href="{{logo-link}}" title="{{logo-title}}" class="d-inline-flex footer-logo"><img src="{{logo-dark}}" class="footer-logo-light" alt="{{logo-text}}"> <img src="{{logo-light}}" class="footer-logo-dark" alt="{{logo-text}}"></a></div></div><div class="col-10 d-flex justify-content-end align-items-center">{{link-newsletter}}</div></div><div class="row py-7 py-md-9"><div class="col-12 col-md-6 col-xl-3 mb-7 mb-xl-0">{{footer-col-1-header}} {{footer-col-1-list}}</div><div class="col-12 col-md-6 col-xl-3 mb-7 mb-xl-0">{{footer-col-2-header}} {{footer-col-2-list}}</div><div class="col-12 col-md-6 col-xl-3 mb-7 mb-xl-0">{{footer-col-3-header}} {{footer-col-3-list}}</div><div class="col-12 col-md-6 col-xl-3 mb-7 mb-xl-0">{{footer-col-4-header}} {{footer-col-4-list}}</div></div></nav></div></div></div><div class="bg-gray-1 py-5"><div class="container"><div class="row"><div class="col-12 d-flex justify-content-center social-links">{{social-links}}</div></div></div></div><div class="container"><div class="row"><div class="col-12 d-flex justify-content-center py-5">{{footer-copyright-text}}</div></div></div>`;
// END_MARKUP_INJECTION
/* eslint-enable */
export default async function decorate() {
    const thisBlock = await getFragmentData('footer', `${constants.paths.experience}/footer-fragment`);
    if (!thisBlock) {
        return;
    }
    const footerComponent = $(thisBlock, '.footer-c');
    const [logoImageRow, logoAltLinkRow, newsletterRow, footerLinks1Row, footerLinks2Row, footerLinks3Row, footerLinks4Row, socialAndMoreRow,] = Array.from(footerComponent.children);
    const [darkLogo, lightLogo] = Array.from(logoImageRow.children);
    const [logoAlt, logoLink] = logoAltLinkRow.children;
    const [newsletterLink, backToTopText] = Array.from(newsletterRow.children);
    const [socialLinks, copyrightText] = Array.from(socialAndMoreRow.children);
    const [footerRow1Header, footerRow1List] = Array.from(footerLinks1Row.children);
    const [footerRow2Header, footerRow2List] = Array.from(footerLinks2Row.children);
    const [footerRow3Header, footerRow3List] = Array.from(footerLinks3Row.children);
    const [footerRow4Header, footerRow4List] = Array.from(footerLinks4Row.children);
    const footerEl = $(document, '.footer-wrapper .footer');
    footerEl.innerHTML = markup
        .replaceAll('{{logo-light}}', $(lightLogo, 'p')?.textContent)
        .replaceAll('{{logo-dark}}', $(darkLogo, 'p')?.textContent)
        .replaceAll('{{logo-text}}', $(logoAlt, 'p').textContent)
        .replaceAll('{{logo-link}}', $(logoLink, 'a').getAttribute('href'))
        .replaceAll('{{logo-title}}', $(logoLink, 'a').textContent)
        .replaceAll('{{link-newsletter}}', $(newsletterLink, 'p').innerHTML)
        .replaceAll('{{go-to-top}}', $(backToTopText, 'p').textContent)
        .replaceAll('{{footer-copyright-text}}', $(copyrightText, 'p').outerHTML)
        .replaceAll('{{social-links}}', $(socialLinks, 'ul').outerHTML)
        .replaceAll('{{footer-year}}', `${new Date().getFullYear()}`)
        .replaceAll('{{footer-col-1-header}}', footerRow1Header.innerHTML)
        .replaceAll('{{footer-col-2-header}}', footerRow2Header.innerHTML)
        .replaceAll('{{footer-col-3-header}}', footerRow3Header.innerHTML)
        .replaceAll('{{footer-col-4-header}}', footerRow4Header.innerHTML)
        .replaceAll('{{footer-col-1-list}}', footerRow1List.innerHTML)
        .replaceAll('{{footer-col-2-list}}', footerRow2List.innerHTML)
        .replaceAll('{{footer-col-3-list}}', footerRow3List.innerHTML)
        .replaceAll('{{footer-col-4-list}}', footerRow4List.innerHTML);
    await decoratorInit(footerEl);
    const socialUl = $(footerEl, '.social-links ul');
    const socialLi = $$(footerEl, '.social-links li');
    addClass(socialUl, 'd-flex m-0 p-0 list-unstyled');
    socialLi.forEach((liItem) => {
        addClass(liItem, 'mx-2 my-0');
    });
    const h2Els = $$(footerEl, 'h2');
    const h2Lists = $$(footerEl, '.col-xl-3 ul');
    h2Els.forEach((h2El) => {
        addClass(h2El, 'h5');
    });
    h2Lists.forEach((h2List) => {
        addClass(h2List, 'list-unstyled m-0 p-0');
    });
    const goToTopCta = $(footerEl, '#go_to_top_cta');
    addEvent(goToTopCta, 'click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

//# sourceMappingURL=footer.js.map
