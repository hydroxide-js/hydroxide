import { ComponentContext } from './context'

export type GlobalInfo = {
  context: null | ComponentContext
  createContext: (parentContext: ComponentContext | null) => ComponentContext
}

export const globalInfo: GlobalInfo = {
  context: null,
  // this should be replaced by the renderer
  createContext: (parentContext) => new ComponentContext(parentContext)
}
