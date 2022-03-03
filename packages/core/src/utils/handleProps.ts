import { Reactive } from '..'
import { createReactive } from '../apis/createReactive'
import type { ComponentContext } from '../context/ComponentContext'
import { Phases } from '../scheduler/phases'
import type { GenericPassableProps, PassableProps, Props } from '../types/props'

/**
 * for each prop in passedProps object
 * - converts non-reactives to reactives
 * - skips $if
 * - passes children and functions as is
 * - clones reactives
 */
export function handleProps<P extends GenericPassableProps>(
  passedProps: PassableProps<P>,
  context: ComponentContext,
  isConditional: boolean
) {
  const props = {} as Props<P>

  for (const key in passedProps) {
    // $if
    if (key === '$if') continue

    const passedProp = passedProps[key]

    // children
    if (key === 'children' || typeof passedProp === 'function') {
      props[key] = passedProp
    }

    // reactive
    else if (passedProp instanceof Reactive) {
      // @ts-ignore
      props[key] = createReactive(passedProp.value)

      function updateProp() {
        props[key].value = passedProp.value
      }

      // update cloned prop when original prop was updated
      passedProp.subscribe(updateProp, false, Phases.props)

      // when component disconnects, unsubscribe props
      if (isConditional) {
        context.addDisconnectCb(() => {
          passedProp.unsubscribe(updateProp)
        })
      }
    }

    // non-reactive
    else {
      // @ts-expect-error
      props[key] = createReactive(passedProp)
    }
  }

  context.props = props

  return props
}
