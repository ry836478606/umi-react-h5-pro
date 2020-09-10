module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 37.5, // 设计稿宽度的1/10（常用设计稿：370px, 设置为37.5兼容引用的ui库；若设置75，mint-ui的样式大小缩小一倍）
            propList: ['*'], // 需要做转化处理的属性
        },
    },
};
