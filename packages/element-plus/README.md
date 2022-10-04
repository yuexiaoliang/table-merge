# @table-merge/element-plus

极佳、极简的 [element-plus](https://github.com/element-plus/element-plus) 表格合并方案。

## Getting Started

**Installation**

```bash
$ npm install @table-merge/element-plus

# or
$ yarn add @table-merge/element-plus

# or
$ pnpm add @table-merge/element-plus
```

## Usage

```jsx
import tableMerge from '@table-merge/element-plus';

const data = [
  { id: 1, a: 8, b: 8, c: 2, d: 0 },
  { id: 2, a: 2, b: 4, c: 4, d: 5 },
  { id: 3, a: 8, b: 8, c: 4, d: 4 },
  { id: 4, a: 5, b: 8, c: 4, d: 1 },
  { id: 5, a: 5, b: 3, c: 3, d: 2 }
];

const columns = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'a', label: 'A列', align: 'center' },
  { prop: 'b', label: 'B列', align: 'center' },
  { prop: 'c', label: 'C列', align: 'center' },
  { prop: 'd', label: 'D列', align: 'center' }
];

<el-table :data="data" :span-method="tableMergeElementPlus(data)" border>
  <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
</el-table>
```

## API

**data**
表格的数据。

**options**

- **keys**
  type: `string[]`
  指定 `data` 中哪些列是在 `Table` 中渲染的

- **range**
  type: `number` | `[start: number, end: number]`

  当为 `number` 时，表示合并开始行或列；

  当为 `[start: number, end: number]` 时，表示[合并开始行/列，合并结束行/列]；

- **spanType**
  type: `rowSpan` | `colSpan`
  default: `rowSpan`

  指定要合并行还是合并列

## Examples

![alt examples](./examples.png)
