import { PluginObj, types, Visitor } from '@babel/core'
// @ts-ignore
import validateJSXNesting from 'babel-plugin-validate-jsx-nesting'
import { G } from './types'
import { elementToTemplate } from './utils/elementToTemplate'
import { jsxFragmentError, jsxSpreadChildError } from './utils/errors'

export const g: G = {
  // @ts-ignore
  program: null,
  imported: false
}

const jsxToTemplate: Visitor<{}> = {
  JSXElement(path) {
    path.traverse(validateJSXNesting({ types }).visitor)

    // transform jsxElement inside expression container that are skipped by jsxElement visitor
    path.traverse({
      JSXExpressionContainer(path) {
        path.traverse(jsxToTemplate)
      }
    })

    // replace jsxElement with template
    path.replaceWith(elementToTemplate(path))

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

function plugin() {
  const pluginObj: PluginObj = {
    name: 'babel-plugin-hydroxide-jsx',
    visitor: {
      Program(path) {
        // for each new file, save the program node path and reset imported flag
        g.program = path
        g.imported = false

        path.traverse(jsxToTemplate)
      }
    }
  }

  return pluginObj
}

export default plugin
