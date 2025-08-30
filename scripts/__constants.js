let uniqueNumber = 0;
const constants = {
    paths: {
        content: '/__content_fragments',
        experience: '/__experience_fragments',
    },
    ignoredBlocks: ['header-c', 'footer-c'],
    windowUrlDetails: new URL(window.location.href),
};
const $$ = (parentEl, selector) => Array.from(parentEl.querySelectorAll(selector));
const $ = (parentEl, selector) => $$(parentEl, selector)[0];
/* SLIDE UP */
const slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.boxSizing = 'border-box';
    target.style.height = `${target.offsetHeight}px`;
    target && target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};
/* SLIDE DOWN */
const slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') {
        display = 'block';
    }
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target && target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};
const stringTrim = (str) => str.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
const createElement = (elementTag) => document.createElement(elementTag);
const hasClass = (element, cls) => stringTrim(cls)
    .split(' ')
    .some((classStr) => element.classList.contains(classStr));
const addClass = (element, cls) => {
    cls.split(' ').forEach((classStr) => {
        element.classList.add(classStr);
    });
};
const removeClass = (element, cls) => {
    cls.split(' ').forEach((classStr) => {
        element.classList.remove(classStr);
    });
};
const toggleClass = (element, cls) => {
    hasClass(element, cls) ? removeClass(element, cls) : addClass(element, cls);
};
const wrapElements = (elements, options = {}) => {
    if (!elements || elements.length === 0) {
        return null;
    }
    const wrapper = createElement('div');
    if (options.className) {
        wrapper.className = options.className;
    }
    if (options.id) {
        wrapper.id = options.id;
    }
    const first = elements[0];
    const parent = first.parentNode;
    // Insert wrapper before the first element
    parent.insertBefore(wrapper, first);
    // Move each element into the wrapper
    elements.forEach((el) => wrapper.appendChild(el));
    return wrapper;
};
const addVendorFilesToDOM = (pluginName, callback) => {
    // let cssCount = 0;
    let jsCount = 0;
    if (window.vendors) {
        const vendorObj = window.vendors.find((obj) => pluginName === obj.name);
        if (!vendorObj.cssLoaded) {
            const cssArr = vendorObj.css || [];
            cssArr.forEach((cssObj) => {
                const linkEl = createElement('link');
                linkEl.href = cssObj.url;
                linkEl.media = cssObj.media;
                linkEl.rel = 'stylesheet';
                document.head.appendChild(linkEl);
            });
            vendorObj.cssLoaded = true;
        }
        if (vendorObj.jsLoaded) {
            callback && callback();
        }
        else {
            const jsArr = vendorObj.js || [];
            jsArr.forEach((jsObj) => {
                const scriptEl = createElement('script');
                scriptEl.src = jsObj.url;
                if (jsObj.module) {
                    scriptEl.type = 'module';
                }
                scriptEl.onload = () => {
                    jsCount++;
                    if (jsCount === jsArr.length) {
                        callback && callback();
                    }
                };
                jsObj.defer && scriptEl.setAttribute('defer', 'defer');
                jsObj.async && scriptEl.setAttribute('async', 'async');
                document.body.appendChild(scriptEl);
            });
            vendorObj.jsLoaded = true;
        }
    }
};
const getImgFileExtension = (url) => {
    const extensionValid = (url || '').split(/[#?]/)[0].split('.').pop().trim();
    const geturlvalid = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extensionValid.toLowerCase());
    return geturlvalid ? extensionValid : '';
};
const generateUniqueId = (uniqueStr) => `${uniqueStr}_${new Date().getTime()}_${uniqueNumber++}`;
const setEqualizeHeights = (elements) => {
    if (!elements || elements.length === 0) {
        return;
    }
    let maxHeight = 0;
    elements.forEach((element) => {
        element.style.height = ''; // Clear any previously set height
    });
    elements.forEach((element) => {
        const elementHeight = element.offsetHeight; // Includes padding and border
        if (elementHeight > maxHeight) {
            maxHeight = elementHeight;
        }
    });
    elements.forEach((element) => {
        element.style.height = `${maxHeight}px`;
    });
};
const debounceFn = (func) => {
    var timer;
    return (event) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(func, 100, event);
    };
};
const addEvent = (element, eventStr, eventFn) => {
    element.addEventListener(eventStr, eventFn);
};
export { $, $$, addClass, addEvent, addVendorFilesToDOM, constants, createElement, debounceFn, generateUniqueId, getImgFileExtension, hasClass, removeClass, setEqualizeHeights, slideDown, slideUp, stringTrim, toggleClass, wrapElements, };

//# sourceMappingURL=__constants.js.map
