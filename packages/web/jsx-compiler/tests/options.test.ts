import { testPlugin } from './testPlugin'

describe('import source options', () => {
  const input = '<input value={foo()} />'

  test('custom dom import source', () => {
    const output = testPlugin(input, {
      domImportSource: 'DOM'
    })

    const lines = output.split('\n')
    expect(lines[2]).toBe('import { template as _template } from "DOM";')
  })

  test('custom core import source', () => {
    const output = testPlugin(input, {
      coreImportSource: 'CORE'
    })

    const lines = output.split('\n')
    expect(lines[0]).toBe('import { effect as _effect } from "CORE";')
  })
})
