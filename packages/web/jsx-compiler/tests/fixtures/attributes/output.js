import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<p>hi</p>'),
  _T2 = createTemplate("<p foo='foo'>hello</p>", [$Attr, []]),
  _T3 = createTemplate(
    "<div a='true' d='10' e='e' title='title'>complex 1</div>",
    [$Attr, []]
  ),
  _T4 = createTemplate('<div>complex 2</div>', [$Attr, []]),
  _T5 = createTemplate(
    "<div><img src='hello.jpg' alt='hi'><img src='hello.jpg'><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button><!><!><!><!></div>",
    [$Attr, [1]],
    [$Attr, [2]],
    [$Attr, [5]],
    [$CondEl, [6]],
    [$CondEl, [7]],
    [$CondEl, [8]],
    [$CondEl, [9]]
  )

_T5(
  {
    alt: x
  },
  {
    src: x,
    alt: y
  },
  {
    'on:click': x,
    '$:value': y,
    'foo:bazz': XXX
  },
  [FOO, _T()],
  [
    BAR,
    _T2({
      bar: bar
    })
  ],
  [
    x,
    _T3({
      'on:click': x,
      '$:value': y,
      'data-x': X
    })
  ],
  [
    x,
    _T4({
      a: true,
      b: null,
      ...X,
      c: undefined,
      d: 10,
      e: 'e',
      'on:click': x,
      '$:value': y,
      title: 'title',
      'data-x': X
    })
  ]
)
