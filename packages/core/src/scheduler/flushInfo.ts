type FlushInfo = {
  resolve: null | (() => void)
  promise: Promise<void> | null
  id: number
}

export const flushInfo: FlushInfo = {
  resolve: null,
  promise: null,
  id: 0
}

export function isFlushed() {
  flushInfo.id++
  if (flushInfo.resolve) {
    flushInfo.resolve()
    flushInfo.promise = null
  }
}
