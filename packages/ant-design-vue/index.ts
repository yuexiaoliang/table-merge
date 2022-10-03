import { createTableMerge, getTableMerged } from '@table-merge/core';
import type { TableMergeOptions } from '@table-merge/core';

export default (data: any[], columns: any[], options: TableMergeOptions, spanType: SpanTypes = 'rowSpan') => {
  const table = createTableMerge(data, options);
  const merged = getTableMerged(table);
  if (!merged) return;

  return columns.map((col, colIndex) => {
    return {
      ...col,
      customCell(_: any, rowIndex: number) {
        const result = {
          rowSpan: spanType === 'rowSpan' ? merged[rowIndex][colIndex][0] : 1,
          colSpan: spanType === 'colSpan' ? merged[rowIndex][colIndex][1] : 1
        };
        return result;
      }
    };
  });
};
