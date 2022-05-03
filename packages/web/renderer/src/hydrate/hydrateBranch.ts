// import {
//   component,
//   Component,
//   createReactive,
//   PassableProps,
//   Phases,
//   Reactive
// } from '@nuejs/core'
// import { branchData } from '../createTemplate'
// import { runComponent } from '../runComponent'
// import type { WebContext } from '../WebContext'

// type Branch = {
//   comp: Component<any>
//   condition: Reactive<any>
//   props: PassableProps<any>
//   context?: WebContext
// }

// export function hydrateBranch(
//   _branches: branchData[],
//   marker: Comment,
//   parentContext: WebContext,
//   root: HTMLElement
// ) {
//   const branchesInfo = _branches.map((_branch) => {
//     // @ts-ignore
//     const branch: Branch = {
//       condition: _branch[0] === true ? createReactive(true) : _branch[0]
//     }

//     const { jsxTag, props } = _branch

//     // conditional element
//     if (typeof jsxTag === 'string') {
//       const modifiedChild = cloneJSXandRemoveIf(_branch)
//       branch.comp = component(() => modifiedChild)
//       branch.props = {}
//     }

//     // conditional component
//     else {
//       branch.comp = jsxTag
//       branch.props = props
//     }

//     return branch
//   })

//   let renderedContext: WebContext | undefined

//   function mount(i: number) {
//     const { context, comp, props } = branchesInfo[i]

//     // do nothing if already rendered
//     if (renderedContext && renderedContext === context) {
//       return
//     }

//     // disconnect current rendered component
//     if (renderedContext) {
//       renderedContext.disconnect()
//     }

//     if (!context) {
//       // connecting for the first time
//       branchesInfo[i].context = runComponent(comp, props, root, parentContext)
//       marker.replaceWith(branchesInfo[i].context!.el)
//       branchesInfo[i].context?.connected()
//     } else {
//       branchesInfo[i].context!.connect()
//     }

//     renderedContext = branchesInfo[i].context
//   }

//   function handleConditionChange() {
//     let firstTruthyIndex = -1

//     // render first truthy
//     for (let i = 0; i < branchesInfo.length; i++) {
//       if (branchesInfo[i].condition.value) {
//         firstTruthyIndex = i
//         break
//       }
//     }

//     if (firstTruthyIndex !== -1) {
//       mount(firstTruthyIndex)
//     } else if (renderedContext) {
//       renderedContext.disconnect()
//       renderedContext = undefined
//     }
//   }

//   for (let i = 0; i < branchesInfo.length; i++) {
//     branchesInfo[i].condition.subscribe(
//       handleConditionChange,
//       true,
//       Phases.connection
//     )
//   }
// }
