import { Component } from '@nuejs/core'
import { DynamicParts } from './DynamicPart'

export type ComponentInfo = {
  template: HTMLTemplateElement
  dynamics: DynamicParts
}

export type ComponentInfoMap = Map<Component<any>, ComponentInfo>
