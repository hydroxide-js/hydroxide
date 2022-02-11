import { Component, Reactive } from '@nuejs/core'
import { addEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { ComponentInfo } from '../types/renderer'
import { getDataFromJSX, getNodeByAddress } from '../utils/getNodeByAddress'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateText } from './hydrateText'

export function hydrateComponent(
  compOut: JSX.Element,
  compInfo: ComponentInfo,
  root: HTMLElement
) {
  const { dynamics, template } = compInfo

  const node = template.content.cloneNode(true)

  // console.log(template)
  // console.log(dynamics)

  const targetNodes = dynamics.map((dynamic) =>
    getNodeByAddress(node, dynamic.domAddress)
  )

  dynamics.forEach((dynamic, i) => {
    const targetNode = targetNodes[i]
    const targetJSXTuple = getDataFromJSX(
      compOut as JSX.NueElement,
      dynamic.jsxAddress
    )

    // text
    if ('text' in dynamic) {
      hydrateText(targetNode as Text, targetJSXTuple as Reactive<string>)
    }

    // attribute
    else if ('attribute' in dynamic) {
      const reactive = (targetJSXTuple as JSX.NueElement).props[
        dynamic.attribute
      ]
      hydrateAttribute(
        targetNode as HTMLElement,
        dynamic.attribute,
        reactive,
        root
      )
    }

    // event
    else if ('event' in dynamic) {
      const eventHandler = (targetJSXTuple as JSX.NueElement).props[
        dynamic.propName
      ]
      addEvent(targetNode as HTMLElement, dynamic.event, eventHandler, root)
    } else if ('comp' in dynamic) {
      // call the component
      const { type, props } = targetJSXTuple as JSX.NueElement
      const node = runComponent(type as Component<any>, props, root)
      ;(targetNode as Comment).replaceWith(node)
    }
  })

  return node
}
