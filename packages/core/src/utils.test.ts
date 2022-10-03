import { test, expect, describe } from 'vitest';
import { isArray, isNumber, isObject } from './utils';

describe('utils', () => {
  const values = [123, 'abc', null, {}, []];

  test('utils => isNumber', () => {
    values.forEach((v, i) => {
      if (i === 0) {
        expect(isNumber(v)).toBeTruthy();
      } else {
        expect(isNumber(v)).toBeFalsy();
      }
    });
  });

  test('utils => isObject', () => {
    values.forEach((v, i) => {
      if (i === 3) {
        expect(isObject(v)).toBeTruthy();
      } else {
        expect(isObject(v)).toBeFalsy();
      }
    });
  });

  test('utils => isArray', () => {
    values.forEach((v, i) => {
      if (i === 4) {
        expect(isArray(v)).toBeTruthy();
      } else {
        expect(isArray(v)).toBeFalsy();
      }
    });
  });
});
