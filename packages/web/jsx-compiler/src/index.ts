import * as t from '@babel/types'
import { Visitor, NodePath } from '@babel/traverse'
// @ts-ignore
import SyntaxJSX from '@babel/plugin-syntax-jsx'
// @ts-ignore
import validateJSXNesting from 'babel-plugin-validate-jsx-nesting'
import { jsxFragmentError, jsxSpreadChildError } from './errors'
import { programInfo } from './programInfo'
import { transformJSXPath } from './transform/transformJSX'
import { addEventDelegation } from './utils/build'

const jsxToTemplate: Visitor<{}> = {
  JSXElement(path) {
    path.traverse(validateJSXNesting({ types: t }).visitor)

    // transform jsxElement inside expression container that are skipped by jsxElement visitor
    path.traverse({
      JSXExpressionContainer(path) {
        path.traverse(jsxToTemplate)
      }
    })

    // replace jsxElement with template
    path.replaceWith(transformJSXPath(path))

    // do not go inside (not really required)
    // path.skip()
  },
  JSXFragment(path) {
    throw jsxFragmentError(path)
  },

  JSXSpreadChild(path) {
    throw jsxSpreadChildError(path)
  }
}

export default function plugin() {
  const pluginObj = {
    inherits: SyntaxJSX,
    visitor: {
      Program: {
        enter(path: NodePath<t.Program>) {
          programInfo.path = path
          path.traverse(jsxToTemplate)
        },
        exit() {
          addEventDelegation()
          programInfo.imports.clear()
          programInfo.usedEvents.clear()
        }
      }
    }
  }

  return pluginObj
}
