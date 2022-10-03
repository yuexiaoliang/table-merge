import { getRangeStartEnd } from './functional';
import { initOptions, initTable } from './init';

export function tableHandler(data: TableData, options?: UserOptions): CreateTableResult {
  const opts = initOptions(data, options || {});

  const { keys, range } = opts;
  if (!keys) return;
  if (data.length === 0) return;

  let table = initTable(data, keys);

  const { rowStart, rowEnd, colStart, colEnd } = getRangeStartEnd(table, range);

  let prevRows: TableCell[] = [];
  let prevCols: TableCell[] = [];

  table.forEach((row, rowIndex) => {
    const dataRow = data[rowIndex];

    row.forEach((cell, colIndex) => {
      cell.value = dataRow[keys[colIndex]];

      if (colIndex >= colStart && colIndex < colEnd && rowIndex >= rowStart && rowIndex < rowEnd) {
        setSpan('rowSpan', prevRows, colIndex, cell);
        setSpan('colSpan', prevCols, rowIndex, cell);
      }
    });
  });

  return table;
}

export function setSpan(spanType: SpanTypes, prevList: TableCell[], prevIndex: number, current: TableCell) {
  const prev = prevList[prevIndex];
  if (!prev) {
    prevList[prevIndex] = current;
    return;
  }

  if (prev.value === current.value) {
    prev[spanType] = prev[spanType] + 1;
    current[spanType] = 0;
  } else {
    prevList[prevIndex] = current;
  }
}
