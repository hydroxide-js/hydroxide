import { Component } from '@nuejs/core'
import { DynamicParts } from './types/DynamicPart'

export type ComponentInfo = {
  template: HTMLTemplateElement
  dynamics: DynamicParts
}

export type ComponentInfoMap = Map<Component<any>, ComponentInfo>

export const componentInfoMap: ComponentInfoMap = new Map()
