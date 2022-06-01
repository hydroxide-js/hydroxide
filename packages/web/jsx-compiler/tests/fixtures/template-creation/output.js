import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template('<h1>hello</h1>'),
  _T2 = $template('<h1>hi <!></h1>'),
  _T3 = $template('<h1>hello <!> <!> <!></h1>')

const hello = _T()

function foo() {
  const x = 10

  function bar() {
    const y = 20
    return _T2(() => {
      $insert([1], x)
    })

    function baz() {
      const z = 20
      return _T3(() => {
        $insert([1], x)
        $insert([3], y)
        $insert([5], z)
      })
    }
  }
}
