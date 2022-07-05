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
export { reactive } from './reactive/reactive'
export {
  batch,
  batching,
  invalidate,
  CONNECTION_PHASE,
  LIST_PHASE,
  RENDER_PHASE,
  USER_EFFECT_PHASE
} from './reactive/scheduler'
export { subscribe, unsubscribe } from './reactive/subscribe'
export type { Context, GlobalInfo, Path, Phase, Reactive } from './types'
export { targetKey } from './utils/targetKey'

export const globalInfo: GlobalInfo = {
  context: null,
  detectorEnabled: false,
  detected: new Set()
}
