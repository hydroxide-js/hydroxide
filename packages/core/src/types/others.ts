import { Reactive } from './reactive'

declare global {
  // eslint-disable-next-line no-var
  var DEV: boolean
  // eslint-disable-next-line no-var
  var HX_DEV: boolean
}

export type GlobalInfo = {
  context: null | Context
  detectorEnabled: boolean
  detected: Set<Reactive<any>>
}

export type Detector = {
  enabled: boolean
  detected: Set<Reactive<any>>
}

export type Phase = 0 | 1 | 2 | 3 | 4

export type Context = {
  /** tasks to be performed after the component is connected */
  onConnect?: Function[]
  /** tasks to be performed after the component is disconnected */
  onDisconnect?: Function[]
  /** flag indicating whether this context is connected or not */
  isConnected: boolean
}

export type GenericPath = (string | number | symbol)[]

export namespace ArrayOp {
  export type Set = (type: 'set', path: GenericPath | null, value: any) => void
  export type Insert = (type: 'insert', index: number, values: any[]) => void
  export type Remove = (type: 'remove', index: number, count: number) => void
  export type Clear = (type: 'clear') => void
  export type Swap = (type: 'swap', i: number, j: number) => void
}

export type AnyArrayOp =
  | ArrayOp.Set
  | ArrayOp.Insert
  | ArrayOp.Remove
  | ArrayOp.Clear
  | ArrayOp.Swap
