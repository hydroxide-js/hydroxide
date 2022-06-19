import { GlobalInfo } from './types'
export { ErrorBoundary } from './components/Error'
export { List } from './components/List'
export type { ListProps } from './components/List'
export { onConnect } from './hooks/onConnect'
export { onDisconnect } from './hooks/onDisconnect'
export { onError } from './hooks/onError'
export { detect } from './reactive/detector'
export { effect } from './reactive/effect'
export { memo } from './reactive/memo'
export { isReactive, reactive } from './reactive/reactive'
export { batch, batching, invalidate } from './reactive/scheduler'
export { subscribe, unsubscribe } from './reactive/subscribe'
export { Phase } from './types'
export type { Context, GlobalInfo, Path, Reactive } from './types'
export { targetKey } from './utils/targetKey'

export const globalInfo: GlobalInfo = {
  context: null,
  detectorEnabled: false,
  detected: new Set()
}
