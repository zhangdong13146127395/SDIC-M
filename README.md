# 🚀 sdic-mobile

## 💎 简介

此项目由两部分组成：一部分是使用 Vue Cli3 创建，并使用 Vant 组件库开发的 OA 移动端，另一部分是使用 VuePress 书写的开发说明文档。

## ✨ 特性

- Vue驱动
- 强大的数据持久化方案
- 模块化全局状态管理
- 贴心小工具
- Vant组件库
- 文档完善

## 📦 快速上手

### 安装依赖

``` bash
yarn add # OR npm install
```

### 开发调试

``` bash
yarn serve # OR npm run serve
```

### 编译

``` bash
yarn build # OR npm run build
```

### 自定义配置

请参考 [配置参考](https://cli.vuejs.org/config/)。

### 使用 Vant 组件

``` js
import { Button, Cell } from 'vant'
```

## ⌨️ 开发指南

### 目录结构

- 项目代码位于 `src` 目录下
- `docs` 目录下是说明文档的代码，本地开发时可以在目录下运行 `npm run docs:dev` 开启文档网站

项目目录大致如下：

```
sdic-mobile
├─ docs                      # 文档目录
├─ public                    # 项目静态资源目录
├─ vue.config.js             # Vue 项目配置文件
├─ CHANGELOG.md              # 更新日志文档
├─ README.md                 # 说明文档
└─ src                       # 项目目录
   ├─ api                    # 接口
   |  └─ demo                # 模块名
   |     └─ index.js         # 接口文件
   |
   ├─ assets                 # 资源
   |  ├─ fonts               # 字体图标
   |  ├─ js                  # 工具类
   |  └─ style               # 样式
   |     ├─ pubilc.less      # 公共样式
   |     └─ var.js           # 样式变量
   |
   ├─ components             # 公共组件
   |  └─ demo                # 组件名
   |     ├─ index.vue        # 组件文件
   |     └─ CHANGELOG.md     # 更新日志文档
   |     └─ README.md        # 说明文档
   |
   ├─ layout                 # 布局
   |
   ├─ libs                   # 库
   |
   ├─ mock                   # 模拟数据
   |  └─ api                 # 模拟数据接口目录
   |     └─ demo             # 模块名
   |        └─ index.js      # 模拟数据接口文件
   |
   ├─ plugin                 # 插件
   |
   ├─ router                 # 路由
   |  ├─ modules             # 模块目录
   |  |  └─ demo.js          # 模块名
   |  └─ routes.js           # 路由配置文件
   |
   ├─ store                  # 状态管理仓库
   |  ├─ modules             # 模块目录
   |  |  └─ demo.js          # 模块名
   |  └─ index.js            # 仓库配置文件
   |
   ├─ views                  # 页面目录
   |  ├─ README.md           # 说明文档
   |  └─ demo                # 模块目录
   |     ├─ components       # 模块私有组件
   |     ├─ index.vue        # 页面
   |     └─ README.md        # 说明文档
   |
   ├─ App.vue                # 项目入口
   └─ main.js                # 全局配置文件
```

### 开发新模块

开发新模块时，需要在 `views` 目录下新建模块以及页面，并且在 `router/modules` 目录下新增模块和路由文件，同时在 `router/routes.js` 文件中引入该模块路由。

如果需要**调用接口**，需要在 `api` 目录下新建模块以及接口文件，并且在 `mock` 目录下新建模块以及模拟数据接口文件。

如果需要**使用状态管理仓库**，需要在 `store/modules` 目录下新增模块和仓库文件，同时在 `store/index.js` 文件中引入该仓库文件。

请务必完善 `README.md` 和 `CHANGELOG.md` 文档。

### 开发新组件

**公共组件**放入 `src/components` 目录中，**私有组件**放入当前模块目录下的 `components` 目录中。

开发规范可参考 [Vant 开发指南](https://youzan.github.io/vant/#/zh-CN/contribution)。

请务必完善 `README.md` 和 `CHANGELOG.md` 文档。

## 🎀 风格指南

请参考 [Vant 风格指南](https://youzan.github.io/vant/#/zh-CN/style-guide)。

## 💝 定制主题

**建议**：CSS 命名采用 BEM 的风格，方便使用者覆盖样式。

### 样式变量

本项目使用了 [Less](http://lesscss.org/) 对样式进行预处理，并内置了一些样式变量，下面是一些基本的样式变量，所有可用的样式变量请参考 `src/assets/style/var.less`。

### 定制方法

如果需要定制 Vant 组件库样式，请查看 [Vant 官网](https://youzan.github.io/vant/#/zh-CN/theme)。

## 🎁 内置样式

本项目中默认包含了一些常用样式，可以直接通过 className 的方式使用。

更多内置样式请查看 [Vant 官网](https://youzan.github.io/vant/#/zh-CN/style)。


## 📚 字体图标

本项目引入了两种字体图标

### font-awesome

所在目录 `src/assets/fonts/font-awesome`

[项目地址](https://fontawesome.com/icons?from=io)

[使用方法](http://www.fontawesome.com.cn/examples/)

### iconfont

所在目录 `src/assets/fonts/iconfont`

[项目地址](https://www.iconfont.cn/)

#### 使用方法

在类名中加入 `iconfont iconfont-iconhomefill` 其中 `iconhomefill` 替换为对应图标的名称
