import { commonPrefixOf } from '../src/utils/process'

it('works', () => {
  expect(commonPrefixOf('F', 'F')).toBe('F')
  expect(commonPrefixOf('F', 'FNNN')).toBe('F')
  expect(commonPrefixOf('X', 'FNNN')).toBe('')
  expect(commonPrefixOf('FNN', '0N')).toBe('')
  expect(commonPrefixOf('FNN', 'FNNN')).toBe('FNN')
})
