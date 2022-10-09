# table-merge

极佳、极简、通用的表格合并方案，已提供多个 UI 框架开箱即用。

## 开箱即用的 UI 库

指以针对框架进行进一步封装，直接引用即可使用。

- [x] [Element-UI](https://github.com/yuexiaoliang/table-merge/tree/master/packages/element-ui)

- [x] [Element Plus](https://github.com/yuexiaoliang/table-merge/tree/master/packages/element-plus)

- [x] [Ant Design](https://github.com/yuexiaoliang/table-merge/tree/master/packages/ant-design)

- [x] [Ant Design Vue](https://github.com/yuexiaoliang/table-merge/tree/master/packages/ant-design-vue)

## 计划支持

- [ ] Naive Ui

上列框架计划支持开箱即用，如过需要支持其他框架也可以到 Github 提个 Issue，或者通过 `@table-merge/core` 导出的方法自己封装也可以，参考：[packages/ant-design-vue/index.ts](https://github.com/yuexiaoliang/table-merge/blob/master/packages/ant-design-vue/index.ts) 或 [packages/element-plus/index.ts](https://github.com/yuexiaoliang/table-merge/blob/master/packages/element-plus/index.ts)。

理论上来讲，支持设置 `rowspan` 和 `colspan` 的 UI 框架都是可以支持的，期待小伙伴们一起参与建设。

## 设计思路

参考：[极佳、极简、通用的表格（Table）合并单元格方案](https://zhuanlan.zhihu.com/p/570554694)

## TODO

- [ ] 文档系统

- [x] 整合示例项目

- [x] 代码重构优化

- [x] 算法优化

## License

MIT
