import type {
  Component,
  GenericPassableProps,
  PassableProps
} from '@nuejs/core'
import { componentInfoMap } from './compInfo'
import { WebContext } from './context'
import { globalInfo } from './globalInfo'
import { hydrateComponent } from './hydrate/hydrateComponent'
import { jsxToDOM } from './jsxToDOM/jsxToDOM'
import { createTemplate } from './utils/getNodeByAddress'

/**
 * just runs the component
 * running a component also executes their 'connect' cbs so no need to call them
 * just call add() and afterConnect() after running a component
 */
export function runComponent<P extends GenericPassableProps>(
  comp: Component<P>,
  props: PassableProps<P>,
  root: HTMLElement,
  marker: Comment,
  parentContext: WebContext | null
) {
  const currentContext = globalInfo.context

  // make sure to set the parentContext as globalInfo.context because comp requires it
  globalInfo.context = parentContext
  const jsxElement = comp(props)
  const compContext = globalInfo.context!

  // add marker
  compContext.marker = marker

  // if component's info is not known
  if (!componentInfoMap.has(comp)) {
    // convert jsx to html template and get dynamic parts
    const [html, dynamics] = jsxToDOM(jsxElement)
    // associate it with the component
    componentInfoMap.set(comp, {
      template: createTemplate(html),
      dynamics
    })
  }

  // add el
  compContext.el = hydrateComponent(
    jsxElement,
    componentInfoMap.get(comp)!,
    compContext,
    root
  )
  // reset context to whatever it was
  globalInfo.context = currentContext

  // return component context
  return compContext
}
