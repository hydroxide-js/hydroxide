import { NodePath, template, types as t, types } from '@babel/core'
import { AnyHydration } from '../types'
import {
  createTemplate,
  hydrate,
  pureIIFE,
  registerImportMethod,
  uniqueId
} from '../utils/build'
import { getOptimizedDomWalks } from '../utils/domWalker'
import { markAsPure } from '../utils/modify'
import { processJSX } from './processJSX'

/**
 * convert the jsxElement to template hydration
 */
export function transformJSXPath(path: NodePath<types.JSXElement>) {
  const { html, hydrations } = processJSX(path, [])
  return createHydrator(html, hydrations)
}

export function createHydrator(html: string, hydrations: AnyHydration[]) {
  // if a template is only a commment, return the underlying hydration instead of creating unnecessary template
  if (html === '<!>') {
    const hydration = hydrations[0]
    switch (hydration.type) {
      case 'Branch': {
        return t.callExpression(
          registerImportMethod('branch', 'dom'),
          hydration.data
        )
      }
      case 'Comp': {
        return t.callExpression(
          registerImportMethod('component', 'dom'),
          hydration.data
        )
      }
    }
  }

  const templateId = createTemplate(html)

  // templ.cloneNode(true)
  const cloneNodeExpr = t.callExpression(
    t.memberExpression(templateId, t.identifier('cloneNode')),
    [t.identifier('true')]
  )

  // if no hydrations, return the clone of template directly
  if (hydrations.length === 0) {
    return markAsPure(cloneNodeExpr)
  }

  const hydratorBlock = t.blockStatement([])

  // const node1 = value1, node2 = value2, ...
  const nodesToDeclare: [nodeId: t.Identifier, value: t.Expression][] = []

  // root
  const rootNodeId = uniqueId('root')

  // root = tmpl.cloneNode(true)
  nodesToDeclare.push([rootNodeId, cloneNodeExpr])

  // maps a domWalk to it's respective node
  const domWalkNodes: Record<string, t.Identifier> = {
    R: rootNodeId
  }

  function nodeCreator(domWalk: string) {
    // if already created
    if (domWalk in domWalkNodes) return domWalkNodes[domWalk]

    const nodeId = uniqueId('node')
    const subPath = [...domWalk.slice(1)]
      .map((x) => (x === 'F' ? 'firstChild' : 'nextSibling'))
      .join('.')

    const nodeValue = template(`OBJ.${subPath}`)({
      OBJ: domWalkNodes[domWalk[0]]
    }) as t.ExpressionStatement

    // save to record and nodesToDeclare
    domWalkNodes[domWalk] = nodeId
    nodesToDeclare.push([nodeId, nodeValue.expression])

    return nodeId
  }

  const [intermediateDomWalks, targetDomwalks] = getOptimizedDomWalks(
    hydrations.map((h) => h.address)
  )

  // create intermediate nodes
  intermediateDomWalks.forEach((domWalk, i) => {
    domWalkNodes[i] = nodeCreator(domWalk)
  })

  // create target nodes
  const nodeIds = targetDomwalks.map(nodeCreator)

  // declare the nodes
  hydratorBlock.body.push(
    t.variableDeclaration('const', [
      ...nodesToDeclare.map((declaration) => {
        return t.variableDeclarator(declaration[0], declaration[1])
      })
    ])
  )

  // eslint-disable-next-line array-callback-return
  hydrations.forEach((hydration, i) => {
    const node = nodeIds[i]
    switch (hydration.type) {
      case 'StaticAttr': {
        hydratorBlock.body.push(hydrate.staticAttr(node, hydration.data))
        break
      }
      case 'StaticProp': {
        hydratorBlock.body.push(hydrate.staticProp(node, hydration.data))
        break
      }
      case 'MultipleAttr': {
        hydratorBlock.body.push(
          ...hydrate.multipleAttrHydration(node, hydration.data)
        )
        break
      }

      case 'SingleAttr': {
        hydratorBlock.body.push(hydrate.singleAttr(node, hydration.data))
        break
      }

      case 'SingleProp': {
        hydratorBlock.body.push(hydrate.esingleProp(node, hydration.data))
        break
      }

      case 'Branch': {
        hydratorBlock.body.push(hydrate.branch(node, hydration.data))
        break
      }
      case 'Comp': {
        hydratorBlock.body.push(hydrate.component(node, hydration.data))
        break
      }
      case 'Insert': {
        hydratorBlock.body.push(hydrate.insert(node, hydration.data))
        break
      }
      case 'Event': {
        hydratorBlock.body.push(hydrate.event(node, hydration.data))
        break
      }

      case 'Ref': {
        hydratorBlock.body.push(hydrate.ref(node, hydration.data))
        break
      }
    }
  })

  // return the rootNode
  hydratorBlock.body.push(t.returnStatement(rootNodeId))

  // mark the iife as pure and return
  return pureIIFE(hydratorBlock)
}
