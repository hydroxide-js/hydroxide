import { Phase } from '@nuejs/core'
import { WebContext } from '../context'
import { runComponent } from '../runComponent'
import { DynamicPart } from '../types/DynamicPart'

export function hydrateConditionalComponent(
  dynamic: DynamicPart.Component,
  marker: Comment,
  jsxNode: any,
  root: HTMLElement,
  parentContext: WebContext
) {
  let context: WebContext
  let isInit = false
  let isMounted = false

  // don't use props.$if as condition
  // condition reactive should be calculated in clone phase, so it should be a clone

  const condition = (jsxNode as JSX.NueElement).props.$if!

  function init() {
    isInit = true
    context = runComponent(
      dynamic.comp,
      jsxNode.props,
      root,
      marker,
      parentContext
    )
  }

  function mount() {
    isMounted = true
    if (!isInit) return init()
    context.add()
    context.connect()
  }

  function unMount() {
    isMounted = false
    context.disconnect()
    context.remove()
  }

  function handleConditionChange() {
    if (condition.value) {
      if (!isMounted) mount()
    } else {
      if (isMounted) unMount()
    }
  }

  condition.subscribe(handleConditionChange, true, Phase.connection)
}
