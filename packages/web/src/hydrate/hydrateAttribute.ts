import { Reactive } from '@nuejs/nue'
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
    element.setAttribute(name, reactive.val)
  }
  reactive.subscribe(setAttribute, true)

  if (isBound) {
    const handler = (event: Event) => {
      reactive.val = (event.target as HTMLInputElement).value
    }

    addEvent(element, 'input', handler, root)
  }
}
