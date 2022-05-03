import { Component, PassableProps, Phases, Reactive } from '@nuejs/core'
import { runComponent } from '../runComponent'
import { WebContext } from '../WebContext'

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
  passedProps: PassableProps<any> | null,
  parentContext: WebContext
) {
  let context: WebContext | undefined

  function handleConditionChange() {
    if (condition.value) {
      // should connect
      if (!context) {
        // connecting for the first time
        context = runComponent(comp, passedProps, parentContext)
        marker.replaceWith(context.el)
        context.connected()
      } else if (!context.isConnected) {
        // reconnecting
        marker.replaceWith(context.el)
        context.connect()
      }
    } else {
      // should disconnect
      if (context && context.isConnected) {
        context.el.replaceWith(marker)
        context.disconnect()
      }
    }
  }

  condition.subscribe(handleConditionChange, true, Phases.connection)
}
