import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template('<h1>hello</h1>'),
  _T2 = $template('<h1>hello</h1>'),
  _T3 = $template('<h1>hello</h1>'),
  _T4 = $template('<h1>hello</h1>')

const level0 = _T()

function foo() {
  const level1 = _T2()

  function bar() {
    const level2 = _T3()

    function baz() {
      const level3 = _T4()
    }
  }
}
