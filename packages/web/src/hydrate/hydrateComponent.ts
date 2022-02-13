import { Reactive } from '@nuejs/core'
import type { ComponentInfo } from '../compInfo'
import { WebContext } from '../context'
import { addEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { getDataFromJSX, getNodeByAddress } from '../utils/getNodeByAddress'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateConditionalComponent } from './hydrateConditionalComponent'
import { hydrateText } from './hydrateText'

export function hydrateComponent(
  compOut: JSX.Element,
  compInfo: ComponentInfo,
  parentContext: WebContext | null,
  root: HTMLElement
) {
  const { dynamics, template } = compInfo

  const compEl = template.content.cloneNode(true).firstChild as HTMLElement

  const targetNodes = dynamics.map((dynamic) =>
    getNodeByAddress(compEl, dynamic.domAddress)
  )

  dynamics.forEach((dynamic, i: number) => {
    const domNode = targetNodes[i]
    const jsxNode = getDataFromJSX(
      compOut as JSX.NueElement,
      dynamic.jsxAddress
    )

    // text
    if ('text' in dynamic) {
      hydrateText(domNode as Text, jsxNode as Reactive<string>)
    }

    // attribute
    else if ('attribute' in dynamic) {
      const reactive = (jsxNode as JSX.NueElement).props[dynamic.attribute]
      hydrateAttribute(
        domNode as HTMLElement,
        dynamic.attribute,
        reactive,
        root
      )
    }

    // event
    else if ('event' in dynamic) {
      const eventHandler = (jsxNode as JSX.NueElement).props[dynamic.propName]
      addEvent(domNode as HTMLElement, dynamic.event, eventHandler, root)
    }

    // component
    else if ('comp' in dynamic) {
      const marker = domNode as Comment
      if (dynamic.conditional) {
        hydrateConditionalComponent(
          dynamic,
          marker,
          jsxNode,
          root,
          parentContext!
        )
      } else {
        runComponent(dynamic.comp, jsxNode.props, root, marker, parentContext)
      }
    }
  })

  return compEl
}
