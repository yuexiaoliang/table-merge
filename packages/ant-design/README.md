# @table-merge/ant-design

极佳、极简的 [ant-design](https://github.com/ant-design/ant-design) 表格合并方案。

## Getting Started

**Installation**

```bash
$ npm install @table-merge/ant-design

# or
$ yarn add @table-merge/ant-design

# or
$ pnpm add @table-merge/ant-design
```

## Usage

```jsx
import tableMerge from '@table-merge/ant-design';

const data = [
  { key: 1, a: 8, b: 8, c: 2, d: 0 },
  { key: 2, a: 2, b: 4, c: 4, d: 5 },
  { key: 3, a: 8, b: 8, c: 4, d: 4 },
  { key: 4, a: 5, b: 8, c: 4, d: 1 },
  { key: 5, a: 5, b: 3, c: 3, d: 2 }
];

const columns = [
  { align: 'center', dataIndex: 'key', title: 'ID' },
  { align: 'center', dataIndex: 'a', title: 'A列' },
  { align: 'center', dataIndex: 'b', title: 'B列' },
  { align: 'center', dataIndex: 'c', title: 'C列' },
  { align: 'center', dataIndex: 'd', title: 'D列' }
];

<Table columns={tableMerge(data, cols)} dataSource={data} />;
```

## API

**data**
表格的数据。

**columns**
见 [Table Column - Ant Design](https://ant.design/components/table/#Column)。

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
