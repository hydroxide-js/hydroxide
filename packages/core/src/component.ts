import { globalInfo } from './globalInfo'
import { createReactive, isReactive } from './store/reactive'
import { Component, Renderer } from './types/component'
import { GenericPassableProps, PassableProps, Props } from './types/props'
import { cloneReactive } from './utils/cloneReactive'
import { hotFn } from './utils/hotFn'

function cloneProps<P extends GenericPassableProps>(
  passedProps: PassableProps<P>
): Props<P> {
  const props = {} as Props<P>

  Object.keys(passedProps).forEach((key: keyof P) => {
    const passedProp = passedProps[key]

    // if the prop is a function, make it a hot function
    if (typeof passedProp === 'function') {
      props[key] = hotFn(passedProp)
    }

    // else if the prop is a reactive, clone it
    else if (isReactive(passedProp)) {
      // @ts-ignore
      props[key] = cloneReactive(passedProp)
    }

    // else if the prop is simple value, create a reactive
    else {
      // @ts-ignore
      props[key] = createReactive(passedProp)
    }
  })

  return props
}

export function component<P extends GenericPassableProps>(
  renderer: Renderer<P>
): Component<P> {
  // create component
  const comp = (passableProps: PassableProps<P>) => {
    if (passableProps) {
      const props = cloneProps(passableProps)
      globalInfo.context!.props = props
      return renderer(props)
    } else {
      // @ts-ignore
      return renderer({})
    }
  }

  // return component
  return comp
}
