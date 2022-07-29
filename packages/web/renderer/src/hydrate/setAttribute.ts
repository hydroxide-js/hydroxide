/**
 * set attribute on given element
 * if the value is falsy, the attribute is removed from element
 */
export function setAttribute(element: HTMLElement, attrName: string, value: string) {
  if (value) {
    element.setAttribute(attrName, value)
  } else {
    element.removeAttribute(attrName)
  }
}
