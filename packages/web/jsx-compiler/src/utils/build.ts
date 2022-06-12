import { NodePath, template, types as t } from '@babel/core'
import { config, requiredImport } from '../config'
import { programInfo } from '../programInfo'
import { Hydration, JSXNode } from '../types'
import { shouldWrap } from './check'
import { isSVGElement } from './elements'
import { markAsPure } from './modify'

export const ids = {
  branch: t.identifier('branch'),
  component: t.identifier('component'),
  attr: t.identifier('attr'),
  insert: t.identifier('insert'),
  effect: t.identifier('effect'),
  svg: t.identifier('svg'),
  template: t.identifier('template'),
  delegateEvents: t.identifier('delegateEvents'),
  children: t.identifier('children')
}

// delegateEvents([...eventsNames])
export function addEventDelegation() {
  if (programInfo.usedEvents.size === 0) return

  const stringExprs = [
    ...[...programInfo.usedEvents].map((name) => t.stringLiteral(name))
  ]

  const delegateEventsCallExpr = t.callExpression(ids.delegateEvents, [
    t.arrayExpression(stringExprs)
  ])

  requiredImport.delegateEvents()
  t.expressionStatement(delegateEventsCallExpr)
  programInfo.path.node.body.push(t.expressionStatement(delegateEventsCallExpr))
}

export function addImports() {
  handleImport(
    programInfo.coreImports,
    programInfo.userImports,
    config.coreImportSource
  )
  handleImport(
    programInfo.domImports,
    programInfo.userImports,
    config.domImportSource
  )
}

function handleImport(
  requiredImports: Set<string>,
  alreadyImported: Set<string>,
  importSource: string
) {
  if (requiredImports.size === 0) return

  const imports = [...requiredImports]
    .filter((name) => !alreadyImported.has(name))
    .sort()

  if (imports.length === 0) return

  const importDeclaration = template(
    `import { ${imports.join(', ')} } from '${importSource}';`
  )

  programInfo.path.unshiftContainer('directives', importDeclaration())
}

export function wrapInGetterMethod(propName: string, expr: t.Expression) {
  return t.objectMethod(
    'get',
    t.identifier(propName),
    [],
    t.blockStatement([t.returnStatement(expr)])
  )
}

export function wrapInArrowIfNeeded(expr: any): t.Expression {
  // convert x() to x, because () => x() === x
  if (
    t.isCallExpression(expr) &&
    t.isIdentifier(expr.callee) &&
    expr.arguments.length === 0
  ) {
    return expr.callee
  }

  if (!shouldWrap(expr)) return expr

  return t.arrowFunctionExpression([], expr)
}

export function convertJSXMembertoMemberExpr(jsxNodePath: NodePath<JSXNode>) {
  const jsxMemberExprPath = jsxNodePath.get(
    'openingElement.name'
  ) as NodePath<t.JSXMemberExpression>
  const statement = template.ast(
    jsxMemberExprPath.getSource()
  ) as t.ExpressionStatement
  const memberExpr = statement.expression as t.MemberExpression
  return memberExpr
}

export function uniqueId(name: string) {
  return programInfo.path.scope.generateUidIdentifier(name)
}

// obj.key = value (expr)
export function memberAssign(
  obj: t.Identifier,
  key: string,
  value: t.Expression
) {
  return t.assignmentExpression(
    '=',
    t.memberExpression(obj, t.identifier(key)),
    value
  )
}

// obj.key = value (statement)
export function memberAssignStatement(
  obj: t.Identifier,
  key: string,
  value: t.Expression
) {
  return t.expressionStatement(memberAssign(obj, key, value))
}

// effect(() => expr, 1)
export function wrapInEffect(expr: t.Expression | t.BlockStatement) {
  requiredImport.effect()
  return t.callExpression(ids.effect, [
    t.arrowFunctionExpression([], expr),
    t.numericLiteral(1)
  ])
}

// id(...args) (statement)
export function callStatement(id: t.Identifier, args: t.Expression[]) {
  return t.expressionStatement(t.callExpression(id, args))
}

// /*#__PURE__*/ (() => block)
export function pureIIFE(block: t.BlockStatement) {
  return markAsPure(t.callExpression(t.arrowFunctionExpression([], block), []))
}

// insert(node, component(Comp, props, specialProps))
export function componentHydration(id: t.Identifier, args: t.Expression[]) {
  requiredImport.component()
  requiredImport.insert()
  return callStatement(ids.insert, [id, t.callExpression(ids.component, args)])
}

// insert(node, expr)
export function insertHydration(id: t.Identifier, anyExpr: t.Expression) {
  requiredImport.insert()
  return t.expressionStatement(t.callExpression(ids.insert, [id, anyExpr]))
}

