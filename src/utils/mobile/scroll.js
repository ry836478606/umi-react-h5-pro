/**
 * 判断是否是window
 * @param val
 * @returns {boolean}
 */
function isWindow(val) {
    return val === window;
}

// 元素溢出滚动的正则
const overflowScrollReg = /scroll|auto/i;

/**
 * 获取最上层的可滚动元素
 * @param el
 * @param root
 * @returns {(() => (Node | null))|ActiveX.IXMLDOMNode|(Node & ParentNode)|Window}
 */
export function getScroller(el, root = window) {
    let node = el;

    // 向上循环node的parentNode，确定最上层哪个是竖向的可滚动元素
    while (
        node &&
        node.tagName !== 'HTML' &&
        node.nodeType === 1 &&
        node !== root
    ) {
        const { overflowY } = window.getComputedStyle(node);

        // 竖向是否可滚动
        if (overflowScrollReg.test(overflowY)) {
            if (node.tagName !== 'BODY') {
                return node;
            }
            // node是body
            const { overflowY: htmlOverflowY } = window.getComputedStyle(
                node.parentNode,
            );

            if (overflowScrollReg.test(htmlOverflowY)) {
                return node;
            }
        }
        node = node.parentNode;
    }

    return root;
}

/**
 * 滚动元素的scrollTop
 * @param el
 */
export function getScrollTop(el) {
    return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

/**
 * 滚动元素的scrollTop或scrollX
 * @param el
 * @param value
 */
export function setScrollTop(el, value) {
    if ('scrollTop' in el) {
        el.scrollTop = value;
    } else {
        el.scrollTo(el.scrollX, value);
    }
}

/**
 * 获取根元素的scrollTop
 * @returns {number}
 */
export function getRootScrollTop() {
    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
}

/**
 * 滚动根元素scrollTop
 * @param value
 */
export function setRootScrollTop(value) {
    setScrollTop(window, value);
    setScrollTop(document.body, value);
}

/**
 * 获取元素的top：（el的边缘top + 父级已滚动的高度）
 * @param el
 * @param scroller
 * @returns {number}
 */
export function getElementTop(el, scroller) {
    if (isWindow(el)) {
        return 0;
    }

    const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
    return el.getBoundingClientRect().top + scrollTop;
}

/**
 * 获取元素的视口高度
 * @param el
 * @returns {number}
 */
export function getVisibleHeight(el) {
    if (isWindow(el)) {
        return el.innerHeight;
    }
    return el.getBoundingClientRect().height;
}

/**
 * 获取元素的视口top
 * @param el
 * @returns {number}
 */
export function getVisibleTop(el) {
    if (isWindow(el)) {
        return 0;
    }
    return el.getBoundingClientRect().top;
}
