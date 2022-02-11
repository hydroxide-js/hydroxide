import { Paths, PathTarget } from '../types/path'

export function getter<T, P extends Paths<T>>(
  obj: T,
  path: P
): PathTarget<T, P> {
  // @ts-ignore
  return path.reduce((acc, key) => acc[key], obj)
}

export function setter(
  obj: Record<string | number, any>,
  path: (string | number)[],
  value: any
) {
  let target = obj
  for (let i = 0; i < path.length - 1; i++) {
    target = target[path[i]]
  }

  target[path[path.length - 1]] = value
}

export function drill(
  obj: Record<string | number, any>,
  path: (string | number)[]
): any {
  let target = obj

  path.forEach((key) => {
    if (!target[key]) {
      target[key] = {}
    }
    target = target[key]
  })

  return target
}
