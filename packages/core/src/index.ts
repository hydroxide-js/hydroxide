import { GlobalInfo } from './types'
export { ErrorBoundary } from './components/Error'
export { List } from './components/List'
export type { ListProps } from './components/List'
export { connected } from './hooks/connected'
export { disconnected } from './hooks/disconnected'
export { $ } from './reactive/$/$'
export { computed } from './reactive/computed'
export { detect } from './reactive/detector'
export { effect } from './reactive/effect'
export { isReactive, reactive } from './reactive/reactive'
export { schedule } from './reactive/scheduler'
export { subscribe, unsubscribe } from './reactive/subscribe'
export { Phase } from './types'
export type { Context, GlobalInfo, Path, Reactive } from './types'
export { targetKey } from './utils/targetKey'

export const globalInfo: GlobalInfo = {
  context: null,
  detectorEnabled: false,
  detected: new Set()
}
