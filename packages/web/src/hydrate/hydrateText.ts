import { Phases, Reactive } from '@nuejs/core'

/**
 * hydrates given text node with given reactive
 * after the current context is connected
 */
export function hydrateText(
  textNode: Text,
  reactive: Reactive<JSX.Primitives>
) {
  textNode.textContent = '' + reactive.value

  const updateTextNode = () => {
    textNode.textContent = '' + reactive.value
  }

  reactive.subscribe(updateTextNode, false, Phases.dom)
}
