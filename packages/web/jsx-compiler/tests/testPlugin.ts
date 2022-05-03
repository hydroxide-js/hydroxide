import { transform } from '@babel/core'
// @ts-expect-error
import syntaxJSX from '@babel/plugin-syntax-jsx'
import { plugin } from '../src/index'

export function testPlugin(inputCode: string): string {
  return transform(inputCode, {
    plugins: [syntaxJSX, plugin]
  })!.code as string
}
