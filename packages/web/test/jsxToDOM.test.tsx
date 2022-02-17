import { $, component } from '@nuejs/core'
import { jsxToDOM } from '../src/jsxToDOM/jsxToDOM'
import { commentMarker, reactiveTextMarker as R } from '../src/jsxToDOM/markers'
import { DynamicPart, DynamicParts } from '../src/types/DynamicPart'

test('static text', () => {
  const [html, dynamics] = jsxToDOM('hello')
  expect(html).toBe('hello')
  expect(dynamics).toEqual([])
})

test('structure', () => {
  const $R = $(0)

  const Hello = component(() => <p> hello </p>)

  const [html, dynamics] = jsxToDOM(
    <div class="container">
      {10}
      {null}
      {undefined}
      {'foo'}
      {'bar'}
      <h1 class="YYY">
        {$R} XXX {$R} XXX
      </h1>
      <p class="YYY">
        XXX {$R} XXX {$R}
      </p>
      <p $if={$(false)} class="YYY">
        XXX
      </p>
      <p class="YYY">{$R}</p>
      <button class="YYY">XXX</button>
      <Hello />
    </div>
  )

  expect(html).toBe(
    [
      '<div class="container" >',
      /**/ '10foobar',
      /**/ `<h1 class="YYY" >${R} XXX ${R} XXX</h1>`,
      /**/ `<p class="YYY" >XXX ${R} XXX ${R}</p>`,
      /**/ commentMarker,
      /**/ `<p class="YYY" >${R}</p>`,
      /**/ '<button class="YYY" >XXX</button>',
      /**/ commentMarker,
      '</div>'
    ].join('')
  )

  const expected: DynamicParts = [
    {
      text: true,
      domAddress: [1, 1],
      jsxAddress: [5, 0]
    },
    {
      text: true,
      domAddress: [1, 5],
      jsxAddress: [5, 2]
    },
    {
      text: true,
      domAddress: [2, 2],
      jsxAddress: [6, 1]
    },
    {
      text: true,
      domAddress: [2, 6],
      jsxAddress: [6, 3]
    },
    {
      // because we don't have access to generated component, we have to use it from dynamics
      comp: (dynamics[4] as DynamicPart.Component).comp,
      conditional: true,
      domAddress: [3],
      jsxAddress: [7],
      conditionalEl: true
    },
    {
      text: true,
      domAddress: [4, 1],
      jsxAddress: [8, 0]
    },
    {
      comp: Hello,
      domAddress: [6],
      jsxAddress: [10]
    }
  ]

  expect(dynamics).toEqual(expected)
})
