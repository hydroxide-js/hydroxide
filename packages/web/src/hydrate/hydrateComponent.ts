import type { BranchProps } from '@nuejs/core'
import { Branch, Reactive } from '@nuejs/core'
import type { ComponentInfo } from '../compInfo'
import { WebContext } from '../context'
import { delegateEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { getDataFromJSX, getNodeByAddress } from '../utils/getNodeByAddress'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateBranch } from './hydrateBranch'
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
      compOut as JSX.HtmlElement,
      dynamic.jsxAddress
    )

    // text
    if ('text' in dynamic) {
      hydrateText(domNode as Text, jsxNode as Reactive<string>)
    }

    // attribute
    else if ('attribute' in dynamic) {
      const reactive = (jsxNode as JSX.HtmlElement).props[dynamic.attribute]
      hydrateAttribute(
        domNode as HTMLElement,
        dynamic.attribute,
        reactive,
        root,
        parentContext!
      )
    }

    // event
    else if ('event' in dynamic) {
      const eventHandler = (jsxNode as JSX.HtmlElement).props[dynamic.propName]
      delegateEvent(
        domNode as HTMLElement,
        dynamic.event,
        eventHandler,
        root,
        parentContext!
      )
    }

    // component
    else if ('comp' in dynamic) {
      const marker = domNode as Comment
      const { props } = jsxNode as JSX.HtmlElement
      const { comp } = dynamic

      if (comp === Branch) {
        hydrateBranch(props as BranchProps, marker, parentContext!, root)
      } else if (dynamic.conditional) {
        const { conditionalEl: ignoreProps } = dynamic
        const condition = props.$if!

        hydrateConditionalComponent(
          comp,
          condition,
          marker,
          ignoreProps ? { $if: condition } : props,
          root,
          parentContext!
        )
      } else {
        runComponent(comp, props, root, marker, parentContext)
      }
    }
  })

  return compEl
}
