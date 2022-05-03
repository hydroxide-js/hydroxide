import { $, flush } from '@nuejs/core'
import { fireEvent } from '@testing-library/dom'
import { setupContext } from '../test-utils/setupContext'
import { hydrateAttribute } from './hydrateAttribute'

test('normal attribute: initial value and updates', async () => {
  const { context, set, unset } = setupContext()
  set()

  const v1 = 'foo'
  const v2 = 'bar'

  const root = document.createElement('div')
  const element = document.createElement('div')
  const attributeName = 'class'

  const reactive = $(v1)
  hydrateAttribute(element, attributeName, reactive, root, context)

  const attr = element.getAttributeNode(attributeName)!
  expect(attr.value).toBe(v1)

  reactive.value = v2

  await flush()
  expect(attr.value).toBe(v2)

  unset()
})

describe('two way binding', () => {
  // in two way binding property is set not attribute

  // state should be converted to number
  test('$value for number reactive', async () => {
    const { context, set, unset } = setupContext()
    set()

    const v1 = 100
    const v1Str = '100'
    const v2 = 200
    const v2Str = '200'
    const v3 = 300
    const v3Str = '300'

    const root = document.createElement('div')
    const element = document.createElement('input')
    element.type = 'number' // optional
    root.appendChild(element)
    const attributeName = '$value'

    const reactive = $(v1)
    hydrateAttribute(element, attributeName, reactive, root, context)

    expect(element.value).toBe(v1Str)

    reactive.value = v2

    await flush()
    expect(element.value).toBe(v2Str)

    // now fire event on input element and expect the reactive to be updated
    fireEvent.input(element, { target: { value: v3Str } })

    expect(reactive.value).toBe(v3)

    unset()
  })

  test('$value for string reactive', async () => {
    const { context, set, unset } = setupContext()
    set()

    const v1 = 'foo'
    const v2 = 'bar'
    const v3 = 'bazz'

    const root = document.createElement('div')
    const element = document.createElement('input')
    root.appendChild(element)

    const reactive = $(v1)
    hydrateAttribute(element, '$value', reactive, root, context)

    expect(element.value).toBe(v1)

    reactive.value = v2

    await flush()
    expect(element.value).toBe(v2)

    // now fire event on input element and expect the reactive to be updated
    fireEvent.input(element, { target: { value: v3 } })
    expect(reactive.value).toBe(v3)

    unset()
  })
})
