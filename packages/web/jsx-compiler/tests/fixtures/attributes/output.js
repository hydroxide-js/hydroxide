import { $template, $insert, $attr, $comp, $branch } from 'hydroxide-dom'

const _T = $template('<p>even</p>'),
  _T2 = $template("<p foo='foo'>foo</p>"),
  _T3 = $template("<div a='true' d='10' e='e' title='title'>complex</div>"),
  _T4 = $template(
    "<div><img src='hello.jpg' alt='hi'><img src='hello.jpg'><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button><!><!><!></div>"
  )

_T4(() => {
  $attr([1], {
    alt: () => img('alt')
  })
  $attr([2], {
    src: () => img('src'),
    alt: () => alt
  })
  $attr([5], {
    'on:click': () => handleClick,
    '$:value': () => value,
    'foo:bazz': fooBazz
  })
  $branch([6], [() => count() % 2 === 0, _T])
  $branch(
    [7],
    [
      () => ShowFoo,
      () =>
        _T2(() => {
          $attr([], {
            bar: () => bar
          })
        })
    ]
  )
  $branch(
    [8],
    [
      foo,
      () =>
        _T3(() => {
          $attr([], {
            'on:click': () => handleClick,
            '$:value': () => value,
            'data-x': () => x
          })
        })
    ]
  )
})
