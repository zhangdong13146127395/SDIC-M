# 开发指南

## 目录结构

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
   |  └─ style               # 样式
   |     ├─ iconfont.less    # iconfont 图标
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
   |     ├─ CHANGELOG.md     # 更新日志文档
   |     └─ README.md        # 说明文档
   |
   ├─ App.vue                # 项目入口
   └─ main.js                # 全局配置文件
```

## 开发新模块

开发新模块时，需要在 `views` 目录下新建模块以及页面，并且在 `router/modules` 目录下新增模块和路由文件，同时在 `router/routes.js` 文件中引入该模块路由。

如果需要**调用接口**，需要在 `api` 目录下新建模块以及接口文件，并且在 `mock` 目录下新建模块以及模拟数据接口文件。

如果需要**使用状态管理仓库**，需要在 `store/modules` 目录下新增模块和仓库文件，同时在 `store/index.js` 文件中引入该仓库文件。

请务必完善 `README.md` 和 `CHANGELOG.md` 文档。

## 开发新组件

**公共组件**放入 `src/components` 目录中，**私有组件**放入当前模块目录下的 `components` 目录中。

添加新组件时，请按照下面的目录结构组织文件。

```
packages
└─ demo
   ├─ README.md   # 说明文档
   ├─ index.less  # 组件样式
   └─ index.vue   # 组件入口
```

### 组件文档

组件文档采用 markdown 格式，内容包括使用示例以及 `API` 等。

#### 1. 标题规范

文档标题从 `h2`（即 `##` 标题 ）开始，每往下一级多加一个 `#` 号。

#### 2. 组件描述

大标题下面是对组件的一句话简要描述。

#### 3. 使用指南

如果组件需要使用指南，放在组件描述下方，另起一个二级标题。

#### 4. 代码演示

书写代码演示时，建议从简单用法开始介绍，不要上来就同时使用一大堆 API，会让人觉得难以上手。并且一个示例只演示一个 API 的使用方法，如无特殊需求不要在一个示例中同时演示多个 API 混合使用。

```html
<van-button :size="size">
  Large
</van-button>
```

```javascript
export default {
  data() {
    return {
      size: 'large'
    };
  }
};
```

#### 5. API 说明

组件的 API 说明以表格的形式书写，表格包含以下列：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ------------ | ------------- | -------- | ---------- | ---------- |
| visible | 是否可见 | `Boolean` | `false` | - |

#### 6. Event 说明

组件的 Event 说明，请以表格的形式书写，表格包含以下列：

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 点击按钮时触发 | event：事件对象 |
