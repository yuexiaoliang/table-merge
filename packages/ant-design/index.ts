import { createTableMerge, getTableMerged } from '@table-merge/core';
import type { TableMergeOptions, TableMergeSpanTypes } from '@table-merge/core';

export interface TableMergeAntDesignOptions extends TableMergeOptions {
  spanType?: TableMergeSpanTypes;
}

export default (data: any[], columns: any[], options?: TableMergeAntDesignOptions) => {
  const { spanType = 'rowSpan', keys, range } = options || {};

  const table = createTableMerge(data, { keys, range });
  const merged = getTableMerged(table);
  if (!merged) return;

  return columns.map((col, colIndex) => {
    return {
      ...col,
      onCell(_: any, rowIndex: number) {
        const cell = merged[rowIndex][colIndex];
        const result = {
          rowSpan: spanType === 'rowSpan' ? cell[0] : 1,
          colSpan: spanType === 'colSpan' ? cell[1] : 1
        };
        return result;
      }
    };
  });
};
