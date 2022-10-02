import { KEYS_TYPE_ERROR, RANGE_TYPE_ERROR, TABLE_MERGED_ERROR } from './constants';
import { isArray, isObject, isNumber } from './utils';

type RangeValue = number | [number, number];

interface OptionRange {
  row?: RangeValue;
  col?: RangeValue;
}

type OptionRangeIntact = Required<OptionRange>;

type OptionKeys = (string | number)[];

interface Option {
  keys?: OptionKeys;
  range?: OptionRange;
}

interface OptionIntact {
  keys: OptionKeys;
  range: OptionRangeIntact;
}

interface ListItem {
  [key: string]: any;
}

type List = ListItem[];

interface TableCell {
  rowSpan: number;
  colSpan: number;
  value: any;
}

type SpanTypes = keyof Omit<TableCell, 'value'>;

type TableRow = TableCell[];
type Table = TableRow[];

type Result = Table | null | undefined;

interface RangeStartEnd {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export const defaultCell = {
  rowSpan: 1,
  colSpan: 1,
  value: null
};

export function createCell(): TableCell {
  return { ...defaultCell };
}

export function createRow(keys: OptionKeys): TableRow {
  return Array.from({ length: keys.length }, createCell);
}

export function initTable(list: List, keys: OptionKeys): Table {
  return Array.from({ length: list.length }, () => createRow(keys));
}

export function setCell(type: SpanTypes, prev: ListItem, current: ListItem) {
  if (prev.value !== current.value) return;

  current[type] = prev[type] + 1;
  prev[type] = 0;
}

export function getRangeStartEnd(table: Table, range: OptionRangeIntact): RangeStartEnd {
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

export function error(option: Option) {
  const { keys, range } = option;

  if (keys) {
    if (!isArray(keys)) {
      throw new TypeError(KEYS_TYPE_ERROR);
    }

    if (keys.some((v) => !['string', 'number'].includes(typeof v))) {
      throw new TypeError(KEYS_TYPE_ERROR);
    }
  }

  if (range) {
    if (!isObject(range)) {
      throw new TypeError(RANGE_TYPE_ERROR);
    }

    const { row, col } = range;

    if ((!isNumber(row) && !isArray(row)) || (!isNumber(col) && !isArray(col))) {
      throw new TypeError(RANGE_TYPE_ERROR);
    }
  }
}

export function createIntactOption(list: List, option: Option): OptionIntact {
  error(option);

  const { keys, range = {} } = option;

  return {
    keys: keys || Object.keys(list[0]),
    range: {
      row: range.row || 0,
      col: range.col || 0
    }
  };
}

export function createTable(list: List, option: Option = {}): Result {
  const opts = createIntactOption(list, option);

  const { keys, range } = opts;
  if (!keys) return;
  if (list.length === 0) return;

  let table = initTable(list, keys);

  const { rowStart, rowEnd, colStart, colEnd } = getRangeStartEnd(table, range);

  table.forEach((row, rowIndex) => {
    const rowData = list[rowIndex];

    row.forEach((cell, colIndex) => {
      cell.value = rowData[keys[colIndex]];

      let prevColCell = null;
      let prevRowCell = null;

      if (colIndex >= colStart && colIndex < colEnd && rowIndex >= rowStart && rowIndex < rowEnd) {
        if (colIndex > colStart) prevColCell = table[rowIndex][colIndex - 1];
        if (rowIndex > rowStart) prevRowCell = table[rowIndex - 1][colIndex];

        if (prevColCell !== null) setCell('colSpan', prevColCell, cell);
        if (prevRowCell !== null) setCell('rowSpan', prevRowCell, cell);
      }
    });
  });

  return table;
}

export function getTableMerged(table: Result, type?: SpanTypes) {
  if (!table) return;

  if (type) {
    if (type !== 'rowSpan' && type !== 'colSpan') {
      throw new TypeError(TABLE_MERGED_ERROR);
    }
    return table.map((row) => row.map((cell) => cell[type]));
  }

  return table.map((row) =>
    row.map((cell) => {
      return [cell['rowSpan'], cell['colSpan']];
    })
  );
}
