import { ComponentContext } from '../context/ComponentContext'
import { globalInfo } from '../index'

export function setupContext() {
  const prev = globalInfo.context
  const context = new ComponentContext(null)

  const set = () => {
    globalInfo.context = context
  }

  const unset = () => {
    globalInfo.context = prev
  }

  return { set, unset, context }
}
