import { globalInfo as coreInfo } from '@nuejs/core'
import { WebContext } from './context'

type WebGlobalInfo = {
  context: null | WebContext
}

export const globalInfo = coreInfo as WebGlobalInfo
