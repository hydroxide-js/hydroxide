import { componentData, HydrationData } from '../createTemplate'
import { runComponent } from '../runComponent'
import { queryDOM } from '../utils/queryDOM'
import { WebContext } from '../WebContext'
import { delegateEvent, EventHandler } from './eventDelegation'
import { hydrateAttribute } from './hydrateAttribute'
// import { hydrateBranch } from './hydrateBranch'
import { hydrateConditionalComponent } from './hydrateConditionalComponent'
import { hydrateText } from './hydrateText'
import { Hydration, HydrationTypes } from './hydrationTypes'

export function hydrate(
  element: HTMLElement,
  hydrations: Hydration[],
  exprs: HydrationData[],
  context: WebContext | null
) {
  for (let i = 0; i < exprs.length; i++) {
    const expr = exprs[i]
    const hydration = hydrations[i]
    const domNode = queryDOM(element, hydration[1])

    // text
    if (hydration[0] === HydrationTypes.Text) {
      hydrateText(domNode as Text, expr)
    }

    // attribute
    else if (hydration[0] === HydrationTypes.Attr) {
      hydrateAttribute(domNode as HTMLElement, hydration[2], expr, context!)
    }

    // event
    else if (hydration[0] === HydrationTypes.Event) {
      delegateEvent(
        domNode as HTMLElement,
        hydration[2],
        expr as EventHandler,
        context!
      )
    }

    // component
    else if (hydration[0] === HydrationTypes.Comp) {
      const marker = domNode as Comment
      const [comp, props, reservedProps, children] = expr as componentData<any>

      if (reservedProps && reservedProps.$if) {
        hydrateConditionalComponent(
          comp,
          reservedProps.$if,
          marker,
          props,
          context!
        )
      }

      // branch

      // For
      // else if (comp === For) {
      //   const parentAddress = expr.slice(0, -1)

      //   const marker = domNode as Comment

      //   if (parentJSXElement.children!.length !== 1) {
      //     if (process.env.NODE_ENV !== 'production') {
      //       marker.replaceWith(createErrorElement())
      //       // @ts-ignore
      //       window.reportError(
      //         "<For />  must be wrapped in an element with <For /> being it's only child. Example: <ul> <For ... /> </ul>"
      //       )
      //     }
      //   } else {
      //     const parentElement = marker.parentElement!
      //     marker.remove()
      //     hydrateFor(
      //       (jsxNode as JSX.HtmlElement).props as ForProps<any>,
      //       context!,
      //       parentElement,
      //       root
      //     )
      //   }
      // }

      // normal component
      else {
        const compContext = runComponent(comp, props, context)
        marker.replaceWith(compContext.el)
        compContext.connected()
      }
    }
  }

  return element
}
