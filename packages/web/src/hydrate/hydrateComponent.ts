import { Reactive } from '@nuejs/nue'
import { addEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { CompInfo } from '../types'
import { getDataFromJSX, getNodeByAddress } from '../utils/getNodeByAddress'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateText } from './hydrateText'

export function hydrateComponent(
  compOut: JSX.Element,
  compInfo: CompInfo,
  root: HTMLElement
) {
  const { dynamics, template, isFragment } = compInfo

  const node = template.content.cloneNode(true)

  const targetNodes = dynamics.map((dynamic) =>
    getNodeByAddress(node, dynamic.nodeAddress, isFragment)
  )

  dynamics.forEach((dynamic, i) => {
    const targetNode = targetNodes[i]
    const targetJSXTuple = getDataFromJSX(compOut as JSX.Element, dynamic.nodeAddress)

    // text
    if ('text' in dynamic) {
      hydrateText(targetNode as Comment, targetJSXTuple as Reactive<string>)
    }

    // attribute
    else if ('attribute' in dynamic) {
      const reactive = targetJSXTuple[1][dynamic.attribute]
      hydrateAttribute(targetNode as HTMLElement, dynamic.attribute, reactive, root)
    }

    // event
    else if ('event' in dynamic) {
      const eventHandler = targetJSXTuple[1][dynamic.propName]
      addEvent(targetNode as HTMLElement, dynamic.event, eventHandler, root)
    } else if ('comp' in dynamic) {
      // call the component
      const [comp, props] = targetJSXTuple
      const node = runComponent(comp, props, root)
      ;(targetNode as Comment).replaceWith(node)
    }
  })

  return node
}
