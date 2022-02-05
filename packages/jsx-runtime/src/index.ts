export function jsx(type: string | Function, props: object): JSX.Element {
  return { type, props }
}

export const jsxs = jsx

// handle old jsx transform
export function jsxClassic(
  type: string | Function,
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
