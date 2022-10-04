import { createTableMerge, getTableMerged } from '@table-merge/core';
import type { TableMergeOptions } from '@table-merge/core';

interface SpanMethodProps {
  rowIndex: number;
  columnIndex: number;
}

export interface TableMergeElementPlusOptions extends TableMergeOptions {
  spanType?: SpanTypes;
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
