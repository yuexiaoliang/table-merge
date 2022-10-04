import { CreateTableResult, ListItem, OptionsRange, RangeStartEnd, SpanTypes, Table } from '../types';
import { TABLE_MERGED_ERROR } from './constants';

export function getTableMerged(table: CreateTableResult): number[][][] | null;
export function getTableMerged(table: CreateTableResult, spanType: SpanTypes): number[][] | null;
export function getTableMerged(table: CreateTableResult, spanType?: SpanTypes) {
  if (!table) return null;

  if (!spanType) {
    const result = table.map((row) => row.map((cell) => [cell['rowSpan'], cell['colSpan']]));

    return result;
  }

  if (spanType !== 'rowSpan' && spanType !== 'colSpan') {
    throw new TypeError(TABLE_MERGED_ERROR);
  }

  const result = table.map((row) => row.map((cell) => cell[spanType]));
  return result;
}

export function getRangeStartEnd(table: Table, range: Required<OptionsRange>): RangeStartEnd {
  const { row: rowRange, col: colRange } = range;

  let colStart = 0;
  let colEnd = table[0].length;

  let rowStart = 0;
  let rowEnd = table.length;

  if (typeof colRange === 'number') {
    colStart = colRange;
  }

  if (Array.isArray(colRange)) {
    const [s, e] = colRange;
    colStart = s;
    colEnd = e;
  }

  if (typeof rowRange === 'number') {
    rowStart = rowRange;
  }

  if (Array.isArray(rowRange)) {
    const [s, e] = rowRange;
    rowStart = s;
    rowEnd = e;
  }

  return { rowStart, rowEnd, colStart, colEnd };
}

export function setSpan(type: SpanTypes, prev: ListItem, current: ListItem) {
  if (prev.value !== current.value) {
    return;
  }

  current[type] = 0;
  prev[type] = prev[type] + 1;
}
