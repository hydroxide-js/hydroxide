import { CONNECTION_PHASE, Context, effect, coreInfo } from 'hydroxide'
import { Branch } from '../types'

export function branch(...branches: Branch[]) {
  let marker: Comment
  let renderedContext: Context | undefined
  let renderedEl: HTMLElement | undefined
  const contexts: Context[] = []
  const elements: HTMLElement[] = []

  function add(context: Context, el: HTMLElement) {
    if (renderedContext) {
      // disconnect current rendered context
      if (renderedContext.onDisconnect) {
        renderedContext.onDisconnect.forEach((cb) => cb())
      }
      // replace it with this context
      renderedEl!.replaceWith(el)
    } else {
      // if no rendered context, replace marker
      marker.replaceWith(el)
    }

    renderedContext = context
    renderedEl = el

    if (context.onConnect) {
      context.onConnect!.forEach((cb) => cb())
    }
  }

  function mount(i: number) {
    // ignore if already rendered
    if (renderedContext && renderedContext === contexts[i]) {
      return
    }

    // connect for the first time
    if (!contexts[i]) {
      // create context for conditional element
      const prevContext = coreInfo.context
      coreInfo.context = contexts[i] = { isConnected: true } as Context
      elements[i] = branches[i][1]()
      coreInfo.context = prevContext
      add(contexts[i], elements[i])
    }

    // reconnect
    else {
      add(contexts[i], elements[i])
    }
  }

  function handleConditionChange() {
    let contextIndex = -1

    // render first truthy condition
    for (let i = 0; i < branches.length; i++) {
      if (branches[i][0]()) {
        contextIndex = i
        break
      }
    }

    // don't detect states beyond this point
    coreInfo.detectorEnabled = false

    //  if no context should be rendered, and there is a rendered context, disconnect it
    if (contextIndex === -1) {
      if (renderedContext && renderedEl) {
        // disconnect
        if (renderedContext.onDisconnect) {
          renderedContext.onDisconnect.forEach((cb) => cb())
        }
        renderedEl.replaceWith(marker)
        renderedContext = undefined
        renderedEl = undefined
      }
    } else {
      mount(contextIndex)
    }
  }

  // call all the conditions to get all dependencies
  // noBranch = false, because dependencies will keep increasing and decreasing as the conditions change
  // TODO: use detect instead

  return {
    $$branch: (_marker: Comment) => {
      marker = _marker
      effect(handleConditionChange, CONNECTION_PHASE)
    }
  }
}
