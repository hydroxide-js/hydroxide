export function validateSwapArgs<T>(arr: T[], i: number, j: number) {
  const len = arr.length
  if (i >= len || j >= len) {
    throw new Error(
      `Index out of bounds: Can not swap indexes ${i} ${j} in a list of length ${len}`
    )
  }
}
