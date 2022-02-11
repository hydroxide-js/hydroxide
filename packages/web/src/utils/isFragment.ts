import { isObject } from './isObject'

export function isFragment(jsxElement: JSX.Element): boolean {
  return (
    isObject(jsxElement) &&
    'type' in jsxElement &&
    jsxElement.type === 'fragment'
  )
}
