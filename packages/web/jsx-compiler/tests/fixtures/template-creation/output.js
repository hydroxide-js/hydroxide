import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<h1>hello</h1>'),
  _T2 = createTemplate('<h1>hi <!></h1>', [$Embed, [1]]),
  _T3 = createTemplate(
    '<h1>hello <!> <!> <!></h1>',
    [$Embed, [1]],
    [$Embed, [3]],
    [$Embed, [5]]
  )

const hello = _T()

function foo() {
  const x = 10

  function bar() {
    const y = 20
    return _T2(x)

    function baz() {
      const z = 20
      return _T3(x, y, z)
    }
  }
}
