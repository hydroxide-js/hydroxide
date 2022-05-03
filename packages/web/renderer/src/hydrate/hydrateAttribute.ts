import { Phases, Reactive } from '@nuejs/core'
import type { WebContext } from '../WebContext'
import { delegateEvent } from './eventDelegation'

const bindAttributes = new Set(['$value', '$checked', '$selected'])

type BoundRealAttributes = 'value' | 'checked'

export function hydrateAttribute(
  element: HTMLElement,
  attributeName: string,
  expr: any,
  context: WebContext
) {
  if (!(expr instanceof Reactive)) {
    element.setAttribute(attributeName, expr)
    return
  }

  const isTwoWayBinding = bindAttributes.has(attributeName)

  const name = (
    isTwoWayBinding ? attributeName.substring(1) : attributeName
  ) as BoundRealAttributes

  function setAttribute() {
    if (isTwoWayBinding) {
      // @ts-expect-error
      element[name] = expr.value
    } else {
      element.setAttribute(name, expr.value)
    }
  }

  expr.subscribe(setAttribute, true, Phases.dom)

  if (isTwoWayBinding) {
    // if the state's initial value is number, input value will be converted to number
    const isNumber = typeof expr.value === 'number'
    const handler = (event: Event) => {
      const value = (event.target as HTMLInputElement)[name]
      expr.value = isNumber ? Number(value) : value
    }

    delegateEvent(element, 'input', handler, context)
  }
}
