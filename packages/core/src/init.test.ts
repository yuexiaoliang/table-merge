import { test, expect, describe } from 'vitest';
import { initTable, initOptions, defaultCell } from './init';
import { KEYS_TYPE_ERROR, RANGE_TYPE_ERROR } from './constants';
import { keys, data } from './index.test';

describe('initTable', () => {
  const row = keys.map(() => ({ ...defaultCell }));

  test('initTable => initTable', () => {
    expect(initTable(data, keys)).toEqual(data.map(() => row));
  });
});

describe('initOptions', () => {
  test('option.keys => error', () => {
    // @ts-ignore
    expect(() => initOptions(data, { keys: 123 })).toThrowError(KEYS_TYPE_ERROR);

    // @ts-ignore
    expect(() => initOptions(data, { keys: [123, null] })).toThrowError(KEYS_TYPE_ERROR);
  });

  test('option.range => error', () => {
    // @ts-ignore
    expect(() => initOptions(data, { range: 'abc' })).toThrowError(RANGE_TYPE_ERROR);

    expect(() =>
      // @ts-ignore
      initOptions(data, { range: { col: 'abc', row: 2 } })
    ).toThrowError(RANGE_TYPE_ERROR);
  });
});
