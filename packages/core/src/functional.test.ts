import { test, expect, describe } from 'vitest';

import { data, keys } from './index.test';
import { TABLE_MERGED_ERROR } from './constants';
import { tableHandler } from './handler';
import { getTableMerged, getRangeStartEnd } from './functional';
import { initTable } from './init';

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

describe('getTableMerged', () => {
  test(`options = { keys: ['a', 'b', 'c', 'd', 'e']}`, () => {
    const table = tableHandler(data, { keys });

    // @ts-ignore
    expect(() => getTableMerged(table, 'abc')).toThrowError(TABLE_MERGED_ERROR);
  });

  test('只传 data', () => {
    const table = tableHandler(data);
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 2, 0, 2, 0],
      [1, 1, 3, 0, 0, 1],
      [1, 3, 0, 0, 2, 0],
      [1, 1, 1, 1, 2, 0],
      [1, 3, 0, 0, 2, 0],
      [1, 3, 0, 0, 2, 0],
      [1, 1, 4, 0, 0, 0],
      [1, 2, 0, 3, 0, 0]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 2, 1],
      [1, 1, 2, 4, 0, 4],
      [1, 3, 0, 0, 3, 0],
      [1, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [1, 3, 1, 1, 3, 3],
      [1, 0, 1, 2, 0, 0],
      [1, 0, 1, 0, 0, 0]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e']}`, () => {
    const table = tableHandler(data, { keys });
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 2, 0, 2, 0],
      [1, 3, 0, 0, 1],
      [3, 0, 0, 2, 0],
      [1, 1, 1, 2, 0],
      [3, 0, 0, 2, 0],
      [3, 0, 0, 2, 0],
      [1, 4, 0, 0, 0],
      [2, 0, 3, 0, 0]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 2, 1],
      [1, 2, 4, 0, 4],
      [3, 0, 0, 3, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [3, 1, 1, 3, 3],
      [0, 1, 2, 0, 0],
      [0, 1, 0, 0, 0]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e'], range: { row: 3, col: 2 }}`, () => {
    const table = tableHandler(data, { keys, range: { row: 3, col: 2 } });
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 2, 0],
      [1, 1, 1, 2, 0],
      [1, 1, 1, 2, 0],
      [1, 1, 3, 0, 0],
      [1, 1, 3, 0, 0]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 2, 2, 2],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 3, 3],
      [1, 1, 2, 0, 0],
      [1, 1, 0, 0, 0]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e'], range: { row: [1, 4], col: [2, 6] }}`, () => {
    const table = tableHandler(data, { keys, range: { row: [2, 6], col: [1, 4] } });
    expect(getTableMerged(table, 'colSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 2, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 2, 0, 1, 1],
      [1, 2, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);

    expect(getTableMerged(table, 'rowSpan')).toEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 3, 3, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);
  });

  test(`options = { keys: ['a', 'b', 'c', 'd', 'e'], range: { row: [1, 4], col: [2, 6] }}`, () => {
    const table = tableHandler(data, { keys, range: { row: [2, 6], col: [1, 4] } });

    expect(getTableMerged(table)).toEqual([
      [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 2],
        [3, 0],
        [3, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1],
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 2],
        [0, 0],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 2],
        [1, 0],
        [1, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
      ]
    ]);
  });
});
