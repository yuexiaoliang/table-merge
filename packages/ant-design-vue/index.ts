import { mergeColumn, mergeRow } from '@table-merge/core';
import type { MergeRange } from '@table-merge/core';

export default (data: any[], columns: any[], options: string = 'column', range?: MergeRange) => {
  const colMerged = mergeColumn(data, range);
  const rowMerged = mergeRow(data, range);

  return columns.map((col, colIndex) => {
    return {
      ...col,
      customCell(_: any, rowIndex: number) {
        const result = {
          rowSpan: options === 'row' ? rowMerged[rowIndex][colIndex] : 1,
          colSpan: options === 'column' ? colMerged[rowIndex][colIndex] : 1
        };
        return result;
      }
    };
  });
};
