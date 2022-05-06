import { createTemplate } from '@nuejs/web'

const _T = createTemplate('<h2></h2>'),
  _T2 = createTemplate('<h1></h1>'),
  _T3 = createTemplate('<div><!></div>', [4, [0]]),
  _T4 = createTemplate('<!>', [2, []]),
  _T5 = createTemplate('<!>', [2, []]),
  _T6 = createTemplate('<div><!></div>', [4, [0]]),
  _T7 = createTemplate('<!>', [2, []]),
  _T8 = createTemplate('<h1></h1>'),
  _T9 = createTemplate('<div><!></div>', [4, [0]]),
  _T10 = createTemplate('<h2></h2>'),
  _T11 = createTemplate('<!>', [2, []]),
  _T12 = createTemplate('<div><!></div>', [4, [0]]),
  _T13 = createTemplate('<p>Y</p>'),
  _T14 = createTemplate('<p>X</p>'),
  _T15 = createTemplate('<div><!></div>', [4, [0]]),
  _T16 = createTemplate('<!>', [2, []]),
  _T17 = createTemplate('<!>', [2, []]),
  _T18 = createTemplate('<div><!></div>', [4, [0]]),
  _T19 = createTemplate('<!>', [2, []]),
  _T20 = createTemplate('<p>Z</p>'),
  _T21 = createTemplate('<p>X</p>'),
  _T22 = createTemplate('<div><!></div>', [4, [0]]),
  _T23 = createTemplate('<p>Y</p>'),
  _T24 = createTemplate('<p>Z</p>'),
  _T25 = createTemplate('<p>X</p>'),
  _T26 = createTemplate('<div><!></div>', [4, [0]]),
  _T27 = createTemplate('<p>Y</p>'),
  _T28 = createTemplate('<p>X</p>'),
  _T29 = createTemplate('<p>E</p>'),
  _T30 = createTemplate('<p>Z</p>'),
  _T31 = createTemplate('<div><!><!></div>', [4, [0]], [4, [1]]),
  _T32 = createTemplate('<div>this is not Y</div>'),
  _T33 = createTemplate('<p>this is Z</p>'),
  _T34 = createTemplate('<p>this is Y<!></p>', [3, [1]]),
  _T35 = createTemplate('<p>this is X<!></p>', [4, [1]]),
  _T36 = createTemplate('<div><!></div>', [3, [0]])

// if and else --------------
const test1 = _T3([[X, _T2()], _T()]) // if(element), else(element)

const test1_2 = _T6([[X, _T5([Foo])], _T4([Foo])]) // if(Component), else(Component)

const test1_3 = _T9([[X, _T8()], _T7([Foo])]) // if(element), else(Component)

const test1_4 = _T12([[X, _T11([Foo])], _T10()]) // if(Component), else(element)
// ---------------- if else-if

const test2 = _T15([
  [X, _T14()],
  [Y, _T13()]
]) // if(element), else-if(element)

const test3 = _T18([
  [X, _T17([Foo, null, null, ['X']])],
  [Y, _T16([Foo, null, null, ['Y']])]
]) // if(component), else-if(component)
// ---------------- if else-if else

const test4 = _T22([
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
]) // if, else-if, else

const test5 = _T26([[X, _T25()], [Y, _T23()], _T24()]) // if, else-if, else-if, else

const test6 = _T31(
  [
    [X, _T28()],
    [Y, _T27()]
  ],
  [[Z, _T30()], _T29()]
) // if, else + if, else

const test7 = _T36([X, _T35([[Y, _T34([Z, _T33()])], _T32()])]) // if > if > if
