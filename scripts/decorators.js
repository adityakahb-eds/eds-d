import { $, $$, addClass, createElement } from './__constants.js';
const decorateButtons = (block) => {
    const btnPattern = /\[--button--\](.*?)\[\/--button--\]/gs;
    const stylePattern = /\{--(.*?)--\}/s;
    const btnProps = {
        style: 'solid-primary',
        size: 'regular',
        shape: 'normal',
    };
    block.innerHTML = block.innerHTML.replace(btnPattern, (match, content) => {
        const innerMatch = content.match(stylePattern) || [];
        let props = [];
        if (innerMatch[1]) {
            props = innerMatch[1].split(';');
            btnProps.style = `${props[2] || 'solid'}-${props[0] || 'primary'}`;
            btnProps.size = props[1] || 'regular';
            btnProps.shape = props[3] || 'normal';
        }
        const manipulatedContent = content.trim();
        const tempEl = createElement('div');
        tempEl.innerHTML = manipulatedContent;
        const clonedEl = $(tempEl, 'a')?.cloneNode(true);
        if (clonedEl) {
            const foundTextNode = Array.from(clonedEl.childNodes).find((node) => node.nodeType === 3);
            clonedEl.className = `btn btn-${btnProps.style}`;
            if (btnProps.size === 'small') {
                clonedEl.classList.add('btn-sm');
            }
            if (btnProps.size === 'large') {
                clonedEl.classList.add('btn-lg');
            }
            if (btnProps.size === 'xlarge') {
                clonedEl.classList.add('btn-xl');
            }
            if (btnProps.size !== 'normal') {
                clonedEl.classList.add(`btn-${btnProps.shape}`);
            }
            if (foundTextNode) {
                foundTextNode.textContent = foundTextNode.textContent.trim();
                const spanEl = createElement('span');
                foundTextNode.parentNode.insertBefore(spanEl, foundTextNode);
                spanEl.append(foundTextNode);
            }
            else {
                clonedEl.classList.add('btn-icon-only');
            }
            return clonedEl.outerHTML;
        }
    });
};
const decorateDisplayTexts = (block) => {
    const pEls = $$(block, 'p, h1, h2, h3, h4, h5, h6');
    const d1pattern = /\[--display1--\](.*?)\[\/--display1--\]/gs;
    const d2pattern = /\[--display2--\](.*?)\[\/--display2--\]/gs;
    const d3pattern = /\[--display3--\](.*?)\[\/--display3--\]/gs;
    const d4pattern = /\[--display4--\](.*?)\[\/--display4--\]/gs;
    pEls.forEach((pEl) => {
        pEl.innerHTML = pEl.innerHTML.replace(d1pattern, (ignore, content) => {
            pEl.classList.add('display-1');
            return content;
        });
        pEl.innerHTML = pEl.innerHTML.replace(d2pattern, (ignore, content) => {
            pEl.classList.add('display-2');
            return content;
        });
        pEl.innerHTML = pEl.innerHTML.replace(d3pattern, (ignore, content) => {
            pEl.classList.add('display-3');
            return content;
        });
        pEl.innerHTML = pEl.innerHTML.replace(d4pattern, (ignore, content) => {
            pEl.classList.add('display-4');
            return content;
        });
    });
};
const decorateIntroAndSmallParagraphs = (block) => {
    const pEls = $$(block, 'p');
    const pattern = /\[--intro--\](.*?)\[\/--intro--\]/gs;
    pEls.forEach((pEl) => {
        pEl.innerHTML = pEl.innerHTML.replace(pattern, (ignore, content) => {
            addClass(pEl, 'intro');
            return content;
        });
    });
    const patternSmall = /\[--small--\](.*?)\[\/--small--\]/gs;
    pEls.forEach((pEl) => {
        pEl.innerHTML = pEl.innerHTML.replace(patternSmall, (ignore, content) => {
            const smallEl = createElement('small');
            smallEl.innerHTML = content;
            return smallEl.outerHTML;
        });
    });
};
const decorateSectionTitle = (block) => {
    const pEls = $$(block, 'h1, h2, h3, h4, h5, h6');
    const pattern = /\[--section-title--\](.*?)\[\/--section-title--\]/gs;
    pEls.forEach((pEl) => {
        pEl.innerHTML = pEl.innerHTML.replace(pattern, (ignore, content) => {
            addClass(pEl, 'section-title');
            // const divEl = createElement('div');
            // divEl.innerHTML = content;
            // pEl.id = content;
            // return divEl.outerHTML;
            return content;
        });
    });
};
const decoratorInit = (block) => {
    decorateButtons(block);
    decorateDisplayTexts(block);
    decorateIntroAndSmallParagraphs(block);
    decorateSectionTitle(block);
};
export { decoratorInit, decorateButtons, decorateDisplayTexts, decorateIntroAndSmallParagraphs, decorateSectionTitle, };

//# sourceMappingURL=decorators.js.map
