import { test, expect, describe } from 'vitest';

import { getGraph, mergeColumn, mergeRow } from '.';

const data = [
  { a: 8, b: 8, c: 2, d: 0 },
  { a: 2, b: 4, c: 4, d: 5 },
  { a: 8, b: 8, c: 4, d: 4 },
  { a: 5, b: 8, c: 4, d: 4 },
  { a: 5, b: 3, c: 3, d: 3 }
];

describe('getGraph', () => {
  test('utils => getGraph', () => {
    const indexGraph = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ];
    const valueGraph = [
      [8, 8, 2, 0],
      [2, 4, 4, 5],
      [8, 8, 4, 4],
      [5, 8, 4, 4],
      [5, 3, 3, 3]
    ];
    expect(getGraph(data)).toEqual([indexGraph, valueGraph]);
  });
});

describe('methods', () => {
  test('methods => mergeRow', () => {
    const result = [
      [1, 1, 1, 1],
      [1, 1, 3, 1],
      [1, 2, 0, 2],
      [2, 0, 0, 0],
      [0, 1, 1, 1]
    ];
    expect(mergeRow(data)).toEqual(result);
  });

  test('methods => mergeColumn', () => {
    const result = [
      [2, 0, 1, 1],
      [1, 2, 0, 1],
      [2, 0, 2, 0],
      [1, 1, 2, 0],
      [1, 3, 0, 0]
    ];
    expect(mergeColumn(data)).toEqual(result);
  });
});
