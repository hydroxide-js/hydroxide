import { $, flush } from '..'
import { setupContext } from '../test-utils/setupContext'
import { handleProps } from './handleProps'

it('works', async () => {
  const { context } = setupContext()

  const fn = () => 42
  const d = $(0)
  const e = $('hello')
  const $if = $(true)
  const children = { type: 'div', props: {} }

  const originalProps = {
    // non-reactives
    a: 0,
    b: 'hello',
    c: { foo: 1, bar: 2 },
    // reactives
    d,
    e,
    // special keys
    $if,
    children,
    // functions
    fn
  }

  const props = handleProps(originalProps, context, false)

  // non-reactives -> reactives
  expect(props.a).toEqual($(0))
  expect(props.b).toEqual($('hello'))
  expect(props.c).toEqual($({ foo: 1, bar: 2 }))

  // $if is skipped
  expect(props.$if).toBe(undefined)

  // children is passed as is
  expect(props.children).toBe(children)

  // functions are passed as is
  expect(props.fn).toBe(fn)

  // reactives are cloned and subscribed to original props
  expect(props.d).not.toBe(d)
  expect(props.d.value).toEqual(d.value)
  expect(props.e).not.toBe(e)
  expect(props.e.value).toEqual(e.value)

  // props are updated when original props are updated
  d.value++
  await flush()
  expect(props.d.value).toEqual(d.value)

  // props are updated when original props are updated
  e.value = 'hola'
  await flush()
  expect(props.e.value).toEqual(e.value)
})
