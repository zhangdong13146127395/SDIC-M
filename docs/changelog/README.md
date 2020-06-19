# 📅 更新日志

请遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：日常 bugfix 更新。
- 次版本号：发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性。

## 0.3.1

`2019-12-25`

- 📝 修改 vee-validate v2 版本文档链接地址
- 🈴 合并会议管理模块代码
- 🌟 新增模拟 form 表单 post 提交的 axios 配置文件
- 💄 修改 `SinoZtree` 组件获取的数据格式
- 🗑️ 删除 `SinoMtree` 组件

## 0.3.0

`2019-12-11`

- 📝 重新开始书写更新日志
- 📝 书写 `SinoButtonGroup` 组件使用说明文档
- 📝 书写 `SinoSwipeCell` 组件使用说明文档
- 📝 修改 `SinoDialogCell` 组件使用说明文档
- 🌟 新增 `SinoButtonGroup` 组件，用于底部悬浮按钮组
- 🌟 新增 `SinoSwipeCell` 组件，用于滑动单元格操作
- 💄 将老底部悬浮按钮组，全部更换为 `SinoButtonGroup` 组件
- 💄 将老滑动单元格，全部更换为 `SinoSwipeCell` 组件

## 0.2.1

`2019-08-20`

- 🌟 将 SinoMtree 组件 替换为 SinoZtree 组件，弃用 SinoMtree 组件

## 0.2.0

`2019-08-12`

- 📝 完善说明文档
- ⚡️ 升级 vant 组件库到 2.1.2 版本
- ⚡️ 升级项目依赖
- 🐞 修复由于 vant 升级带来的 sino-goods-action 样式改变的问题

## 0.1.12

`2019-08-08`

- ⚡️ 修改项目本地开发映射端口为 8500
- 🐞 Questionnaire 模块：已办问卷查看，点击返回界面无法回到已办界面的问题

## 0.1.11

`2019-08-02`

- ⚡️ 升级 vant 组件库到 2.0.9 版本
- 🌟 新增 SinoSettingDept 组件，用于切换用户部门角色功能
- 🌟 新增 SinoZtree 组件，用于新的部门人员树
- 🎉 新增切换用户部门角色接口
- 💄 Questionnaire 模块：新增切换用户部门角色功能

## 0.1.10

`2019-07-31`

- ⚡️ 修改项目整体目录以及请求接口目录为 /oa/mobile
- 🐞 Questionnaire 模块：修复问卷页面评测人姓名信息显示错误的问题

## 0.1.9

`2019-07-25`

- 💄 Questionnaire 模块：添加问卷页面评测人单位和姓名信息
- 🐞 Questionnaire 模块：修复单选题选项值为字符串类型勾选报错的问题

## 0.1.8

`2019-07-23`

- 🐞 Questionnaire 模块：修复问卷只读和预览页面没有必填标识的问题

## 0.1.7

`2019-07-03`

- 🌟 新增 SinoWorkflow 组件，用于流程提交

## 0.1.6

`2019-05-30`

- 🐞 Questionnaire 模块：修复问卷设置保存后日期变为当前时间的问题
- 🐞 Questionnaire 模块：修复第一次进入答题页面报错的问题
- 🐞 Questionnaire 模块：修复未填写简答题内容，统计时显示空文本框问题

## 0.1.5

`2019-05-27`

- ⚡️ 升级 vant 组件库到 2.0-beta 版本

## 0.1.4

`2019-05-20`

- 🐞 Questionnaire 模块：修复答题页面获取数据报错的问题，同时在获取数据完成时重写 url

## 0.1.3

`2019-05-17`

- 🐞 SinoMtree 模块、Questionnaire 模块：修复点击 cell 中的 checkbox 会导致直接跳转无法正常选中的问题

## 0.1.2

`2019-05-15`

- 📝 迁移文档到 VuePress 子项目中
- 🎉 新增 403 无权限公共页面
- ⚡️ 修改项目端口为 8888，修改一些配置文件
- ⚡️ 升级项目依赖
- 💄 SinoMtree 组件：新增 clear 属性
- 💄 SinoMtree 组件：修改 rootId
- 💄 登录模块：修复单点登录无法跳转到指定模块的问题
- 💄 Questionnaire 模块：修改组件引入方式
- 🐞 Questionnaire 模块：修复答题列表不显示未答问卷的问题
- 🐞 Questionnaire 模块：修复问卷设置页面选择提醒周期保存不上的问题

## 0.1.1

`2019-05-10`

- 🐞 Questionnaire 模块：修复 sino-dialog-cell 不显示的问题

## 0.1.0

`2019-05-09`

- 📝 新增说明文档
- 💄 SinoMtree 组件：新增 `cancel` 事件
- 🐞 Questionnaire 模块：修复发布问卷没有手机号验证的问题
