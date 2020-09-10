export default {
    // 支持值为 Object 和 Array
    'GET /api/users': { users: [1, 2] },
    // GET 可忽略
    '/api/users/1': { id: 1 },
    // 支持自定义函数，API 参考 express@4
    'POST /api/login': (req, res) => {
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('content-type', 'application/json;charset=UTF-8');
        res.end(
            JSON.stringify({
                meta: {
                    code: 200,
                    message: '登录成功',
                },
                data: null,
            }),
        );
    },
};
