import { $, createElement } from './__constants.js';
import { AUDIENCES, 
// buildBlock,
decorateBlocks, decorateIcons, decorateSections, decorateTemplateAndTheme, getAllMetadata, getMetadata, loadCSS, loadFooter, loadHeader, 
// loadSection,
loadSections, loadSkipToMain, pluginContext, pluginPath,
// waitForFirstImage,
 } from './aem.js';
import { decorateButtons, decorateDisplayTexts, decorateIntroAndSmallParagraphs, decorateSectionTitle, } from './decorators.js';
import decorateExternalImages from './external-image.js';
/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
// function buildHeroBlock(main) {
//   const h1 = main.querySelector('h1');
//   const picture = main.querySelector('picture');
//   // eslint-disable-next-line no-bitwise
//   if (h1 && picture && h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
//     const section = document.createElement('div');
//     section.append(buildBlock('hero', { elems: [picture, h1] }));
//     main.prepend(section);
//   }
// }
/**
 * load fonts.css and set a session storage flag
 */
// async function loadFonts() {
//   await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
//   try {
//     if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
//   } catch (e) {
//     // do nothing
//   }
// }
/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
// function buildAutoBlocks(main) {
//   try {
//     buildHeroBlock(main);
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Auto Blocking failed', error);
//   }
// }
/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
    // hopefully forward compatible button decoration
    // decorateButtons(main);
    decorateIcons(main);
    // buildAutoBlocks(main);
    decorateSections(main);
    decorateBlocks(main);
    decorateExternalImages(main);
    decorateSectionTitle(main);
}
function invokeCustomDecorators(el) {
    decorateButtons(el);
    decorateDisplayTexts(el);
    decorateIntroAndSmallParagraphs(el);
}
/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
    if (getMetadata('experiment') ||
        Object.keys(getAllMetadata('campaign')).length ||
        Object.keys(getAllMetadata('audience')).length) {
        const { loadEager: runEager } = await import(pluginPath);
        await runEager(document, { audiences: AUDIENCES }, pluginContext);
    }
    // document.documentElement.lang = 'en';
    const main = $(doc, 'main');
    if (main) {
        loadHeader($(doc, 'header'));
        loadFooter($(doc, 'footer'));
        decorateTemplateAndTheme();
        decorateMain(main);
        loadSkipToMain();
        invokeCustomDecorators(doc.body);
        document.body.classList.add('appear');
        // aditya await loadSection($(main as HTMLElement, '.section-content'), () => {}); // waitForFirstImage
    }
    try {
        /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
        // if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
        //   loadFonts();
        // }
    }
    catch (err) {
        console.error(err);
        // do nothing
    }
}
/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
    const main = $(doc, 'main');
    await loadSections(main);
    // const { hash } = window.location;
    // const element = hash ? doc.getElementById(hash.substring(1)) : false;
    // if (hash && element) element.scrollIntoView();
    loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
    // loadFonts();
    const headEl = createElement('script');
    headEl.defer = true;
    headEl.src = `${window.hlx.codeBasePath}/scripts/head.js`;
    headEl.type = 'module';
    setTimeout(() => {
        doc.head.append(headEl);
    }, 0);
    if (getMetadata('experiment') ||
        Object.keys(getAllMetadata('campaign')).length ||
        Object.keys(getAllMetadata('audience')).length) {
        const { loadLazy: runLazy } = await import(pluginPath);
        await runLazy(document, { audiences: AUDIENCES }, pluginContext);
    }
}
/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
    // window.setTimeout(() => import('./delayed.ts'), 3000);
    // load anything that can be postponed to the latest here
}
async function loadPage() {
    await loadEager(document);
    await loadLazy(document);
    loadDelayed();
}
loadPage();

//# sourceMappingURL=scripts.js.map