// insert(node, branch(...branches))
export function branchHydration(id: t.Identifier, branches: t.Expression[]) {
  requiredImport.branch()
  return t.expressionStatement(
    t.callExpression(ids.insert, [id, t.callExpression(ids.branch, branches)])
  )
}

// node.$$eventName = handler
export function eventHydration(
  id: t.Identifier,
  data: [eventName: string, handler: t.Expression]
) {
  const [eventName, handler] = data
  return memberAssignStatement(id, `$$${eventName}`, handler)
}

// StaticAttrHydration
// setAttribute(node, name, value)
export function staticAttrHydration(
  node: t.Identifier,
  data: Hydration.StaticAttr['data']
) {
  requiredImport.attr()
  return callStatement(ids.attr, [node, t.stringLiteral(data.name), data.value])
}

// node.prop = value;
export function staticPropHydration(
  node: t.Identifier,
  data: Hydration.StaticProp['data']
) {
  return memberAssignStatement(node, data.name, data.value)
}

// effect(() => attr(node, name, value) )
export function singleAttrHydration(
  node: t.Identifier,
  data: Hydration.SingleAttr['data']
) {
  requiredImport.attr()
  requiredImport.effect()
  const attrCallExpr = t.callExpression(ids.attr, [
    node,
    t.stringLiteral(data.name),
    data.value
  ])

  return t.expressionStatement(wrapInEffect(attrCallExpr))
}

// StaticPropHydration
// effect(() => node.name = value )
export function singlePropHydration(
  node: t.Identifier,
  data: Hydration.SingleProp['data']
) {
  requiredImport.effect()
  return t.expressionStatement(
    wrapInEffect(memberAssign(node, data.name, data.value))
  )
}

/**
 * let old1, old2;
 * effect(() => {
 *  const new1 = foo(), new2 = bar();
 *  old1 !== new! && $attr(node, 'foo', old2 = new1)
 *  old2 !== new2 && node.bar = old2 = new2
 * }))
 */
export function multipleAttrHydration(
  node: t.Identifier,
  attributes: Hydration.MultipleAttr['data']
): t.Statement[] {
  requiredImport.effect()
  const effectBlock = t.blockStatement([])
  const newValueIds: t.Identifier[] = []
  const prevValueIds: t.Identifier[] = []

  // create identifiers for saving new and prev values
  attributes.forEach(() => {
    newValueIds.push(uniqueId('new'))
    prevValueIds.push(uniqueId('old'))
  })

  // save previous values outside the effect block
  // let old1, old2, old3;
  const prevValueDeclaration = t.variableDeclaration(
    'let',
    prevValueIds.map((prevValueId) => {
      return t.variableDeclarator(prevValueId)
    })
  )

  // new value declarations inside the effect block
  // const new1 = foo(), new2 = bar(), new3 = bazz()
  effectBlock.body.push(
    t.variableDeclaration(
      'const',
      newValueIds.map((newValueId, i) => {
        return t.variableDeclarator(newValueId, attributes[i].value)
      })
    )
  )

  // update the attribute / prop if the old value is different from the new value
  const diffStatements = attributes.map((dataItem, i) => {
    const isProp = dataItem.name.startsWith('prop:')

    if (!isProp) {
      requiredImport.attr()
    }

    const attrName = isProp ? dataItem.name.substring(5) : dataItem.name

    const setAttr = dataItem.name.startsWith('prop:')
      ? '(NODE.NAME = PREV = NEWVALUE)'
      : '$attr(NODE, NAME, PREV = NEWVALUE)'

    return template(`NEWVALUE !== PREV && ${setAttr}`)({
      NEWVALUE: newValueIds[i],
      PREV: prevValueIds[i],
      NODE: node,
      NAME: attrName
    })
  }) as t.ExpressionStatement[]

  effectBlock.body.push(...diffStatements)

  const effectStatement = t.expressionStatement(wrapInEffect(effectBlock))

  return [prevValueDeclaration, effectStatement]
}

export function createTemplate(html: string) {
  const templateId = uniqueId('tmpl')
  const isSVG = isSVGMarkup(html)
  const idName = isSVG ? ids.svg : ids.template
  isSVG ? requiredImport.svg() : requiredImport.template()

  // const _templ = /*#__PURE__*/ $template(markup)  OR
  // const _templ = /*#__PURE__*/ $svg(markup)
  programInfo.path.scope.push({
    id: templateId,
    init: markAsPure(t.callExpression(idName, [t.stringLiteral(html)])),
    kind: 'const'
  })

  return templateId
}

// return true if the markup's root element is an svg element
export function isSVGMarkup(markup: string) {
  let rootEl = ''
  for (let i = 1; i < markup.length; i++) {
    if (markup[i] === ' ' || markup[i] === '>') break
    rootEl += markup[i]
  }

  return isSVGElement(rootEl)
}
