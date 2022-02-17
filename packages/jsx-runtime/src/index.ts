import type { Component } from '@nuejs/core'

export function jsx(type: string | Component<any>, props: object): JSX.Element {
  return { type, props }
}

export const jsxs = jsx

// handle old jsx transform
export function jsxClassic(
  type: string | Component<any>,
  props: object,
  ...children: JSX.Element[]
) {
  if (children.length) {
    return {
      type,
      props: { ...props, children }
    }
  } else {
    return { type, props }
  }
}
