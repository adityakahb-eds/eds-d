import { $, constants } from '../../scripts/__constants.js';
import { getFragmentData } from '../../scripts/fragment-loader.js';
export default async function decorate() {
    const thisBlock = await getFragmentData('skiptomain', `${constants.paths.content}/skiptomain-fragment`);
    const anchor = $(thisBlock, 'a');
    if (anchor) {
        anchor.className = 'skiptomain';
        document.body.insertBefore(anchor, document.body.firstChild);
    }
}

//# sourceMappingURL=skiptomain.js.map
