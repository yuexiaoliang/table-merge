import { TableData, OptionsKeys, Table, TableCell, TableRow, UserOptions, OptionsResolved } from '../types';
import { KEYS_TYPE_ERROR, RANGE_TYPE_ERROR } from './constants';
import { isArray, isObject, isNumber } from './utils';

export const defaultCell = {
  rowSpan: 1,
  colSpan: 1,
  value: null
};

export function initTable(data: TableData, keys: OptionsKeys): Table {
  const createCell = (): TableCell => ({ ...defaultCell });
  const createRow = (): TableRow => Array.from({ length: keys.length }, createCell);

  return Array.from({ length: data.length }, () => createRow());
}

export function initOptions(data: TableData, option: UserOptions): OptionsResolved {
  const { keys, range = {} } = option;

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

    if ((row && !isNumber(row) && !isArray(row)) || (col && !isNumber(col) && !isArray(col))) {
      throw new TypeError(RANGE_TYPE_ERROR);
    }
  }

  const { row, col } = range;
  return {
    keys: keys || Object.keys(data[0]),
    range: {
      row: row || 0,
      col: col || 0
    }
  };
}
