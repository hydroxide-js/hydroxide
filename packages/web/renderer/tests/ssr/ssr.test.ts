import { ssr, branch } from '../../src/index'

test('0 expr', () => {
  const html = ssr(['<div> hello </div>'], [])
  expect(html).toBe('<div> hello </div>')
})

test('1 text expr', () => {
  const html = ssr(['<div>count is ', '</div>'], [0])
  expect(html).toBe('<div>count is 0</div>')
})

test('1 branch expr', () => {
  const html = ssr(['<div>', '</div>'], [branch([true, 'Hello'])])
  expect(html).toBe('<div>count is 0</div>')
})
