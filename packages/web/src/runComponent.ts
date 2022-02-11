import { Component, globalInfo } from '@nuejs/core'
import { GenericPassableProps, PassableProps } from '../../core/src/types/props'
import { hydrateComponent } from './hydrate/hydrateComponent'
import { jsxToDOM } from './jsxToDOM/jsxToDOM'
import { ComponentInfoMap } from './types/renderer'
import { createTemplate } from './utils/getNodeByAddress'

const componentInfoMap: ComponentInfoMap = new Map()

export function runComponent<P extends GenericPassableProps>(
  comp: Component<P>,
  props: PassableProps<P>,
  root: HTMLElement
) {
  // save the previous context
  const currentContext = globalInfo.context

  // create a new context
  // @ts-ignore - props will be set later
  globalInfo.context = {
    comp: comp
  }

  // running the component will add the Props<P> to the globalInfo.context
  const jsxElement = comp(props)

  // reset back to earlier context
  globalInfo.context = currentContext

  // if the component has not been processed earlier
  if (!componentInfoMap.has(comp)) {
    // get the info and set it to the map
    const [html, dynamics] = jsxToDOM(jsxElement)

    componentInfoMap.set(comp, {
      template: createTemplate(html),
      dynamics
    })
  }

  return hydrateComponent(jsxElement, componentInfoMap.get(comp)!, root)
}
