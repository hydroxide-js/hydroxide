type FlushInfo = {
  resolve: null | (() => void)
  promise: Promise<void> | null
}

export const flushInfo: FlushInfo = {
  resolve: null,
  promise: null
}

export function isFlushed() {
  if (flushInfo.resolve) {
    flushInfo.resolve()
    flushInfo.promise = null
  }
}
