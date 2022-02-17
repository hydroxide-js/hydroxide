import { Phase, Reactive } from '@nuejs/core'

/**
 * hydrates given text node with given reactive
 * after the current context is connected
 */
export function hydrateText(
  textNode: Text,
  reactive: Reactive<JSX.Primitives>
) {
  const updateTextNode = () => {
    textNode.textContent = '' + reactive.value
  }

  reactive.subscribe(updateTextNode, true, Phase.dom)
}
