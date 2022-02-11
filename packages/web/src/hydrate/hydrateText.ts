import { Reactive } from '@nuejs/core'

export function hydrateText(textNode: Text, reactive: Reactive<string>) {
  textNode.textContent = reactive.value

  function updateTextNode() {
    textNode.textContent = reactive.value
  }
  reactive.subscribe(updateTextNode)
}
