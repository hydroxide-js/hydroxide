import { describe, test, expect } from 'vitest'
import { testPlugin } from './testPlugin'

describe('import source options', () => {
  const input = '<input value={foo()} />'

  test('custom dom import source', () => {
    const output = testPlugin(input, {
      domImportSource: 'DOM'
    })

    expect(output).toContain('from "DOM"')
    expect(output).toContain('template as _template')
  })

  test('custom core import source', () => {
    const output = testPlugin(input, {
      coreImportSource: 'CORE'
    })

    expect(output).toContain('from "CORE"')
    expect(output).toContain('effect as _effect')
  })
})
