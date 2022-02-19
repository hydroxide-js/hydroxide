import {
  component,
  Component,
  createReactive,
  Phase,
  Reactive
} from '@nuejs/core'
import { WebContext } from '..'
import { runComponent } from '../runComponent'
import { cloneJSXandRemoveIf } from '../utils/cloneJSXandRemoveIf'

type Branch = {
  comp: Component<any>
  condition: Reactive<boolean>
  props: JSX.props
  context?: WebContext
}

export function hydrateBranch(
  children: JSX.HtmlElement[],
  marker: Comment,
  parentContext: WebContext,
  root: HTMLElement
) {
  const branches = children.map((child) => {
    // @ts-ignore
    const branch: Branch = {
      condition: child.$if || createReactive(true)
    }

    const { jsxTag, props } = child

    // conditional element
    if (typeof jsxTag === 'string') {
      const modifiedChild = cloneJSXandRemoveIf(child)
      branch.comp = component(() => modifiedChild)
      branch.props = {}
    }

    // conditional component
    else {
      branch.comp = jsxTag
      branch.props = props
    }

    return branch
  })

  let renderedContext: WebContext | undefined

  function mount(i: number) {
    const { context, comp, props } = branches[i]

    // do nothing if already rendered
    if (renderedContext && renderedContext === context) {
      return
    }

    // disconnect current rendered component
    if (renderedContext) {
      renderedContext.disconnect()
    }

    if (!context) {
      // connecting for the first time
      branches[i].context = runComponent(
        comp,
        props,
        root,
        marker,
        parentContext
      )
    } else {
      branches[i].context!.connect()
    }

    renderedContext = branches[i].context
  }

  function handleConditionChange() {
    let firstTruthyIndex = -1

    // render first truthy
    for (let i = 0; i < branches.length; i++) {
      if (branches[i].condition.value) {
        firstTruthyIndex = i
        break
      }
    }

    if (firstTruthyIndex !== -1) {
      mount(firstTruthyIndex)
    } else if (renderedContext) {
      renderedContext.disconnect()
      renderedContext = undefined
    }
  }

  for (let i = 0; i < branches.length; i++) {
    branches[i].condition.subscribe(
      handleConditionChange,
      true,
      Phase.connection
    )
  }
}
