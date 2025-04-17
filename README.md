# React Admin App

## 简介

React Admin App 是一个免费开源的中后台模版。使用了最新的 TypeScript + React + Ant Design 等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。
模板集成了基础权限、国际化以及各种常用组件。

## 功能

```text
- 登录 / 注册 / 注销

- 权限管理
    - 路由权限
    - 功能权限

- 错误页面
    - 401
    - 404

- 重定向到指定页面

```

## 目录结构

```text
├─ public                     # 静态资源
│   ├─ favicon.ico            # favicon图标
│   └─ index.html             # html模板
├─ src                        # 项目源代码
│   ├─ api                    # 所有请求
│   ├─ assets                 # 静态资源
│   ├─ components             # 全局公用组件
│   ├─ config                 # 全局配置
│   │   └─ constant.js        # 基础常量
│   ├─ icons                  # svg资源
│   ├─ layouts                # layout
│   ├─ vendor                 # 第三方库按需加载
│   ├─ mock                   # mock数据
│   ├─ router                 # 路由
│   ├─ store                  # 全局store管理
│   ├─ styles                 # 全局样式
│   ├─ utils                  # 工具函数类
│   ├─ views                  # 页面集合
│   ├─ App.js                 # 入口页面
│   ├─ defaultSettings.js     # 全局默认配置
│   └─ index.js               # 入口文件
├── .env.development          # 开发环境变量配置
├── .env.production           # 生产环境变量配置
├── config-overrides.js       # 对cra的webpack自定义配置
├── package.json              # package.json
└── .eslintrc.js              # eslint配置
```

## 开发

```bash
# 克隆项目
git clone https://github.com/cengbin/react-admin-app.git

# 进入项目目录
cd react-admin-app

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --https://registry.npmmirror.com

# 启动服务
npm run dev
```

## 技术栈

1. react
2. react-router-dom
2. antd
3. @ant-design/icons 
4. @ant-design/pro-components
5. react-custom-scrollbars https://github.com/malte-wessel/react-custom-scrollbars?tab=readme-ov-file#react-custom-scrollbars

### 参考

React 管理后台项目收集：https://github.com/qq735675958/react-antd-admin 

https://github.com/z-9527/react-admin-master 
https://z-9527.github.io/react-admin-master/#/react-music-master/home/navigation/menu