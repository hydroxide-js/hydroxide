import { transform } from '@babel/core'
// @ts-ignore
import syntaxJSX from '@babel/plugin-syntax-jsx'
import plugin, { Options } from '../src/index'

export function testPlugin(inputCode: string, options?: Options): string {
  return transform(inputCode, {
    plugins: [syntaxJSX, options ? [plugin, options] : plugin]
  })!.code as string
}
