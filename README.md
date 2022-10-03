# table-merge

极佳的表格合并单元格方案，跨框架、跨组件库可用，已提供多个 UI 框架开箱即用。

## 开箱即用的 UI 库

指以针对框架进行进一步封装，直接引用即可使用。

- [x] Element Plus

  抱歉，使用方式暂时只能参考：[examples/element-plus/App.vue](https://github.com/yuexiaoliang/table-merge/blob/master/examples/element-plus/App.vue)

- [x] Ant Design Vue

  抱歉，使用方式暂时只能参考：[examples/ant-design-vue/App.vue](https://github.com/yuexiaoliang/table-merge/blob/master/examples/ant-design-vue/App.vue)

## 计划支持开箱即用 UI 库

指暂未针对框架进行进一步封装，将来会提供支持。

通过 `@table-merge/core` 导出的方法自己封装最少只需要 10 行以内代码哦~

参考：[packages/ant-design-vue/index.ts](https://github.com/yuexiaoliang/table-merge/blob/master/packages/ant-design-vue/index.ts) 或 [packages/element-plus/index.ts](https://github.com/yuexiaoliang/table-merge/blob/master/packages/element-plus/index.ts)

- [ ] Element-UI

- [ ] Ant Design

- [ ] View Design (iview-ui)

- [ ] Naive Ui

理论上来讲，支持设置 `rowspan` 和 `colspan` 的 UI 框架都是可以支持的，期待小伙伴们一起参与建设。

## TODO

- [ ] 友好的说明文档

- [ ] 整合示例项目

- [x] 代码重构优化

- [x] 算法优化
