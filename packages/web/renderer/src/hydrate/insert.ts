import { detect, globalInfo, Phase, subscribe } from 'hydroxide'
import { objectStringifiedCheck, unwrappedListCheck } from '../dev/check'
import { isLibDev } from '../env'
import { $list } from './list/renderList'

export function insert(marker: Comment, expr: any) {
  // Node
  if (expr instanceof Node) {
    marker.replaceWith(expr)
  }

  // function
  else if (typeof expr === 'function') {
    const [deps, initValue] = detect(expr)

    // no deps
    if (!deps.size) {
      if (typeof initValue === 'object') {
        insert(marker, initValue)
      } else {
        marker.replaceWith(initValue + '')
      }
    }

    // deps
    else {
      const text = document.createTextNode(initValue + '')
      const context = globalInfo.context

      function update() {
        if (isLibDev) {
          if (!context!.isConnected && isLibDev) {
            throw new Error(
              "disconnected context's dependency should not be updated"
            )
          }
        }

        const value = expr()
        text.textContent = value
        objectStringifiedCheck(value, text)
      }

      text.textContent = initValue as string
      // objectStringifiedCheck(initValue, text)

      deps.forEach((dep) => {
        subscribe(dep, update, Phase.render)
      })

      marker.replaceWith(text)
    }
  }

  // Array
  else if (Array.isArray(expr)) {
    unwrappedListCheck(marker, expr)

    expr.forEach((child) => {
      // while (typeof child === 'function') child = child()

      if (typeof child === 'function') {
        const [deps, initValue] = detect(child)
        if (initValue instanceof Node) {
          marker.before(initValue)
        } else if (deps.size) {
          const text = document.createTextNode(initValue + '')
          function update() {
            text.textContent = child()
          }
          deps.forEach((dep) => {
            subscribe(dep, update, Phase.render)
          })
        }
      } else {
        marker.before(child)
      }
    })

    marker.remove()
  }

  // list component
  else if (expr.$$list) {
    return $list(marker, expr.$$list)
  }

  // primitive
  else {
    const text = document.createTextNode(expr + '')
    objectStringifiedCheck(expr, text)
    marker.replaceWith(text)
  }
}