import { queryDOM } from './queryDOM'

it('works', () => {
  /**
   * div
   * - p > text1 comment1 text2
   * - text3
   * - div > h1 > text4 comment2
   * - h2
   */
  const root = document.createElement('div')

  // p  > text1 comment1 text2
  const p = document.createElement('p')
  const text1 = document.createTextNode('text1')
  const comment1 = document.createComment('comment1')
  const text2 = document.createTextNode('text1')
  p.append(text1, comment1, text2)

  // text3
  const text3 = document.createTextNode('text3')

  // div > h1 > text3 text4
  const div = document.createElement('div')
  const h1 = document.createElement('h1')
  const text4 = document.createTextNode('text4')
  const comment2 = document.createTextNode('comment2')
  h1.append(text4, comment2)
  div.append(h1)

  const h2 = document.createElement('h2')

  root.append(p, text3, div, h2)

  // assertions
  expect(queryDOM(root, [])).toBe(root)
  expect(queryDOM(root, [0])).toBe(p)
  expect(queryDOM(root, [0, 0])).toBe(text1)
  expect(queryDOM(root, [0, 1])).toBe(comment1)
  expect(queryDOM(root, [0, 2])).toBe(text2)

  expect(queryDOM(root, [1])).toBe(text3)

  expect(queryDOM(root, [2])).toBe(div)
  expect(queryDOM(root, [2, 0])).toBe(h1)
  expect(queryDOM(root, [2, 0, 0])).toBe(text4)
  expect(queryDOM(root, [2, 0, 1])).toBe(comment2)
  expect(queryDOM(root, [3])).toBe(h2)
})
