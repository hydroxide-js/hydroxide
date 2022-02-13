import { Phase } from '.'
import { globalInfo } from './globalInfo'
import { createReactive, isReactive } from './store/reactive'
import { Component, Renderer } from './types/component'
import { GenericPassableProps, PassableProps, Props } from './types/props'
import { hotFn } from './utils/hotFn'

export function component<P extends GenericPassableProps>(
  renderer: Renderer<P>
): Component<P> {
  function comp(passedProps: PassableProps<P>) {
    const isConditional = passedProps && passedProps.$if
    let props = {} as Props<P>

    // handle prop conversion
    // these props are updated only when the component is connected

    if (passedProps) {
      props = cloneProps(passedProps)
    }

    // handle context stuff
    const parentContext = globalInfo.context

    const context = globalInfo.createContext(comp, props, parentContext)
    globalInfo.context = context

    if (parentContext) {
      parentContext.onDisconnect(() => {
        context.disconnect()
      })

      if (!isConditional) {
        parentContext.onConnect(() => {
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

        if (isConditional) {
          context.onDisconnect(() => {
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
