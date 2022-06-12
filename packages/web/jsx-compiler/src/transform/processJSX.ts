import { jsxFragmentError, jsxSpreadChildError } from '../errors'
import { JSXInfo, JSXNodePath } from '../types'
import { isPathOf } from '../utils/check'
import { escape } from '../utils/process'
import { processExpressionContainer } from './element/processExpressionContainer'
import { processJSXElement } from './processJSXElement'

/**
 * process the jsx node at given node address and return the JSXInfo
 */
export function processJSX(path: JSXNodePath, address: number[]): JSXInfo {
  // JSXText
  if (isPathOf.JSXText(path)) {
    return {
      html: escape(path.node.value),
      hydrations: [],
      type: 'text'
    }
  }

  // JSXElement
  else if (isPathOf.JSXElement(path)) {
    return processJSXElement(path, address)
  }

  // JSXExpressionContainer
  else if (isPathOf.JSXExpressionContainer(path)) {
    return processExpressionContainer(path, address)
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
