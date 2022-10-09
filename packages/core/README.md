# @table-merge/core

## API

### createTableMerge

根据表格数据创建包含 `rowspan` 以及 `colspan` 的虚拟表格。

**Type:**

```ts
function createTableMerge(data: TableData, options?: TableMergeOptions): CreateTableResult;
```

### getTableMerged

根据虚拟表格获取可用的 `rowspan` 以及 `colspan` 数据。

**Type:**

```ts
function getTableMerged(table: CreateTableResult): number[][][] | null;
function getTableMerged(table: CreateTableResult, spanType: SpanTypes): number[][] | null;
```

## Example

如下是 [@table-merge/element-plus](https://github.com/yuexiaoliang/table-merge/tree/master/packages/element-plus) 的实现：

```ts
import { createTableMerge, getTableMerged } from '@table-merge/core';
import type { TableMergeOptions, TableMergeSpanTypes } from '@table-merge/core';

interface SpanMethodProps {
  rowIndex: number;
  columnIndex: number;
}

export interface TableMergeElementPlusOptions extends TableMergeOptions {
  spanType?: TableMergeSpanTypes;
}

export default (data: any[], options?: TableMergeElementPlusOptions) => {
  const { spanType = 'rowSpan', keys, range } = options || {};

  const table = createTableMerge(data, { keys, range });
  const merged = getTableMerged(table);
  if (!merged) return;

  return ({ rowIndex, columnIndex }: SpanMethodProps) => {
    const cell = merged[rowIndex][columnIndex];

    const result = {
      rowspan: spanType === 'rowSpan' ? cell[0] : 1,
      colspan: spanType === 'colSpan' ? cell[1] : 1
    };
    return result;
  };
};
```

## License

MIT
