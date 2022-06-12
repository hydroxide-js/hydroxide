import { Phase, schedule } from 'hydroxide'
import { devInfo, isDEV } from '../env'

function ErrorIn() {
  console.error('Error in ', `<${devInfo.currentComponent!.name} />`)
}

export function objectStringifiedCheck(value: any, text: Text) {
  if (isDEV && typeof value === 'object' && value !== null) {
    ErrorIn()
    schedule(Phase.effect, () => {
      console.error('object', value)
      console.error('rendered at', text)
      throw SyntaxError('Object Stringified and rendered as text')
    })
  }
}

export function unwrappedListCheck(marker: Comment, expr: any) {
  if (
    isDEV &&
    marker.parentElement &&
    marker.parentElement.childNodes.length !== 1
  ) {
    ErrorIn()
    console.error('could not render list', expr)
    throw new Error(
      'Can not render list of elements without wrapping them within a container'
    )
  }
}
