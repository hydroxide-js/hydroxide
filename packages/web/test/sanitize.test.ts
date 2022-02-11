import { sanitize } from '../src/utils/sanitize'

test('works', () => {
  expect(sanitize('<div>hello</div>')).toBe('&lt;div&gt;hello&lt;/div&gt;')
})
