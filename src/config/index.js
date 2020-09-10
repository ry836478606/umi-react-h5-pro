const config = require(`./${process.env.APP_ENV}.js`).default;

export default {
    apiHost: '',
    accessTokenKey: 'access_token',
    ...config,
};
