// START_MARKUP_INJECTION
import { $, addClass, stringTrim } from '../../scripts/__constants.js';
// END_MARKUP_INJECTION
export default function decorate(block) {
    addClass(block, 'row m-0 w-12');
    const [alertIcon, alertDesc] = block.children;
    if (stringTrim($(alertIcon, 'p')?.textContent).length > 0) {
        addClass(block, 'alert-has-icon');
        addClass(alertIcon, 'col-auto');
        addClass($(alertIcon, ':scope > div'), 'py-3 py-md-5');
    }
    else {
        alertIcon.remove();
    }
    addClass(alertDesc, 'col pr-3 pr-xl-5');
    addClass($(alertDesc, ':scope > div'), 'py-3 py-md-5');
}

//# sourceMappingURL=alert.js.map
