import { NodePath, types } from '@babel/core'

export function jsxFragmentError(path: NodePath<types.JSXFragment>) {
  return path.buildCodeFrameError('JSXFragment is not supported')
}

export function jsxSpreadChildError(path: NodePath<types.JSXSpreadChild>) {
  return path.buildCodeFrameError('JSXSpreadChild is not supported')
}
