import { Phase, Reactive } from '@nuejs/core'

export function hydrateText(textNode: Text, reactive: Reactive<string>) {
  const updateTextNode = () => {
    textNode.textContent = reactive.value
  }

  reactive.subscribe(updateTextNode, true, Phase.dom)
}
