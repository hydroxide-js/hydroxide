import { Reactive } from '@nuejs/core'
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
  reactive.subscribe(setAttribute, true)

  if (isBound) {
    const handler = (event: Event) => {
      reactive.value = (event.target as HTMLInputElement).value
    }

    addEvent(element, 'input', handler, root)
  }
}
