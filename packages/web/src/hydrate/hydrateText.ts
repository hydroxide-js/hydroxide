import { Reactive } from '@nuejs/nue'

export function hydrateText(marker: Comment, reactive: Reactive<string>) {
  const textNode = document.createTextNode(reactive.val)
  marker.replaceWith(textNode)

  function updateTextNode() {
    textNode.textContent = reactive.val
  }
  reactive.subscribe(updateTextNode)
}
