import { GlobalInfo } from './types/others'
export { valueAt } from './utils/targetKey'
export { onConnect } from './hooks/onConnect'
export { onDisconnect } from './hooks/onDisconnect'
export { detect } from './reactive/detector'
export { effect } from './reactive/effect'
export { memo } from './reactive/memo'
export { reactive } from './reactive/$'

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
export type { Context, GlobalInfo, Phase, GenericPath, AnyArrayOp } from './types/others'
export type { Reactive, Slice, ReadonlyReactive } from './types/reactive'
export { targetKey } from './utils/targetKey'

export const coreInfo: GlobalInfo = {
  context: null,
  detectorEnabled: false,
  detected: new Set()
}
