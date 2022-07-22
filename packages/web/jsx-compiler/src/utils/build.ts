import * as t from '@babel/types'
// @ts-ignore
import { addNamed } from '@babel/helper-module-imports'
import { config } from '../config'
import { programInfo } from '../programInfo'
import { Hydration, JSXNode, Template } from '../types'
import { shouldWrap } from './check'
import { isSVGElement } from './elements'
import { markAsPure } from './modify'
import template from '@babel/template'
import { NodePath } from '@babel/traverse'

export const ids = {
  children: t.identifier('children')
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

export function convertJSXMemberToMemberExpr(jsxNodePath: NodePath<JSXNode>) {
  const jsxMemberExprPath = jsxNodePath.get(
    'openingElement.name'
  ) as NodePath<t.JSXMemberExpression>
  const statement = template.ast(jsxMemberExprPath.getSource()) as t.ExpressionStatement
  const memberExpr = statement.expression as t.MemberExpression
  return memberExpr
}

export function uniqueId(name: string) {
  return programInfo.path.scope.generateUidIdentifier(name)
}

// obj[key] = value or
// obj.key = value
export function memberAssign(obj: t.Identifier, key: string, value: t.Expression) {
  const computed = key.includes('-')
  const keyExpr = computed ? t.stringLiteral(key) : t.identifier(key)
  return t.assignmentExpression('=', t.memberExpression(obj, keyExpr, computed), value)
}

// obj[key] = value (statement)
export function memberAssignStatement(
  obj: t.Identifier,
  key: string,
  value: t.Expression
) {
  return t.expressionStatement(memberAssign(obj, key, value))
}

// effect(() => expr, 1)
export function wrapInEffect(expr: t.Expression | t.BlockStatement) {
  const effectId = registerImportMethod('effect', 'core')
  return t.callExpression(effectId, [
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

export const hydrate = {
  // insert(node, component(Comp, props, specialProps))
  component(id: t.Identifier, args: t.Expression[]) {
    const insertId = registerImportMethod('insert', 'dom')
    const componentId = registerImportMethod('component', 'dom')
    return callStatement(insertId, [id, t.callExpression(componentId, args)])
  },

  // insert(node, expr)
  insert(id: t.Identifier, anyExpr: t.Expression) {
    const insertId = registerImportMethod('insert', 'dom')
    return t.expressionStatement(t.callExpression(insertId, [id, anyExpr]))
  },

  // insert(node, branch(...branches))
  branch(id: t.Identifier, branches: t.Expression[]) {
    const branchId = registerImportMethod('branch', 'dom')
    const insertId = registerImportMethod('insert', 'dom')
    return t.expressionStatement(
      t.callExpression(insertId, [id, t.callExpression(branchId, branches)])
    )
  },

  // ref.current = node
  ref(node: t.Identifier, refId: Hydration.Ref['data']) {
    return memberAssignStatement(refId, 'current', node)
  },

  // node.$$eventName = handler
  event(id: t.Identifier, data: [eventName: string, handler: t.Expression]) {
    const [eventName, handler] = data
    return memberAssignStatement(id, `$$${eventName}`, handler)
  },

  // setAttribute(node, name, value)
  staticAttr(node: t.Identifier, data: Hydration.StaticAttr['data']) {
    const setAttributeId = registerImportMethod('setAttribute', 'dom')
    return callStatement(setAttributeId, [node, t.stringLiteral(data.name), data.value])
  },

  // node.prop = value;
  staticProp(node: t.Identifier, data: Hydration.StaticProp['data']) {
    return memberAssignStatement(node, data.name, data.value)
  },

  // bind(node, name, value)
  bind(node: t.Identifier, data: Hydration.Bind['data']) {
    const bindId = registerImportMethod('bind', 'dom')
    return callStatement(bindId, [node, t.stringLiteral(data.name), data.value])
  },

  // effect(() => setAttribute(node, name, value) )
  singleAttr(node: t.Identifier, data: Hydration.SingleAttr['data']) {
    const setAttributeId = registerImportMethod('setAttribute', 'dom')
    return t.expressionStatement(
      wrapInEffect(
        t.callExpression(setAttributeId, [node, t.stringLiteral(data.name), data.value])
      )
    )
  },

  // StaticPropHydration
  // effect(() => node.name = value )
  singleProp(node: t.Identifier, data: Hydration.SingleProp['data']) {
    return t.expressionStatement(wrapInEffect(memberAssign(node, data.name, data.value)))
  },

  /**
   * let old1, old2;
   * effect(() => {
   *  const new1 = foo(), new2 = bar();
   *  old1 !== new! && $attr(node, 'foo', old2 = new1)
   *  old2 !== new2 && node.bar = old2 = new2
   * }))
   */
  multipleAttrHydration(
    node: t.Identifier,
    attributes: Hydration.MultipleAttr['data']
  ): t.Statement[] {
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
      prevValueIds.map(prevValueId => {
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
      if (dataItem.name.startsWith('prop-')) {
        return template('NEWVALUE !== PREV && (NODE[NAME] = PREV = NEWVALUE)')({
          NEWVALUE: newValueIds[i],
          PREV: prevValueIds[i],
          NODE: node,
          NAME: t.stringLiteral(dataItem.name.substring(5))
        })
      } else {
        return template('NEWVALUE !== PREV && SETATTR(NODE, NAME, PREV = NEWVALUE)')({
          NEWVALUE: newValueIds[i],
          PREV: prevValueIds[i],
          NODE: node,
          NAME: t.stringLiteral(dataItem.name),
          SETATTR: registerImportMethod('setAttribute', 'dom')
        })
      }
    }) as t.ExpressionStatement[]

    effectBlock.body.push(...diffStatements)

    return [prevValueDeclaration, t.expressionStatement(wrapInEffect(effectBlock))]
  }
}

export function createTemplate(html: string) {
  const templateId = uniqueId('tmpl')
  const isSVG = isSVGMarkup(html)
  const idName = isSVG
    ? registerImportMethod('svg', 'dom')
    : registerImportMethod('template', 'dom')

  const templateInfo: Template = {
    id: templateId,
    expr: () => markAsPure(t.callExpression(idName, [t.stringLiteral(html)]))
  }

  programInfo.templates.push(templateInfo)

  // const _tmpl = /*#__PURE__*/ $template(markup)  OR
  // const _tmpl = /*#__PURE__*/ $svg(markup)

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

export function registerImportMethod(name: string, from: 'core' | 'dom') {
  const moduleName = from === 'dom' ? config.domImportSource : config.coreImportSource

  const key = `${moduleName}:${name}`

  if (!programInfo.imports.has(key)) {
    const id = addNamed(programInfo.path, name, moduleName, {
      nameHint: `_${name}`
    })
    programInfo.imports.set(key, id)
    return id
  } else {
    const id = programInfo.imports.get(key)
    // the cloning is required to play well with babel-preset-env which is
    // transpiling import as we add them and using the same identifier causes
    // problems with the multiple identifiers of the same thing
    // (source: dom-expressions)
    return t.cloneNode(id!, true)
  }
}
