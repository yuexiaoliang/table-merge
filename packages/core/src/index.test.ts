import { test, expect, describe } from 'vitest';

export const data = [
  { id: 1, a: 0, b: 1, c: 1, d: 0, e: 0 },
  { id: 2, a: 1, b: 0, c: 0, d: 0, e: 1 },
  { id: 3, a: 0, b: 0, c: 0, d: 1, e: 1 },
  { id: 4, a: 0, b: 1, c: 0, d: 1, e: 1 },
  { id: 5, a: 0, b: 0, c: 0, d: 1, e: 1 },
  { id: 6, a: 1, b: 1, c: 1, d: 0, e: 0 },
  { id: 7, a: 1, b: 0, c: 0, d: 0, e: 0 },
  { id: 8, a: 1, b: 1, c: 0, d: 0, e: 0 }
];

export const keys = ['a', 'b', 'c', 'd', 'e'];

test('test', () => {
  expect('a').toBe('a');
});
