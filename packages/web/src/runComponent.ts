import type {
  Component,
  GenericPassableProps,
  PassableProps
} from '@nuejs/core'
import { componentInfoMap } from './compInfo'
import { globalInfo } from './globalInfo'
import { hydrateTemplate } from './hydrate/hydrateTemplate'
import { jsxToDOM } from './jsxToDOM/jsxToDOM'
import { createTemplate } from './utils/createTemplate'
import { WebContext } from './WebContext'

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
  // TODO: run with children as the second argument
  const jsxElement = comp(props)
  const compContext = globalInfo.context!

  // add marker
  compContext.marker = marker

  // processing this component for the first time
  if (!componentInfoMap.has(comp)) {
    // convert jsx to html template and get dynamic parts
    const [html, dynamics] = jsxToDOM(jsxElement)
    // associate it with the component
    componentInfoMap.set(comp, {
      template: createTemplate(html),
      dynamics
    })
  }

  const { template, dynamics } = componentInfoMap.get(comp)!
  // hydrate and save el to context
  compContext.el = hydrateTemplate(
    template,
    dynamics,
    jsxElement,
    compContext,
    root
  )

  // reset context to whatever it was
  globalInfo.context = currentContext

  // add the context
  compContext.add()

  // return component context
  return compContext
}
