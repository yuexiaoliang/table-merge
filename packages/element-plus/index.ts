import { createTableMerge, getTableMerged } from '@table-merge/core';
import type { TableMergeOptions } from '@table-merge/core';

interface SpanMethodProps {
  rowIndex: number;
  columnIndex: number;
}

export default (data: any[], options?: TableMergeOptions, spanType: SpanTypes = 'rowSpan') => {
  const table = createTableMerge(data, options);
  const merged = getTableMerged(table, spanType);
  if (!merged) return;

  return ({ rowIndex, columnIndex }: SpanMethodProps) => {
    let rowspan = 1;
    let colspan = 1;

    if (spanType === 'rowSpan') {
      rowspan = merged[rowIndex][columnIndex];
    }

    if (spanType === 'colSpan') {
      colspan = merged[rowIndex][columnIndex];
    }

    return { rowspan, colspan };
  };
};
