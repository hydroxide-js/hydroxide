export function setAttribute(
  element: HTMLElement,
  attrName: string,
  value: string
) {
  if (value) {
    element.setAttribute(attrName, value)
  } else {
    element.removeAttribute(attrName)
  }
}
