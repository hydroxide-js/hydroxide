import { PluginObj, Visitor } from '@babel/core'
import { G } from './types'
import { elementToTemplate } from './utils/elementToTemplate'
import { optimizeJSXExpressionContainer } from './visitors/optimizeJSXExpressionContainer'
import { optimizeJsxText } from './visitors/optimizeJsxText'

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

        path.traverse(optimizeJSXExpressionContainer)
        path.traverse(optimizeJsxText)
        path.traverse(jsxToTemplate)
      }
    }
  }

  return pluginObj
}

export default plugin
