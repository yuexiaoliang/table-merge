import { mergeColumn, mergeRow } from '@table-merge/core';

export default (data: any[], columns: any[], options: string = 'column') => {
  const colMerged = mergeColumn(data);
  const rowMerged = mergeRow(data);

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
