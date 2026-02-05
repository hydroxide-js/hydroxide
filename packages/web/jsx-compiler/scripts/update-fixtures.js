import { transformSync } from '@babel/core'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(__dirname, '../tests/fixtures')

const dirs = fs.readdirSync(fixturesDir).filter(name => {
  const stat = fs.statSync(path.join(fixturesDir, name))
  return stat.isDirectory()
})

for (const dir of dirs) {
  const codeFile = path.join(fixturesDir, dir, 'code.js')
  const outputFile = path.join(fixturesDir, dir, 'output.js')

  if (!fs.existsSync(codeFile)) continue

  const code = fs.readFileSync(codeFile, 'utf-8')

  const result = transformSync(code, {
    plugins: [
      '@babel/plugin-syntax-jsx',
      'validate-jsx-nesting',
      path.join(__dirname, '../src/index.ts')
    ],
    parserOpts: {
      plugins: ['jsx']
    }
  })

  fs.writeFileSync(outputFile, result.code)
  console.log(`Updated ${dir}/output.js`)
}

console.log('Done!')
