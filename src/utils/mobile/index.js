import { isIOS } from './env';
import { setRootScrollTop, getRootScrollTop } from './scroll';

export * from './env';
export * from './scroll';
export * from './unit';

/**
 * 微信中ios，input-focus后，页面滚动出错
 */
export function resetScroll() {
    if (isIOS) {
        setRootScrollTop(getRootScrollTop());
    }
}
