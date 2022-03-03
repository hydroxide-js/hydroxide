import { Paths, PathTarget } from '../types/path'

export function getter<T, P extends Paths<T>>(
  obj: T,
  path: P
): PathTarget<T, P> {
  // @ts-ignore
  return path.reduce((acc, key) => acc[key], obj)
}
