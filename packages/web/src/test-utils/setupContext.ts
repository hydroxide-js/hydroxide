import { globalInfo } from '../globalInfo'
import { WebContext } from '../WebContext'

export function setupContext() {
  const prev = globalInfo.context
  const context = new WebContext(null)
  context.el = document.createElement('div')

  const set = () => {
    globalInfo.context = context
  }

  const unset = () => {
    globalInfo.context = prev
  }

  return { set, unset, context }
}
