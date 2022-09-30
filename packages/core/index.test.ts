import { test, expect, describe } from 'vitest';
import { getTableMerged, error, initTable, createTable, createCell, createRow, defaultCell, getRangeStartEnd } from './index';
import { KEYS_TYPE_ERROR, RANGE_TYPE_ERROR } from './constants';

const data = [
  { id: 1, a: 0, b: 1, c: 1, d: 0, e: 0 },
  { id: 2, a: 1, b: 0, c: 0, d: 0, e: 1 },
  { id: 3, a: 0, b: 0, c: 0, d: 1, e: 1 },
  { id: 4, a: 0, b: 1, c: 0, d: 1, e: 1 },
  { id: 5, a: 0, b: 0, c: 0, d: 1, e: 1 },
  { id: 6, a: 1, b: 1, c: 1, d: 0, e: 0 },
  { id: 7, a: 1, b: 0, c: 0, d: 0, e: 0 },
  { id: 8, a: 1, b: 1, c: 0, d: 0, e: 0 }
];

const keys = ['a', 'b', 'c', 'd', 'e'];

describe('error', () => {
  test('option.keys 类型错误', () => {
    // @ts-ignore
    expect(() => error({ keys: 123 })).toThrowError(KEYS_TYPE_ERROR);

    // @ts-ignore
    expect(() => error({ keys: [123, null] })).toThrowError(KEYS_TYPE_ERROR);
  });

  test('option.range 类型错误', () => {
    // @ts-ignore
    expect(() => error({ range: 'abc' })).toThrowError(RANGE_TYPE_ERROR);

    expect(() =>
      error({
        // @ts-ignore
        range: { col: 'abc', row: 2 }
      })
    ).toThrowError(RANGE_TYPE_ERROR);
  });
});

describe('initTable', () => {
  const row = keys.map(() => ({ ...defaultCell }));

  test('initTable => createCell', () => {
    expect(createCell()).toEqual({ ...defaultCell });
  });

  test('initTable => createRow', () => {
    expect(createRow(keys)).toEqual([...row]);
  });

  test('initTable => initTable', () => {
    expect(initTable(data, keys)).toEqual(data.map(() => row));
  });
});

describe('getRangeStartEnd', () => {
  test('option.range = {row: 3, col: 2}', () => {
    let table = initTable(data, keys);
    expect(getRangeStartEnd(table, { row: 3, col: 2 })).toEqual({ rowStart: 3, rowEnd: 8, colStart: 2, colEnd: 5 });
  });

  test('option.range = {row: [2, 7], col: [0, 4]}', () => {
    let table = initTable(data, keys);
    expect(getRangeStartEnd(table, { row: [2, 7], col: [0, 4] })).toEqual({ rowStart: 2, rowEnd: 7, colStart: 0, colEnd: 4 });
  });
});

describe('createTable', () => {
  test('只传 data', () => {
    const table = createTable(data);
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 0, 2, 0, 2],
      [1, 1, 0, 0, 3, 1],
      [1, 0, 0, 3, 0, 2],
      [1, 1, 1, 1, 0, 2],
      [1, 0, 0, 3, 0, 2],
      [1, 0, 0, 3, 0, 2],
      [1, 1, 0, 0, 0, 4],
      [1, 0, 2, 0, 0, 3]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 0, 1],
      [1, 1, 0, 0, 2, 0],
      [1, 0, 2, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [1, 3, 1, 4, 3, 4],
      [1, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [1, 3, 1, 2, 3, 3]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e']}`, () => {
    const table = createTable(data, { keys });
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 0, 2, 0, 2],
      [1, 0, 0, 3, 1],
      [0, 0, 3, 0, 2],
      [1, 1, 1, 0, 2],
      [0, 0, 3, 0, 2],
      [0, 0, 3, 0, 2],
      [1, 0, 0, 0, 4],
      [0, 2, 0, 0, 3]
    ]);
    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 0, 1],
      [1, 0, 0, 2, 0],
      [0, 2, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [3, 1, 4, 3, 4],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [3, 1, 2, 3, 3]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e'], range: { row: 3, col: 2 }}`, () => {
    const table = createTable(data, { keys, range: { row: 3, col: 2 } });

    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 0, 2],
      [1, 1, 1, 0, 2],
      [1, 1, 1, 0, 2],
      [1, 1, 0, 0, 3],
      [1, 1, 0, 0, 3]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0],
      [1, 1, 2, 2, 2],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 2, 3, 3]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e'], range: { row: [1, 4], col: [2, 5] }}`, () => {
    const table = createTable(data, { keys, range: { row: [2, 6], col: [1, 4] } });

    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 3, 3, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);
  });
});
