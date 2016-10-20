# 介绍

> Vue服务端路由(express router)+前端路由(vue-router)结合的Demo,支持多页面和前端单页

## 使用方式

``` bash
# 安装依赖
npm install -g babel
npm install -g webpack
npm install

# 启动调试
npm run dev

# 打开浏览器访问 http://localhost:3000, 支持hot reload

# 编译工程
npm run build:prod

```

> 注意: 多页面的情况下是共享vendor.js的,所以建议将一些比较大的js库放在cdn上单独加载, debug模式下编译出来的vendor是比较大的, build:prod后会小很多

