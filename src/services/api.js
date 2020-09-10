import config from 'config/index';

export default {
    // 群详情
    getGroupDetails: {
        url: `${config.apiHost}/customer/api/group_chat/{id}`,
        method: 'get',
    },
    // 对外访问的企业朋友圈
    getPublicMoments: {
        url: `${config.apiHost}/profile/api/moments/public/records`,
        method: 'get',
    },
    createMoment: {
        url: `${config.apiHost}/profile/api/moments`,
        method: 'post',
    },
    // 登录
    login: {
        url: '/api/login',
        method: 'post',
    },
};
