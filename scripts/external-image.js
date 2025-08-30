import { $$, getImgFileExtension } from './__constants.js';
const decorateExternalImages = (parentEl) => {
    const allAnchors = $$(parentEl, 'a');
    allAnchors.forEach((anchor) => {
        const extn = getImgFileExtension(anchor.href);
        if (extn) {
            const pictureEl = document.createElement('picture');
            const imgEl = document.createElement('img');
            imgEl.src = anchor.href;
            imgEl.alt = anchor.textContent;
            pictureEl.append(imgEl);
            anchor.replaceWith(pictureEl);
        }
    });
};
export default decorateExternalImages;

//# sourceMappingURL=external-image.js.map
