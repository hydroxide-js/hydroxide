import { Phases, Reactive } from '@nuejs/core'

/**
 * hydrates given text node with given reactive
 * after the current context is connected
 */
export function hydrateText(textNode: Text, expression: any) {
  if (expression instanceof Reactive) {
    textNode.textContent = '' + expression.value

    const updateTextNode = () => {
      textNode.textContent = '' + expression.value
    }

    expression.subscribe(updateTextNode, false, Phases.dom)
  } else {
    textNode.textContent = '' + expression
  }
}
