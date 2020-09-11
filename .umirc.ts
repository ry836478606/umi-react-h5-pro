import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    alias: {
        components: path.resolve(__dirname, 'src/components'),
        business: '/src/components/business',
        config: path.resolve(__dirname, 'src/config'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        models: path.resolve(__dirname, 'src/models'),
        style: '/src/style',
        services: path.resolve(__dirname, 'src/services'),
        utils: path.resolve(__dirname, 'src/utils'),
        wrappers: path.resolve(__dirname, 'src/wrappers'),
    },
    crossorigin: true,
    title: false, // 关闭document.title，通过其他方式实现
    dva: {
        immer: true,
        hmr: false,
    },
    proxy: {
        '/api_host': {
            target: 'http://dev-api.51zan.com',
            changeOrigin: true,
            pathRewrite: { '^/api_host': '' },
        },
    },
    extraPostCSSPlugins: [
        // require('postcss-pxtorem')({ // flexible自适应
        //   rootValue: 37.5, // 设计稿宽度的1/10（常用设计稿：370px, 设置为37.5兼容引用的ui库；若设置75，mint-ui的样式大小缩小一倍）
        //   propList: ['*'], // 需要做转化处理的属性
        // }),
        require('postcss-px-to-viewport')({
            // viewport自适应
            viewportWidth: 375,
            veiwportHeight: 667,
            unitPrecision: 3,
            viewportUnit: 'vw',
            minPixelValue: 1, // 最小px，不进行转换
            mediaQuery: false,
            selectorBlackList: ['ignore'], //黑名单
        }),
    ],
    // 环境变量
    define: {
        // webpack definePlugin直接将console.log(process.env.APP_ENV)这句给做了字符串替换，直接搞成了console.log(123)具体值
        'process.env.APP_ENV': process.env.APP_ENV,
    },
    // 非根路径的项目地址（用于前端路由访问）
    base: '/umi-react-h5-pro/',
    publicPath: './',
});
