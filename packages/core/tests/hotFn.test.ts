import { hotFn } from '../src/utils/hotFn'

test('works', () => {
  const add = (a: number, b: number) => a + b
  const sub = (a: number, b: number) => a - b

  const hotAdd = hotFn(add)

  expect(hotAdd(1, 2)).toBe(3)

  hotAdd.fn = sub

  expect(hotAdd(1, 2)).toBe(-1)
})
