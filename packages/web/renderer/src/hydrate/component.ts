// import { coreInfo } from 'hydroxide'
import { Component } from '../types'

export function component(comp: Component<any>, props?: Record<string, any>) {
  const output = comp(props || {})
  return output
}
