import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<h2></h2>'),
  _T2 = createTemplate('<h1></h1>'),
  _T3 = createTemplate('<!>', [$Comp, []]),
  _T4 = createTemplate('<!>', [$Comp, []]),
  _T5 = createTemplate('<!>', [$Comp, []]),
  _T6 = createTemplate('<h1></h1>'),
  _T7 = createTemplate('<h2></h2>'),
  _T8 = createTemplate('<!>', [$Comp, []]),
  _T9 = createTemplate(
    '<div><!><!><!><!></div>',
    [4, [0]],
    [4, [1]],
    [4, [2]],
    [4, [3]]
  ),
  _T10 = createTemplate('<p>Y</p>'),
  _T11 = createTemplate('<p>X</p>'),
  _T12 = createTemplate('<!>', [$Comp, []]),
  _T13 = createTemplate('<!>', [$Comp, []]),
  _T14 = createTemplate('<p>Y</p>'),
  _T15 = createTemplate('<p>X</p>'),
  _T16 = createTemplate('<p>E</p>'),
  _T17 = createTemplate('<p>Z</p>'),
  _T18 = createTemplate(
    '<div><!><!><!><!></div>',
    [4, [0]],
    [4, [1]],
    [4, [2]],
    [4, [3]]
  ),
  _T19 = createTemplate('<!>', [$Comp, []]),
  _T20 = createTemplate('<p>Z</p>'),
  _T21 = createTemplate('<p>X</p>'),
  _T22 = createTemplate('<p>Y</p>'),
  _T23 = createTemplate('<p>Z</p>'),
  _T24 = createTemplate('<p>X</p>'),
  _T25 = createTemplate('<div><!><!></div>', [4, [0]], [4, [1]]),
  _T26 = createTemplate('<div>this is not Y</div>'),
  _T27 = createTemplate('<p>this is Z</p>'),
  _T28 = createTemplate('<p>this is Y<!></p>', [$CondEl, [1]]),
  _T29 = createTemplate('<p>this is X<!></p>', [4, [1]]),
  _T30 = createTemplate('<div><!></div>', [$CondEl, [0]])

const if_else = _T9(
  [[X, _T2()], _T()],
  [[X, _T4([Foo])], _T3([Foo])],
  [[X, _T6()], _T5([Foo])],
  [[X, _T8([Foo])], _T7()]
)

const if__else_if = _T18(
  [
    [X, _T11()],
    [Y, _T10()]
  ],
  [
    [X, _T13([Foo, , , ['X']])],
    [Y, _T12([Foo, , , ['Y']])]
  ],
  [
    [X, _T15()],
    [Y, _T14()]
  ],
  [
    [Z, _T17()],
    [W, _T16()]
  ]
)

const if__else_if__else = _T25(
  [
    [X, _T21()],
    [
      Y,
      _T19([
        Foo,
        {
          a: A,
          b: B
        }
      ])
    ],
    _T20()
  ],
  [[X, _T24()], [Y, _T22()], _T23()]
)

const if__if__if_else = _T30([X, _T29([[Y, _T28([Z, _T27()])], _T26()])])
