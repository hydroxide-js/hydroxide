import { Phase, Reactive } from '@nuejs/core'
import { WebContext } from '..'
import { delegateEvent } from '../eventDelegation'

const bindAttributes = new Set(['$value', '$checked', '$selected'])

type BoundRealAttributes = 'value' | 'checked'

export function hydrateAttribute(
  element: HTMLElement,
  attributeName: string,
  reactive: Reactive<any>,
  root: HTMLElement,
  context: WebContext
) {
  const isTwoWayBinding = bindAttributes.has(attributeName)

  const name = (
    isTwoWayBinding ? attributeName.substring(1) : attributeName
  ) as BoundRealAttributes

  function setAttribute() {
    if (isTwoWayBinding) {
      // @ts-expect-error
      element[name] = reactive.value
    } else {
      element.setAttribute(name, reactive.value)
    }
  }

  reactive.subscribe(setAttribute, true, Phase.dom)

  if (isTwoWayBinding) {
    // if the state's initial value is number, input value will be converted to number
    const isNumber = typeof reactive.value === 'number'
    const handler = (event: Event) => {
      const value = (event.target as HTMLInputElement)[name]
      reactive.value = isNumber ? Number(value) : value
    }

    delegateEvent(element, 'input', handler, root, context)
  }
}
