import { Component, ComponentContext, Props } from '@nuejs/core'
import { devMode } from './devMode'

// interceptor is a function that intercepts the call to cb
// and calls it when needed
export type Interceptor = (cb: Function) => void

function callAfterInterceptors(
  originalFn: Function,
  interceptors: Interceptor[]
) {
  let fn = originalFn
  for (let i = interceptors.length - 1; i >= 0; i--) {
    const _fn = fn
    fn = () => interceptors[i](_fn)
  }
  fn()
}

export class WebContext extends ComponentContext {
  marker!: Comment
  el!: HTMLElement
  addInterceptors: Interceptor[]
  removeInterceptors: Interceptor[]

  // eslint-disable-next-line no-useless-constructor
  constructor(
    comp: Component<any>,
    props: Props<any>,
    parent: WebContext | null
  ) {
    super(comp, props, parent)
    this.addInterceptors = []
    this.removeInterceptors = []
  }

  connect() {
    super.connect()
    this.add()
  }

  disconnect() {
    super.disconnect()
    this.remove()
  }

  add() {
    const add = () => {
      this.marker.replaceWith(this.el)
      this.afterConnectCbs.forEach((cb) => cb())
    }

    if (this.addInterceptors.length) {
      callAfterInterceptors(add, this.addInterceptors)
    } else {
      add()
    }
  }

  remove() {
    const remove = () => {
      this.el.replaceWith(this.marker)
      if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
        document.getElementById('removed')!.append(this.el)
      }
      this.afterDisconnectCbs.forEach((cb) => cb())
    }

    if (this.removeInterceptors.length) {
      callAfterInterceptors(remove, this.removeInterceptors)
    } else {
      remove()
    }
  }

  interceptAdd(interceptor: Interceptor) {
    this.addInterceptors.push(interceptor)
  }

  interceptRemove(interceptor: Interceptor) {
    this.removeInterceptors.push(interceptor)
  }
}
