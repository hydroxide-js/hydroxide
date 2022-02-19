import { Branch, Reactive } from '@nuejs/core'
import { delegateEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { DynamicParts } from '../types/DynamicPart'
import { queryDOM } from '../utils/queryDOM'
import { queryJSX } from '../utils/queryJSX'
import { WebContext } from '../WebContext'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateBranch } from './hydrateBranch'
import { hydrateConditionalComponent } from './hydrateConditionalComponent'
import { hydrateText } from './hydrateText'

export function hydrateTemplate(
  template: HTMLTemplateElement,
  dynamics: DynamicParts,
  jsxElement: JSX.Element,
  context: WebContext | null,
  root: HTMLElement
) {
  const compEl = template.content.cloneNode(true).firstChild as HTMLElement

  const targetNodes = dynamics.map((dynamic) =>
    queryDOM(compEl, dynamic.domAddress)
  )

  dynamics.forEach((dynamic, i: number) => {
    const domNode = targetNodes[i]
    const jsxNode = queryJSX(jsxElement as JSX.HtmlElement, dynamic.jsxAddress)

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
        context!
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
        context!
      )
    }

    // component
    else if ('comp' in dynamic) {
      const marker = domNode as Comment
      const { props, $if, children } = jsxNode as JSX.HtmlElement
      const { comp, conditional, conditionalEl } = dynamic

      // branch
      if (comp === Branch) {
        hydrateBranch(children as JSX.HtmlElement[], marker, context!, root)
      }

      // conditional component
      else if (conditional) {
        hydrateConditionalComponent(
          comp,
          $if!,
          marker,
          conditionalEl ? {} : props,
          root,
          context!
        )
      }

      // normal component
      else {
        runComponent(comp, props, root, marker, context)
      }
    }
  })

  return compEl
}
