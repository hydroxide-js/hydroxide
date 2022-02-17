import { Phase } from '.'
import { globalInfo } from './globalInfo'
import { createReactive, isReactive } from './store/reactive'
import { Component, Renderer } from './types/component'
import { GenericPassableProps, PassableProps, Props } from './types/props'
import { hotFn } from './utils/hotFn'

export function component<P extends GenericPassableProps>(
  renderer: Renderer<P>
): Component<P> {
  // create component from renderer
  function comp(passedProps: PassableProps<P>) {
    const parentContext = globalInfo.context
    const isConditional = passedProps && passedProps.$if

    let props = {} as Props<P>

    // handle prop conversion
    // these props are updated only when the component is connected

    if (passedProps) {
      props = cloneProps(passedProps)
    }

    const context = globalInfo.createContext(comp, props, parentContext)
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

    // subscribe cloned props to the reactive
    Object.keys(props).forEach((propName) => {
      const passedProp = passedProps[propName]

      if (isReactive(passedProp)) {
        const prop = props[propName]

        function updateProp() {
          prop.value = passedProp.value
        }

        passedProp.subscribe(updateProp, false, Phase.props)

        // if the props are on a conditional component,
        // unsubscribe from reactive because no need to keep updating props for a component
        // that is disconnected
        if (isConditional) {
          context.disconnectCbs.push(() => {
            passedProp.unsubscribe(updateProp)
          })
        }
      }
    })

    return renderer(props)
  }

  return comp
}

function cloneProps<P extends GenericPassableProps>(
  passedProps: PassableProps<P>
): Props<P> {
  const props = {} as Props<P>

  Object.keys(passedProps).forEach((key: keyof P) => {
    // ignore framework props
    if (key === '$if') return

    // ignore children
    if (key === 'children') return

    const passedProp = passedProps[key]

    // if the prop is a function, make it a hot function
    if (typeof passedProp === 'function') {
      props[key] = hotFn(passedProp)
    }

    // else if the prop is a reactive, clone it
    else if (isReactive(passedProp)) {
      // @ts-ignore
      props[key] = createReactive(passedProp.value)
    }

    // else if the prop is simple value, create a reactive
    else {
      // @ts-ignore
      props[key] = createReactive(passedProp)
    }
  })

  return props
}
