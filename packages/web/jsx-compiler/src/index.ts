import { PluginObj, Visitor } from '@babel/core'
import { jsxFragmentError, jsxSpreadChildError } from './errors'
import { G } from './types'
import { elementToTemplate } from './utils/elementToTemplate'

export const g: G = {
  // @ts-ignore
  program: null,
  imported: false
}

const jsxToTemplate: Visitor<{}> = {
  JSXElement(path) {
    // transform jsxElement inside expression container that are skipped by jsxElement visitor
    path.traverse({
      JSXExpressionContainer(path) {
        path.traverse(jsxToTemplate)
      }
    })

    // replace jsxElement with template
    path.replaceWith(elementToTemplate(path))

    // do not go inside (not really required)
    path.skip()
  },
  JSXFragment(path) {
    throw jsxFragmentError(path)
  },

  JSXSpreadChild(path) {
    throw jsxSpreadChildError(path)
  }
}

export const plugin = () => {
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
