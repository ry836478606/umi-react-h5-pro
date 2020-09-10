import { login } from 'services';

export default {
    namespace: 'auth',

    state: {},

    effects: {
        *login({ payload }, { call }) {
            return yield call(login, payload);
        },
    },
};
