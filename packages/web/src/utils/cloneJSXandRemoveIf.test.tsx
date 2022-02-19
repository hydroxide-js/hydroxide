import { $ } from '@nuejs/core'
import { cloneJSXandRemoveIf } from './cloneJSXandRemoveIf'

it('works', () => {
  const originalJSX = <div $if={$(true)} class="foo" id="bar"></div>
  const expected = <div class="foo" id="bar"></div>
  const output = cloneJSXandRemoveIf(originalJSX as JSX.HtmlElement)
  expect(output).toEqual(expected)
})
