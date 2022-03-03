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
