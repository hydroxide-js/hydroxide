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

export function runComponent<P extends GenericPassableProps>(
  comp: Component<P>,
  props: PassableProps<P>,
  root: HTMLElement,
  marker: Comment,
  parentContext: WebContext | null
) {
  const jsxElement = comp(props)
  const context = globalInfo.context!

  // add marker
  context.marker = marker

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
  context.el = hydrateComponent(
    jsxElement,
    componentInfoMap.get(comp)!,
    context,
    root
  )

  // add component to the DOM
  context.add()

  // reset context to parent context
  globalInfo.context = parentContext

  // return component context
  return context
}
