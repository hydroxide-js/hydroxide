import { ssr as _ssr } from 'hydroxide-dom'
const _tmpl = ['<h1>hello</h1>'],
  _tmpl2 = ['<h1>hello</h1>'],
  _tmpl3 = ['<h1>hello</h1>'],
  _tmpl4 = ['<h1>hello</h1>']

const level0 = _ssr(_tmpl, [])

function foo() {
  const level1 = _ssr(_tmpl2, [])

  function bar() {
    const level2 = _ssr(_tmpl3, [])

    function baz() {
      const level3 = _ssr(_tmpl4, [])
    }
  }
}
