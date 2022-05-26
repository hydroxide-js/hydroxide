import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<p>even</p>'),
  _T2 = createTemplate("<p foo='foo'>foo</p>", [$Attr, []]),
  _T3 = createTemplate(
    "<div a='true' d='10' e='e' title='title'>complex</div>",
    [$Attr, []]
  ),
  _T4 = createTemplate(
    "<div><img src='hello.jpg' alt='hi'><img src='hello.jpg'><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button><!><!><!></div>",
    [$Attr, [1]],
    [$Attr, [2]],
    [$Attr, [5]],
    [$CondEl, [6]],
    [$CondEl, [7]],
    [$CondEl, [8]]
  )

_T4(
  {
    alt: () => img('alt')
  },
  {
    src: () => img('src'),
    alt: () => alt
  },
  {
    'on:click': () => handleClick,
    '$:value': () => value,
    'foo:bazz': fooBazz
  },
  [() => count() % 2 === 0, _T()],
  [
    () => ShowFoo,
    _T2({
      bar: () => bar
    })
  ],
  [
    foo,
    _T3({
      'on:click': () => handleClick,
      '$:value': () => value,
      'data-x': () => x
    })
  ]
)
