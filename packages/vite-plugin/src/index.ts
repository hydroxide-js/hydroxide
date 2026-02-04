import { transformAsync, TransformOptions } from '@babel/core'
// @ts-ignore
import babelPluginSyntaxJSX from '@babel/plugin-syntax-jsx'
// @ts-ignore
import babelPluginHydroxide from 'babel-plugin-hydroxide'
// @ts-ignore
import presetTypescript from '@babel/preset-typescript'
import type { Plugin } from 'vite'

const isJSXorTSX = (filePath: string) => filePath.match(/\.(t|j)sx$/)

export default function hydroxide() {
  const projectRoot = process.cwd()

  const plugin: Plugin = {
    name: 'hydroxide-jsx-compiler',
    config() {
      return {
        // let ESbuild handle .js and .ts files
        // jsx and tsx will be handled by hydroxide compiler
        esbuild: {
          include: /(\.ts|\.js)$/
        }
      }
    },
    async transform(inputCode, id) {
      // ignore non-jsx or non-tsx files
      if (!isJSXorTSX(id)) {
        return null
      }

      const babelOptions: TransformOptions = {
        babelrc: false,
        configFile: false,
        root: projectRoot,
        filename: id,
        sourceFileName: id,
        sourceMaps: true,
        plugins: [babelPluginSyntaxJSX, babelPluginHydroxide]
      }

      // if TSX, use typescript preset
      if (id.match(/\.tsx$/)) {
        babelOptions.presets = [presetTypescript]
      }

      const result = await transformAsync(inputCode, babelOptions)
      const { code, map } = result!
      return { code: code as string, map }
    }
  }

  return plugin
}
