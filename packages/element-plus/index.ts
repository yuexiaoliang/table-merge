import { mergeColumn, mergeRow } from '@table-merge/core';
import type { MergeRange } from '@table-merge/core';

interface SpanMethodProps {
  rowIndex: number;
  columnIndex: number;
}

export default (data: any[], options: string = 'column', range?: MergeRange) => {
  return ({ rowIndex, columnIndex }: SpanMethodProps) => {
    const col = mergeColumn(data, range);
    const row = mergeRow(data, range);

    const result = {
      rowspan: options === 'row' ? row[rowIndex][columnIndex] : 1,
      colspan: options === 'column' ? col[rowIndex][columnIndex] : 1
    };

    return result;
  };
};
