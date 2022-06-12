export function attr(element: HTMLElement, attrName: string, value: string) {
  if (value) {
    element.setAttribute(attrName, value)
  } else {
    element.removeAttribute(attrName)
  }
}
