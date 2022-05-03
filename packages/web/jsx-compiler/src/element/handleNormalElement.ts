import { NodePath, types as t } from '@babel/core'
import { ChildPath } from '../component/handleComponentChildren'
import { processJSX } from '../processJSX'
import { Output } from '../types'
import { handleElementAttributes } from './handleElementAttributes'
import { isVoidElement } from './voidElements'

export function handleNormalElement(
  address: number[],
  path: NodePath<t.JSXElement>,
  tag: string
): Output {
  const exprs: t.Expression[] = []
  const hydrations: t.Expression[] = []

  // start opening tag
  let html = `<${tag}`

  html += handleElementAttributes(path, hydrations, address, exprs)

  // close the opening tag
  html += '>'

  // if the element is void element
  // ignore children and no need to add closing tag
  if (isVoidElement(tag)) {
    return [html, exprs, hydrations]
  }

  // handle children
  const children = path.get('children') as ChildPath[]

  let removeCount = 0

  let isPrevStatic = false
  let mergeCount = 0

  children.forEach((childPath, i) => {
    // childPath's node could have been removed, so ignore if that's the case
    // what about index??
    if (childPath.node === null) {
      removeCount++
      return
    }

    const childAdress = [...address, i - removeCount - mergeCount]

    const [childHtml, childExprs, childHydrations] = processJSX(
      childPath,
      childAdress
    )

    // if both prev and current are static
    // they will be merged into single thing
    if (isPrevStatic && childExprs.length === 0) {
      mergeCount++
    }

    exprs.push(...childExprs)
    hydrations.push(...childHydrations)
    html += childHtml

    isPrevStatic = childExprs.length === 0
  })

  html += `</${tag}>`

  return [html, exprs, hydrations]
}
