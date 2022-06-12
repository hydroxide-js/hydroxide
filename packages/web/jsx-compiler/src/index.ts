import { PluginObj, types as t, Visitor } from '@babel/core'
// @ts-ignore
import validateJSXNesting from 'babel-plugin-validate-jsx-nesting'
import { jsxFragmentError, jsxSpreadChildError } from './errors'
import { programInfo } from './programInfo'
import { transformJSXPath } from './transform/transformJSX'
import { addEventDelegation, addImports } from './utils/build'

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

function plugin() {
  const pluginObj: PluginObj = {
    name: 'babel-plugin-hydroxide-jsx',
    visitor: {
      Program: {
        enter(path) {
          programInfo.path = path
          path.traverse({
            ImportSpecifier(path) {
              if (t.isIdentifier(path.node.imported)) {
                programInfo.userImports.add(path.node.imported.name)
              }
            }
          })
          path.traverse(jsxToTemplate)
        },
        exit() {
          addEventDelegation()
          addImports()
          // reset globals
          programInfo.domImports.clear()
          programInfo.coreImports.clear()
          programInfo.userImports.clear()
          programInfo.usedEvents.clear()
        }
      }
    }
  }

  return pluginObj
}

export default plugin
