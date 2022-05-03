import { Component, Props, Reactive } from '@nuejs/core'
import { EventHandler } from './hydrate/eventDelegation'
import { Hydration } from './hydrate/hydrationTypes'

type ReservedProps = {
  $if?: Reactive<any>
}

type TextData = any
type AttributeData = any
type EventData = EventHandler
type conditionElData = [condition: Reactive<any>, template: Template]

export type branchData = [condition: Reactive<any> | true, template: Template]

export type componentData<P> = [
  comp: Component<P>,
  props: Props<P>,
  reservedProps: ReservedProps,
  children: any[]
]

export type HydrationData =
  | TextData
  | AttributeData
  | conditionElData
  | componentData<any>
  | EventData
  | branchData

export type Template = (...data: HydrationData[]) => {
  template: HTMLElement
  hydrations: Hydration[]
  data: HydrationData[]
}

export function createTemplate(
  html: string,
  ...hydrations: Hydration[]
): Template {
  let el: HTMLElement | undefined

  console.log('html:', html)

  return (...data: HydrationData[]) => {
    if (!el) {
      const template = document.createElement('template')
      template.innerHTML = html
      el = template.content.firstChild as HTMLElement
    }

    return {
      template: el,
      hydrations,
      data
    }
  }
}
