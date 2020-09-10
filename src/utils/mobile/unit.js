let rootFontSize;

/**
 * 获取html元素的fontSize
 * @returns {number}
 */
function getRootFontSize() {
    if (!rootFontSize) {
        const doc = document.documentElement;
        const fontSize =
            doc.style.fontSize || window.getComputedStyle(doc).fontSize;

        rootFontSize = parseFloat(fontSize);
    }

    return rootFontSize;
}

/**
 * px转rem值
 * @param px
 * @param fontScale
 * @returns {number}
 */
export function pxToRem(px = 0, fontScale = 100) {
    return Math.round(px * (getRootFontSize() / fontScale));
}
