# umi project

> A react h5 project build with umijs
- 技术栈：react, less, umijs（搭建框架，路由...）,
- dva（管理数据模型）,  umi-request（接口请求）, viewport（窗口自适应）
- 预览地址：https://ry836478606.github.io/umi-react-h5-pro/


## Getting Started
```bash
npm install yarn -g
yarn install

//开发
npm run start

//打包
npm run build:dev
```


## 项目规范
- 1.public为不经过编译的静态资源文件夹，子项目的静态文件放在public/{subProjectName}下，base为全局文件。（public/demo/images/log.png -> <img src='/demo/images/log.png'）
- 2.全局文件不能擅自改动，有需求找相关维护人员。
- 3.src/pages 下一级文件都是子项目
- 4.css 全部用css-modules 防止命名冲突 [文档](https://github.com/css-modules/css-modules)
- 5.dva models必须加命名空间（以子项目为名, demo ->  namespace: 'demo_base'） 如何创建 [文档](https://umijs.org/guide/with-dva.html)
- 6.在react组件中创建的定时器，事件等，必须在componentWillUnmount中销毁
- 7.不要轻易创建全局变量
- 8.mock数据在/mock文件夹下，以子项目作为命名空间
- 9.componentWillMount, componentWillUpdate, componentWillReceiveProps 这个3个生命周期最好少用 react 后续版本会删除 [文档](https://reactjs.org/docs/react-component.html)
- 10.谁开发的业务要在文件头注释作者，更好沟通
- 11.url用下划线连接



## 路由约定
- 1.必须在./src/pages下（参照[文档](https://umijs.org/zh-CN/docs/convention-routing)）



## 命名规范
- 1.目录和文件一律用小写加-。



## 参考文档
- react: [文档](https://reactjs.org/)
- redux: [文档](https://redux.js.org/)
- antDesign: [文档](https://ant.design/index-cn)
- antDesignMobile: [文档](https://mobile.ant.design/index-cn)
- lodash: [文档](https://lodash.com/)
- umi: [文档](https://umijs.org/)
- dva: [文档](https://dvajs.com/)
- es6: [文档](http://es6.ruanyifeng.com/#docs/generator-async)
- eslint: [文档](https://eslint.org/)
- prettier: [文档](https://prettier.io/)


## 说明
- umijs自带antd和antd-mobile包
- 命令行的变量如：APP_ENV=development，得在.umirc中define下
- 去掉命令行“prettier”中的单引号（Fix quote cause prettier error on Windows）
- 部分解释已备注在代码注释中



## 文件树
```
├─.prettierignore
├─.prettierrc
├─LICENSE
├─package.json
├─postcss.config.js
├─README.md
├─tsconfig.json
├─typings.d.ts
├─yarn.lock
├─src
|  ├─app.ts（运行时入口文件）
|  ├─global.less（全局样式）
|  ├─wrappers（高阶函数）
|  |    ├─auth
|  |    |  └index.js
|  ├─utils（工具函数）
|  |   ├─index.js
|  |   ├─regexs.js
|  |   ├─storage.js
|  |   ├─mobile
|  |   |   ├─env.js
|  |   |   ├─index.js
|  |   |   ├─scroll.js
|  |   |   └unit.js
|  ├─style（样式）
|  |   └base.less
|  ├─services（接口请求）
|  |    ├─api.js
|  |    ├─index.js
|  |    └request.js
|  ├─pages（页面组件）
|  |   ├─document.ejs
|  |   ├─index.js
|  |   ├─index.less
|  |   ├─login
|  |   |   ├─index.js
|  |   |   ├─index.less
|  |   |   └model.js
|  |   ├─chat-group
|  |   |     ├─[id]
|  |   |     |  ├─index.js
|  |   |     |  ├─index.less
|  |   |     |  └model.js
|  |   ├─404
|  |   |  ├─index.js
|  |   |  └index.less
|  ├─models（数据模型）
|  |   └base.js
|  ├─layouts（全局布局）
|  |    ├─index.js
|  |    └index.less
|  ├─hooks（狗子函数）
|  |   ├─useAuth
|  |   |    └index.js
|  ├─config（全局配置）
|  |   ├─development.js
|  |   ├─index.js
|  |   ├─production-development.js
|  |   ├─production-master.js
|  |   └production-test.js
|  ├─components（组件）
|  |     ├─business（业务组件）
├─public
|   ├─favicon.ico
|   ├─base
|   |  ├─js
|   |  | └vconsole.min.js
├─mock（虚拟接口数据）
|  └api.ts

```
