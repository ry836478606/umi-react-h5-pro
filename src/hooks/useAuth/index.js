import { getTokenForStorage } from 'utils';
import config from 'config';

export function isLogin() {
    if (getTokenForStorage(config.accessTokenKey)) {
        return true;
    }
    return false;
}
