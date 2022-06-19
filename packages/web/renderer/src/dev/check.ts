import { CompNode, devInfo } from './info'

function getCompTreeChain() {
  let current: CompNode | null = devInfo.currentComponent
  const chain: string[] = []
  while (current) {
    chain.push(current.name)
    current = current.parent
  }

  return chain.reverse().join(' -> ')
}

export function objectStringifiedCheck(value: any, text: Text) {
  if (DEV && typeof value === 'object' && value !== null) {
    const chain = getCompTreeChain()
    const comp = devInfo.currentComponent.comp
    setTimeout(() => {
      console.error('Error in \n\n', chain)
      console.dir(comp)
      console.error('object', value)
      console.error('rendered at', text)
      throw SyntaxError('Object Stringified and rendered as text')
    })
  }
}

export function unwrappedListCheck(marker: Comment, expr: any) {
  if (
    DEV &&
    marker.parentElement &&
    marker.parentElement.childNodes.length !== 1
  ) {
    const chain = getCompTreeChain()
    console.error('Error in \n\n', chain)
    console.error('could not render list', expr)
    console.error(devInfo.currentComponent.comp)
    throw new Error(
      'Can not render list of elements without wrapping them within a container'
    )
  }
}
