export function safeJsonParse(data = '', errorRe = {}) {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        return errorRe;
    }
}

export function safeJsonStringify(data = {}, errorRe = '') {
    try {
        return JSON.stringify(data);
    } catch (e) {
        console.log(e);
        return errorRe;
    }
}

export class Storage {
    constructor({ store = window.localStorage } = {}) {
        this.store = store;
    }

    getStore() {
        return this.store;
    }

    getItem(...arg) {
        try {
            if (this.store) {
                return this.store.getItem(...arg);
            }
            return '';
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    removeItem(...arg) {
        try {
            if (this.store) {
                this.store.removeItem(...arg);
                return true;
            }
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    setItem(...arg) {
        try {
            if (this.store) {
                this.store.setItem(...arg);
                return true;
            }
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    clear() {
        try {
            if (this.store) {
                return this.store.clear();
            }
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
