import { queryJSX } from './queryJSX'

it('works', () => {
  const jsxHtmlElement = (
    <div>
      <p> hello </p>
      foo
      <section>
        <h1> foo </h1>
        <p> bar </p>
      </section>
    </div>
  ) as JSX.HtmlElement

  expect((queryJSX(jsxHtmlElement, []) as JSX.HtmlElement).jsxTag).toBe('div')
  expect((queryJSX(jsxHtmlElement, [0]) as JSX.HtmlElement).jsxTag).toBe('p')
  expect(queryJSX(jsxHtmlElement, [0, 0])).toBe(' hello ')
  expect(queryJSX(jsxHtmlElement, [1])).toBe('foo')
  expect((queryJSX(jsxHtmlElement, [2]) as JSX.HtmlElement).jsxTag).toBe(
    'section'
  )
  expect((queryJSX(jsxHtmlElement, [2, 0]) as JSX.HtmlElement).jsxTag).toBe(
    'h1'
  )
  expect(queryJSX(jsxHtmlElement, [2, 0, 0])).toBe(' foo ')
  expect((queryJSX(jsxHtmlElement, [2, 1]) as JSX.HtmlElement).jsxTag).toBe('p')
  expect(queryJSX(jsxHtmlElement, [2, 1, 0])).toBe(' bar ')
})
