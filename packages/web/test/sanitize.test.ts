import { sanitize } from '../src/utils/sanitize'

export const sanitizeTests = [
  {
    input: '<div>hello</div>',
    output: '&lt;div&gt;hello&lt;/div&gt;'
  },
  {
    input: '<div>bye</div>',
    output: '&lt;div&gt;bye&lt;/div&gt;'
  }
]

test('sanitize works', () => {
  sanitizeTests.forEach((test) => {
    expect(sanitize(test.input)).toBe(test.output)
  })
})
