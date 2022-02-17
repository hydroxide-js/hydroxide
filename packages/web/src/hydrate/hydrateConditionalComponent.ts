import { Component, PassableProps, Phase, Reactive } from '@nuejs/core'
import { WebContext } from '../context'
import { runComponent } from '../runComponent'

/**
 * renders the component on given marker with given passedProps
 * when passedProps.$if condition becomes true
 * and removes the component if it becomes false
 * in a parentContext in a root
 */
export function hydrateConditionalComponent(
  comp: Component<any>,
  condition: Reactive<boolean>,
  marker: Comment,
  passedProps: PassableProps<any>,
  root: HTMLElement,
  parentContext: WebContext
) {
  let context: WebContext | undefined

  function handleConditionChange() {
    if (condition.value) {
      // should connect
      if (!context) {
        // connecting for the first time
        context = runComponent(comp, passedProps, root, marker, parentContext)
        context.add()
      } else if (!context.isConnected) {
        // reconnecting
        context.connect()
      }
    } else {
      // should disconnect
      if (context && context.isConnected) {
        context.disconnect()
      }
    }
  }

  condition.subscribe(handleConditionChange, true, Phase.connection)
}
