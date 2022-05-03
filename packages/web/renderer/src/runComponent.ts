import type {
  Component,
  GenericPassableProps,
  PassableProps
} from '@nuejs/core'
import { Template } from './createTemplate'
import { globalInfo } from './globalInfo'
import { hydrate } from './hydrate/hydrateTemplate'
import { WebContext } from './WebContext'

/**
 * just runs the component
 * running a component also executes their 'connect' cbs so no need to call them
 * just call add() and afterConnect() after running a component
 */
export function runComponent<P extends GenericPassableProps>(
  comp: Component<P>,
  passedProps: PassableProps<P>,
  parentContext: WebContext | null,
  isLooped = false
) {
  const currentContext = globalInfo.context

  globalInfo.context = parentContext

  const compContext = new WebContext(parentContext)
  globalInfo.context = compContext

  if (isLooped) {
    compContext.isLooped = isLooped
  }

  // @ts-expect-error JSX.Element is converted to ReturnType<Template>
  const { hydrations, template, data } = comp(
    passedProps
  ) as ReturnType<Template>

  const el = template.cloneNode(true) as HTMLElement

  // hydrate and save el to context
  compContext.el = hydrate(el, hydrations, data, compContext)

  // reset context to whatever it was
  globalInfo.context = currentContext

  // return component context
  return compContext
}
