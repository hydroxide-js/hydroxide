import { sanitize } from '../utils/sanitize'

export function primitivesToHTML(jsxElement: JSX.Primitives) {
  // render null and undefined as empty string - just like react ??
  if (jsxElement === null || jsxElement === undefined) {
    return ''
  }

  return sanitize(jsxElement + '')
}
