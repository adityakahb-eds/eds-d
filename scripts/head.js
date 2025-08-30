import { addClass, addEvent, hasClass } from './__constants.js';
// document.body.classList.add('light-mode');
addEvent(document, 'DOMContentLoaded', () => {
    const hasBodyDarkClass = hasClass(document.body, 'dark-mode');
    if (!hasBodyDarkClass) {
        addClass(document.body, 'light-mode');
    }
    const mainEl = document.querySelector('main');
    if (mainEl) {
        mainEl.id = 'main_content';
    }
});
window.vendors = [
    {
        name: 'amegmen',
        jsLoaded: false,
        cssLoaded: false,
        css: [{ url: '/vendor/amegmen.css', media: 'screen' }],
        js: [{ url: '/vendor/amegmen.umd.js', defer: false, async: false, module: true }],
    },
    {
        name: 'waypoints',
        jsLoaded: false,
        cssLoaded: false,
        js: [
            {
                url: '/vendor/noframework.waypoints.min.js',
                defer: false,
                async: false,
                module: false,
            },
        ],
    },
    {
        name: 'countup',
        jsLoaded: false,
        js: [
            {
                url: '/vendor/countUp.umd.min.js',
                defer: false,
                async: false,
                module: true,
            },
        ],
    },
    {
        name: 'carousel',
        jsLoaded: false,
        cssLoaded: false,
        appendJSInHead: true,
        css: [{ url: '/vendor/swiper-bundle.min.css', media: 'screen' }],
        js: [
            {
                url: '/vendor/swiper-bundle.min.js',
                defer: false,
                async: false,
                module: false,
            },
        ],
    },
    {
        name: 'datepicker',
        jsLoaded: false,
        cssLoaded: false,
        css: [
            {
                url: '/vendor/datepicker.min.css',
                media: 'screen',
            },
        ],
        js: [
            {
                url: '/vendor/datepicker-full.min.js',
                defer: false,
                async: false,
                module: true,
            },
        ],
    },
];

//# sourceMappingURL=head.js.map
