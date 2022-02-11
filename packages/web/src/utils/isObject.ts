// function to check if the value is object or not

export function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null
}
