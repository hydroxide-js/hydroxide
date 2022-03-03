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
