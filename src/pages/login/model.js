import { login } from 'services';

export default {
    namespace: 'auth',

    state: {},

    effects: {
        *login({ payload }, { call }) {
            if (process.env.APP_ENV === 'development') {
                return yield call(login, payload);
            }
            return {
                meta: {
                    code: 200,
                    message: '登录成功',
                },
            };
        },
    },
};
