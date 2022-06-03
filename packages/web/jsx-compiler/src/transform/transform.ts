import { JSXInfo, JSXNodePath } from '../types'
import { jsxFragmentError, jsxSpreadChildError } from '../utils/errors'
import { isPathOf } from '../utils/isPath'
import { handleJSXElement } from './element/handleJSXElement'
import { handleJSXExpressionContainer } from './handleJSXExpressionContainer'

/**
 * process the jsx node at given node address and return the JSXInfo
 */
export function transform(path: JSXNodePath, address: number[]): JSXInfo {
  // JSXText
  if (isPathOf.JSXText(path)) {
    return {
      html: path.node.value,
      hydrations: [],
      type: 'text'
    }
  }

  // JSXElement
  else if (isPathOf.JSXElement(path)) {
    return handleJSXElement(path, address)
  }

  // JSXExpressionContainer
  else if (isPathOf.JSXExpressionContainer(path)) {
    return handleJSXExpressionContainer(path, address)
  }

  // JSXFragment - Error
  else if (isPathOf.JSXFragment(path)) {
    throw jsxFragmentError(path)
  }

  // JSXSpreadChildPath - Error
  else if (isPathOf.JSXSpreadChild(path)) {
    throw jsxSpreadChildError(path)
  }

  // never - Error
  else {
    // @ts-expect-error
    throw path.buildCodeFrameError('Unknown JSX Node')
  }
}