import { Phase, Reactive } from '@nuejs/core'
import { addEvent } from '../eventDelegation'

export function hydrateAttribute(
  element: HTMLElement,
  attributeName: string,
  reactive: Reactive<any>,
  root: HTMLElement
) {
  const isBound = attributeName.startsWith('$')
  const name = isBound ? attributeName.substring(1) : attributeName

  function setAttribute() {
    element.setAttribute(name, reactive.value)
  }

  reactive.subscribe(setAttribute, true, Phase.dom)

  if (isBound) {
    const isNumber = typeof reactive.value === 'number'
    const handler = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      reactive.value = isNumber ? Number(value) : value
    }

    addEvent(element, 'input', handler, root)
  }
}
