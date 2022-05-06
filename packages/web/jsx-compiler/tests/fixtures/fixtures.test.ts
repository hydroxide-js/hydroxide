// @ts-ignore
import pluginTester from 'babel-plugin-tester'
import path from 'path'
import { plugin } from '../../src'

pluginTester({
  pluginName: 'plugin-test',
  plugin: plugin,
  babelOptions: {
    plugins: ['@babel/plugin-syntax-jsx']
  },
  fixtures: path.join(__dirname, '../fixtures')
})
