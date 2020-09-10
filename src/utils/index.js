import config from 'config/index';
import { parse } from 'qs';
import { get } from 'lodash';
import { Storage } from 'utils/storage';

export { pxToRem, isAndroid, isIOS, resetScroll } from 'utils/mobile/index';

/**
 * 替换api中{id}变量成具体的值: format(api.getGroupDetails.url, {id: payload.id})
 * @param str
 * @param obj
 * @returns {*}
 */
export function format(str, obj) {
    const formatRe = /\{([^}]+)\}/g;

    if (!obj) {
        return str;
    }
    return str.replace(formatRe, (match, key) => obj[key]);
}

/**
 * 获取当前url的参数
 * @returns {*}
 */
export function getUrlQuery() {
    return parse(get(window, 'location.search', '').split('?')[1] || '');
}

/**
 * 判断是否是Promise
 * @param obj
 * @returns {boolean}
 */
export function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

/**
 * 树遍历
 * @param treeData
 * @param cb
 * @param parent
 */
export function treeForEach(treeData, cb, parent) {
    treeData.forEach(data => {
        cb(data, parent);
        if (data.children) {
            treeForEach(data.children, cb, data);
        }
    });
}

/**
 * localStorage的token相关操作
 * @type {Storage}
 */
const tokenStore = new Storage();

export function getTokenForStorage() {
    return tokenStore.getItem(config.accessTokenKey);
}

export function hasTokenForStorage() {
    const token = getTokenForStorage();

    return !!token;
}

export function removeTokenForStorage() {
    return tokenStore.removeItem(config.accessTokenKey);
}

export function setTokenForStorage(token) {
    return tokenStore.setItem(config.accessTokenKey, token);
}

export function canvasToDataUrl(video) {
    const canvas = document.createElement('canvas');
    canvas.height = video.videoHeight * 0.5;
    canvas.width = video.videoWidth * 0.5;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.35);
}

/**
 * canvas异步获取视频封面
 */
export function getVideoCover(url, second = 1) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');

        video.setAttribute('crossorigin', 'anonymous');

        // 取视频第n秒
        video.addEventListener('loadeddata', function() {
            this.currentTime = second;
        });

        video.addEventListener('seeked', function() {
            const imageUrl = canvasToDataUrl(video);
            resolve(imageUrl);
        });

        video.addEventListener('error', function(e) {
            reject(e);
        });

        video.src = url;
    });
}

export const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(
    window.navigator.userAgent,
);

/**
 * 判断是否是企业微信环境
 * @returns {boolean|boolean}
 */
export function isWXWorkApp() {
    const { userAgent } = window.navigator;
    return (
        userAgent.indexOf('MicroMessenger') !== -1 &&
        userAgent.indexOf('wxwork') !== -1
    );
}

/**
 * 获取字符的字节数量
 * @param str
 * @param charset 字符集
 * @returns {number}
 */
export const getCharSize = function(str, charset) {
    let total = 0;
    let charCode;
    let i;
    let len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
};
