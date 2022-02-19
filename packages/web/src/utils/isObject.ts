/**
 * returns true if the given value is object
 */
export function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null
}
