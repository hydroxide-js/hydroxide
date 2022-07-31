import pluginTester from 'babel-plugin-tester'
import path from 'path'
import plugin from '../../src'

pluginTester({
  pluginName: 'plugin-test',
  plugin: plugin,
  pluginOptions: { type: 'ssr-server' },
  babelOptions: {
    plugins: ['@babel/plugin-syntax-jsx', 'validate-jsx-nesting']
  },
  fixtures: path.join(__dirname)
})
