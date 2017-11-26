# backend-vue

> '从零开始编写一个vue 管理后台'
> '通过对脱离 vue-router 实现一个 多开 tab，并且保存每一个tab的状态'
> '所有数据都是通过 /serivce' 目录下， koa 框架模式返回固定值， 脱离 mockjs的入侵性


##解决
- 保持每一个tab的状态，脱离router，keep-alive 困扰
- 每个tab 可以配备 关闭、刷新、关闭其他

![keep status](http://upload-images.jianshu.io/upload_images/5611290-4fa67633d19420b7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![active](http://upload-images.jianshu.io/upload_images/5611290-670c18cb3edd00e8.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置tab](http://upload-images.jianshu.io/upload_images/5611290-5de00a5355fe4b66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080  启动正常vue项目
npm run dev

# make a full stack for dev  启动vue项目， 所有接口通过 koa 模拟 ／serivce
npm run fulldev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
