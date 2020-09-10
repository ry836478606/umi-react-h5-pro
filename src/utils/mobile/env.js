/**
 * 是否是浏览器环境（是否有window）
 * @type {boolean}
 */
export const inBrowser = typeof window !== 'undefined';

/**
 * 获取ua
 * @type {boolean|string}
 */
export const ua = inBrowser && navigator.userAgent.toLowerCase();

/**
 * 是否是安卓
 * @type {boolean|""|boolean}
 */
export const isAndroid = ua && ua.indexOf('android') > 0;

/**
 * 是否是ios
 * @type {boolean}
 */
export const isIOS = ua && /iphone|ipad|ipod|ios/.test(ua);

/**
 * 获取ios版本
 * @param userAgent
 * @returns {null|{patch: number, major: number, minor: number}}
 */
export function getIOSVersion(userAgent) {
    const regex = /os (\d\d?_\d(_\d)?)/;
    const matches = regex.exec(userAgent);
    if (!matches) return null;
    const parts = matches[1].split('_').map(function(item) {
        return parseInt(item, 10);
    });
    return {
        major: parts[0],
        minor: parts[1],
        patch: parts[2] || 0,
    };
}
