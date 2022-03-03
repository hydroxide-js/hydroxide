import { Branch, For, ForProps, Reactive } from '@nuejs/core'
import { createErrorElement } from '../devMode'
import { delegateEvent } from '../eventDelegation'
import { runComponent } from '../runComponent'
import { DynamicParts } from '../types/DynamicPart'
import { queryDOM } from '../utils/queryDOM'
import { queryJSX } from '../utils/queryJSX'
import { WebContext } from '../WebContext'
import { hydrateAttribute } from './hydrateAttribute'
import { hydrateBranch } from './hydrateBranch'
import { hydrateConditionalComponent } from './hydrateConditionalComponent'
import { hydrateFor } from './hydrateFor'
import { hydrateText } from './hydrateText'

export function hydrateTemplate(
  templateElement: HTMLElement,
  dynamics: DynamicParts,
  jsxElement: JSX.Element,
  context: WebContext | null,
  root: HTMLElement
) {
  const compEl = templateElement.cloneNode(true) as HTMLElement

  for (let i = 0; i < dynamics.length; i++) {
    const dynamic = dynamics[i]
    const domNode = queryDOM(compEl, dynamic.domAddress)
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

      // For
      else if (comp === For) {
        const parentAddress = dynamic.jsxAddress.slice(0, -1)
        const parentJSXElement = queryJSX(
          jsxElement as JSX.HtmlElement,
          parentAddress
        ) as JSX.HtmlElement

        const _domNode = domNode as Comment

        if (parentJSXElement.children!.length !== 1) {
          if (process.env.NODE_ENV !== 'production') {
            _domNode.replaceWith(createErrorElement())
            // @ts-ignore
            window.reportError(
              "<For />  must be wrapped in an element with <For /> being it's only child. Example: <ul> <For ... /> </ul>"
            )
          }
        } else {
          const parentElement = _domNode.parentElement!
          _domNode.remove()
          hydrateFor(
            (jsxNode as JSX.HtmlElement).props as ForProps<any>,
            context!,
            parentElement,
            root
          )
        }
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
        const compContext = runComponent(comp, props, root, context)
        marker.replaceWith(compContext.el)
        compContext.connected()
      }
    }
  }

  return compEl
}
