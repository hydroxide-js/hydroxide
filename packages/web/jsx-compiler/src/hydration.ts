import { types as t } from '@babel/core'
import { valueToAST } from './utils/valueToAST'

const $comp = t.identifier('$comp')
const $attr = t.identifier('$attr')
const $insert = t.identifier('$insert')
const $branch = t.identifier('$branch')

// $Comp(path, [$Comp, props, specialProps])
export function componentHydration(
  path: number[],
  arrayExpr: t.ArrayExpression
) {
  return t.expressionStatement(
    t.callExpression($comp, [valueToAST(path), arrayExpr])
  )
}

// ATTR(path, attrObjectExpr)
export function attributeHydration(
  path: number[],
  attrObjectExpr: t.ObjectExpression
) {
  return t.expressionStatement(
    t.callExpression($attr, [valueToAST(path), attrObjectExpr])
  )
}

// INSERT(path, anyExpr)
export function insertHydration(path: number[], anyExpr: t.Expression) {
  return t.expressionStatement(
    t.callExpression($insert, [valueToAST(path), anyExpr])
  )
}

// BRANCH(path, branches)
export function branchHydration(path: number[], branches: t.Expression[]) {
  return t.expressionStatement(
    t.callExpression($branch, [valueToAST(path), ...branches])
  )
}
