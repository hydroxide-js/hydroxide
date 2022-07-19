import { Reactive, GenericPath, effect, valueAt, Slice } from 'hydroxide'

export function bind(
  node: HTMLElement,
  prop: string,
  updator: Reactive<any> | Slice<any>
) {
  let state: Reactive<any>
  let path: GenericPath | undefined

  if ('reactive' in updator) {
    state = updator.reactive
    path = updator.path
  } else {
    state = updator
  }

  const initValue = path ? valueAt(state.value, path) : state.value
  const type = typeof initValue

  // @ts-expect-error
  node.$$input = (event: InputEvent) => {
    // @ts-ignore
    let value = event.target[prop]
    if (type === 'number') {
      value = Number(value)
    }

    updator.set(value)
  }

  effect(() => {
    // @ts-expect-error
    node[prop] = path ? valueAt(state(), path) : state()
  })
}
