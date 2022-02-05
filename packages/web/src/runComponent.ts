import { computed } from '@nuejs/core'
import { globalInfo } from './globalInfo'
import { hydrateComponent } from './hydrate/hydrateComponent'
import { jsxToHTML } from './jsxToHTML'
import { CompInfoMap, DynamicParts } from './types'
import { createTemplate } from './utils/getNodeByAddress'

const components: CompInfoMap = new Map()

export function runComponent(
  comp: (props: any) => JSX.Element,
  props: Record<string, any> | null,
  root: HTMLElement
) {
  const $props = {}

  if (props) {
    Object.keys(props).forEach((key) => {
      const isFn = typeof props[key] === 'function'
      // @ts-expect-error
      $props[key] = isFn ? computed(props[key]) : $(props[key])
    })
  }

  const currentContext = globalInfo.context

  // set new context while the component runs
  globalInfo.context = {
    comp: comp,
    $props: $props
  }

  const compOutput = comp(props)

  // reset back to earlier context
  globalInfo.context = currentContext

  if (!components.has(comp)) {
    const isFragment = Array.isArray(compOutput) && compOutput[0] === 'fragment'
    const dynamics: DynamicParts = []
    const html = jsxToHTML(compOutput, dynamics)

    components.set(comp, {
      template: createTemplate(html),
      isFragment,
      dynamics
    })
  }

  // get targetNodes before changing the DOM
  return hydrateComponent(compOutput, components.get(comp)!, root)
}
