# xl-frame
基于iframe和xl-vue-router-tab的一套新联微前端架构实现方案

## 项目安装
### 代理npm安装路径到新联公司私有仓库

```
npm set registry http://221.226.153.90:4873
```
### 安装npm包
```
npm install
```

### 本地环境编译和热更新
```
npm run serve
```

### 线上打包和压缩
```
npm run build
```

### 修复eslint错误
```
npm run lint
```

## 项目目录结构

``` js
├── public                         # 纯静态资源以及index入口目录
│    ├── favicon.ico               # 项目icon
│    ├── index.html                # index.html入口文件
├── src                            # 项目代码目录
│    ├── api                       # api接口目录
│    ├── assets                    # 静态资源目录
│    │    ├── css                  # css资源
│    │    ├── images               # 图片资源
│    │    ├── js                   # 静态脚本资源
│    │    └── video                # 视频资源
│    ├── components                # 全局组件目录
│    ├── icons                     # 自动渲染svg目录。详见注释
│    ├── router                    # vue-router及相关权限配置目录
│    ├── store                     # vuex目录
│    ├── views                     # 视图文件目录
│    │    ├── error                # 错误处理页面
│    │    ├── login                # 登陆处理页面
│    │    ├── Frame.vue            # 项目布局文件
│    │    └── steps.js             # 引导页配置项
│    ├── App.vue                   # Vue根实例文件
│    └── main.js                   # 项目入口文件
├── .editorconfig                  # 编辑器书写规范配置文件
├── .env.development               # env环境变量
├── .env.production                # production环境变量
├── .eslintrc.js                   # eslint规范配置项
├── babel.config.js                # babel配置文件
├── jsconfig.json                  # vscode兼容vue-cli所需配置文件
├── package.json                   # 项目配置文件
├── README.md                      # 项目markdown文档
└── vue.config.js                  # vue-cli配置文件

     
```

## 项目效果展示

![首页](https://tiansuiziswjimg.oss-cn-beijing.aliyuncs.com/frame1.png)
![引导页](https://tiansuiziswjimg.oss-cn-beijing.aliyuncs.com/frame2.png)
![登陆页](https://tiansuiziswjimg.oss-cn-beijing.aliyuncs.com/frame3.png)
![tab页](https://tiansuiziswjimg.oss-cn-beijing.aliyuncs.com/frame4.png)