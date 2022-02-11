import { Reactive } from '@nuejs/core'

export function hydrateText(textNode: Text, reactive: Reactive<string>) {
  textNode.textContent = reactive.val

  function updateTextNode() {
    textNode.textContent = reactive.val
  }
  reactive.subscribe(updateTextNode)
}
