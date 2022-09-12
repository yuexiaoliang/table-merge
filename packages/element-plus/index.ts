import { mergeColumn, mergeRow } from '@table-merge/core';

interface SpanMethodProps {
  rowIndex: number;
  columnIndex: number;
}

export default (data: any[], options: string = 'column') => {
  return ({ rowIndex, columnIndex }: SpanMethodProps) => {
    const col = mergeColumn(data);
    const row = mergeRow(data);

    const result = {
      rowspan: options === 'row' ? row[rowIndex][columnIndex] : 1,
      colspan: options === 'column' ? col[rowIndex][columnIndex] : 1
    };

    return result;
  };
};
