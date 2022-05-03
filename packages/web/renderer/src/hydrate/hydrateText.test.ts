import { $, flush } from '@nuejs/core'
import { setupContext } from '../test-utils/setupContext'
import { hydrateText } from './hydrateText'

test('initial value and update', async () => {
  const { set, unset } = setupContext()
  set()

  const v1 = 'hello'
  const v2 = 'hola'

  const msg = $(v1)
  const textNode = document.createTextNode('')
  hydrateText(textNode, msg)

  expect(textNode.textContent).toBe(v1)

  msg.value = v2
  await flush()

  expect(textNode.textContent).toBe(v2)

  unset()
})
