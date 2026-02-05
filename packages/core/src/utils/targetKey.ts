import { GenericPath } from '../types/others'

type Key = string | symbol | number

export function targetKey<T>(obj: T, path: Key[]): [target: any, key: Key] {
  if (path.length === 1) return [obj, path[0]]
  const lastIndex = path.length - 1

  let target: any = obj
  for (let i = 0; i < lastIndex; i++) {
    target = target[path[i]]
  }

  return [target, path[lastIndex]]
}

export function valueAt<T>(
  obj: T,
  path: GenericPath,
  start = 0,
  end = path.length - 1
): any {
  let target: any = obj
  for (let i = start; i <= end; i++) {
    target = target[path[i]]
  }
  return target
}
