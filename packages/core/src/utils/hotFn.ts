export type HotFn<T> = T & { fn: T }

/** hot function is a function which has hot-swapable implementation */

/** create a hot function of given function */
export function hotFn<T extends Function>(fn: T): HotFn<T> {
  // @ts-ignore
  const x = (...args) => x.fn(...args)
  x.fn = fn
  return x as never as HotFn<T>
}
