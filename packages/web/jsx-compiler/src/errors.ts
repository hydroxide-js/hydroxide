import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'

export function jsxFragmentError(path: NodePath<t.JSXFragment>) {
  return path.buildCodeFrameError('JSXFragment is not supported')
}

export function jsxSpreadChildError(path: NodePath<t.JSXSpreadChild>) {
  return path.buildCodeFrameError('JSXSpreadChild is not supported')
}
