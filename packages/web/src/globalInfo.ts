import { globalInfo as coreInfo } from '@nuejs/core'
import { NueWebPlugin } from '../plugins'
import { WebContext } from './context'

type WebGlobalInfo = {
  context: null | WebContext
  plugins?: NueWebPlugin[]
}

export const globalInfo = coreInfo as WebGlobalInfo
