import { $$, addClass, addVendorFilesToDOM, createElement } from '../../scripts/__constants.js';
const init = (block) => {
    let countUpEls;
    const countUpArr = [];
    const allRows = [...block.children];
    const containerEl = createElement('div');
    addClass(containerEl, 'container');
    allRows.forEach((row, index) => {
        addClass(row, 'row');
        containerEl.append(row);
        const allCols = [...row.children];
        allCols.forEach((col) => {
            addClass(col, `col-12 col-md-${12 / allCols.length}`);
            if (index === 1) {
                addClass(col, 'mt-3 mt-md-5');
            }
            row.append(col);
        });
    });
    if ($$(containerEl, 'h3:first-child').length > 0) {
        $$(containerEl, 'h3:first-child').forEach((h3El) => {
            addClass(h3El, 'mb-0');
        });
    }
    countUpEls = $$(containerEl, 'em');
    countUpEls.forEach((countUpEl) => {
        countUpArr.push({
            el: countUpEl,
            countup: new countUp.CountUp(countUpEl, parseFloat(countUpEl.textContent)),
            animated: false,
        });
    });
    countUpArr.forEach((countupObj) => {
        if (!countupObj.animated) {
            new Waypoint({
                element: countupObj.el,
                handler: function () {
                    countupObj.countup.start();
                    countupObj.animated = true;
                },
                offset: '10%',
            });
        }
    });
    block.append(containerEl);
};
export default async function decorate(block) {
    addVendorFilesToDOM('waypoints', () => {
        addVendorFilesToDOM('countup', () => {
            init(block);
        });
    });
}

//# sourceMappingURL=stats.js.map
