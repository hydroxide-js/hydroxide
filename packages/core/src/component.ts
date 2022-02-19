import { globalInfo } from './globalInfo'
import { Component, Renderer } from './types/component'
import { GenericPassableProps, PassableProps, Props } from './types/props'
import { handleProps } from './utils/handleProps'

export function component<P extends GenericPassableProps>(
  renderer: Renderer<P>
): Component<P> {
  // create component from renderer
  function comp(passedProps: PassableProps<P> | null) {
    const parentContext = globalInfo.context
    const isConditional = Boolean(passedProps && passedProps.$if)

    const context = globalInfo.createContext(parentContext)
    globalInfo.context = context

    if (parentContext) {
      // when parent is disconnected, children also needs to be disconnected
      parentContext.disconnectCbs.push(() => {
        context.disconnect()
      })

      // when parent is reconnected, children also needs to be reconnected
      // unless it's a conditional component, in which case it's connection will be handled by it's condition
      if (!isConditional) {
        parentContext.connectCbs.push(() => {
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
