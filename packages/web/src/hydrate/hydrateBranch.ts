import {
  component,
  Component,
  createReactive,
  Phase,
  Reactive
} from '@nuejs/core'
import { WebContext } from '..'
import { BranchProps } from '../../../core/src/components/Branch'
import { cloneJSXandRemoveIf } from '../jsxToDOM/jsxHtmlElementToHTML'
import { runComponent } from '../runComponent'

type Branch = {
  comp: Component<any>
  condition: Reactive<boolean>
  props: JSX.props
  context?: WebContext
}

export function hydrateBranch(
  props: BranchProps,
  marker: Comment,
  parentContext: WebContext,
  root: HTMLElement
) {
  const children = props.children as JSX.HtmlElement[]

  const branches = children.map((child) => {
    // @ts-ignore
    const branch: Branch = {}

    branch.condition = child.props.$if || createReactive(true)

    // if element, promote to component so that it can be conditionally rendered
    if (typeof child.type === 'string') {
      // if the child contains condition, remove from child
      const modifiedChild = cloneJSXandRemoveIf(child)
      branch.comp = component(() => modifiedChild)
      branch.props = { $if: branch.condition }
    } else if (typeof child.type === 'function') {
      branch.comp = child.type
      branch.props = child.props
    }

    return branch
  })

  let renderedContext: WebContext | undefined

  function mount(i: number) {
    // do nothing if already rendered
    if (renderedContext && renderedContext === branches[i].context) {
      return
    }

    const { context } = branches[i]

    if (renderedContext) {
      renderedContext.disconnect()
    }

    if (!context) {
      // connecting for the first time
      branches[i].context = runComponent(
        branches[i].comp,
        branches[i].props,
        root,
        marker,
        parentContext
      )

      branches[i].context!.add()
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
