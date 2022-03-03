import { globalInfo } from '../context/globalInfo'
import { Component, Renderer } from '../types/component'
import { GenericPassableProps, PassableProps, Props } from '../types/props'
import { handleProps } from '../utils/handleProps'

export function component<P extends GenericPassableProps>(
  renderer: Renderer<P>
): Component<P> {
  // create component from renderer
  function comp(passedProps: PassableProps<P> | null) {
    const context = globalInfo.context!
    const isConditional = Boolean(passedProps && passedProps.$if)
    const { parent } = context

    // TODO: may be do the same for conditionals?
    if (parent && !('isLooped' in context)) {
      // when parent is disconnected, children also needs to be disconnected
      parent.addDisconnectCb(() => {
        context.disconnect()
      })
      // when parent is reconnected, children also needs to be reconnected
      // unless it's a conditional component, in which case it's connection will be handled by it's condition
      if (!isConditional) {
        parent.addConnectCb(() => {
          context.connect()
        })
      }
    }

    const props = passedProps
      ? handleProps(passedProps, context, isConditional)
      : ({} as Props<P>)

    return renderer(props)
  }

  return comp
}
