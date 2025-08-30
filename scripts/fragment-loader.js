import { getMetadata } from './aem.js';
import { loadFragment } from '../blocks/fragment/fragment.js';
import config from '../env/default.js';
import { createElement } from './__constants.js';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const induceDelay = async (milliseconds) => {
    await delay(milliseconds);
};
const getFragmentData = async (blockName, blockPath) => {
    const tempEl = createElement('div');
    let blockStr;
    if (config.cookieUsage) {
        const cookies = new URLSearchParams(document.cookie.replaceAll('&', '%26').replaceAll('; ', '&'));
        blockStr = cookies.get(blockName);
    }
    if (!blockStr) {
        const meta = getMetadata(blockPath);
        const path = meta ? new URL(meta, window.location).pathname : blockPath;
        const fragment = await loadFragment(`/${window.sessionStorage.getItem('sitelang')}${path}`);
        blockStr = fragment.innerHTML.replace(/(\r\n|\n|\r)/gm, '');
    }
    if (config.cookieUsage) {
        document.cookie = `${blockName}=${blockStr}; Secure`;
    }
    tempEl.innerHTML = blockStr;
    return tempEl;
};
export { induceDelay, getFragmentData };

//# sourceMappingURL=fragment-loader.js.map
