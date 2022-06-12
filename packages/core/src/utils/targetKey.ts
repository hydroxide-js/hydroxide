type Key = string | number
type Obj = Record<Key, any>

export function targetKey(obj: Obj, path: Key[]): [target: Obj, key: Key] {
  if (path.length === 1) return [obj, path[0]]
  const lastIndex = path.length - 1

  let target = obj
  for (let i = 0; i < lastIndex; i++) {
    target = target[path[i]]
  }

  return [target, path[lastIndex]]
}
