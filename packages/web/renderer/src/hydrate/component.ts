import { detect } from 'hydroxide'
import { Component } from '../types'
import { List } from '../components/List'

export function component(comp: Component<any>, props?: Record<string, any>) {
  const output = comp(props || {})

  if (!SSR_SERVER) {
    // if a reactive value is passed as props downstream, mark it as "immutable"

    if (props && comp !== List) {
      const [deps] = detect(() => {
        for (const propName in props) {
          // eslint-disable-next-line no-unused-expressions
          props[propName] // triggers dependency detection
        }
      })

      if (deps.size) {
        deps.forEach(dep => {
          dep.mutable = false
        })
      }
    }
  }

  return output
}
