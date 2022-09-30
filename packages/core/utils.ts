export function isNumber(data: any): boolean {
  return typeof data === 'number';
}

export function isArray(data: any): boolean {
  return getType(data) === '[object Array]';
}

export function isObject(data: any): boolean {
  return getType(data) === '[object Object]';
}

export function getType(data: any): string {
  return Object.prototype.toString.call(data);
}
