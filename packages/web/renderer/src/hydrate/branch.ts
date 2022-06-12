import { Context, effect, globalInfo, Phase } from 'hydroxide'
import { isLibDev } from '../env'
import { Branch } from '../types'

export function branch(marker: Comment, ...branches: Branch[]) {
  const context = globalInfo.context!

  let renderedContext: Context | undefined
  let renderedEl: HTMLElement | undefined
  const contexts: Context[] = []
  const elements: HTMLElement[] = []

  function add(el: HTMLElement) {
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
  }

  function mount(i: number) {
    // ignore if already rendered
    if (renderedContext && renderedContext === contexts[i]) {
      return
    }

    // connect for the first time
    if (!contexts[i]) {
      // create it
      contexts[i] = { isConnected: true } as Context
      const branch = branches[i]

      const prevContext = globalInfo.context
      globalInfo.context = contexts[i]
      const renderOutput = branch[1]()

      // if component
      if (Array.isArray(renderOutput)) {
        const [comp, props] = renderOutput
        elements[i] = comp(props || {}) as HTMLElement

        if (isLibDev) {
          elements[i].setAttribute('comp', comp.name)
        }
      }

      // if template
      else {
        elements[i] = renderOutput
      }

      globalInfo.context = prevContext

      // @ts-ignore
      add(contexts[i])
    }

    // reconnect
    else {
      add(elements[i])
      if (contexts[i].onConnect) {
        contexts[i].onConnect!.forEach((cb) => cb())
      }
    }
  }

  function handleConditionChange() {
    let contextIndex = -1

    // render first truthy condition
    for (let i = 0; i < branches.length; i++) {
      const branch = branches[i]

      if (branch[0]()) {
        contextIndex = i
        break
      }
    }

    // don't detect states beyond this point
    globalInfo.detectorEnabled = false

    //  if no context should be rendered, and there is a rendered context, disconnect it
    if (contextIndex === -1) {
      if (renderedContext) {
        if (renderedContext.onDisconnect) {
          renderedContext.onDisconnect.forEach((cb) => cb())
        }
        renderedEl!.replaceWith(marker)
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
  effect(handleConditionChange, Phase.connection)
}
