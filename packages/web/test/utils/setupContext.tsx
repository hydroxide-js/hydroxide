import { component } from '@nuejs/core'
import { WebContext } from '../../src/context'
import { globalInfo } from '../../src/globalInfo'

export function setupContext() {
  const comp = component(() => <div> hello world </div>)
  const prev = globalInfo.context
  const context = new WebContext(comp, {}, null)

  const div = document.createElement('div')
  div.textContent = 'hello word'

  context.el = div

  const set = () => {
    globalInfo.context = context
  }

  const unset = () => {
    globalInfo.context = prev
  }

  return { set, unset, context }
}
