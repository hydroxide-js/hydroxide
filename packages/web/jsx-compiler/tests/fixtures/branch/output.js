import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<p>odd</p>'),
  _T2 = createTemplate('<p>even</p>'),
  _T3 = createTemplate('<!>', [$Comp, []]),
  _T4 = createTemplate('<!>', [$Comp, []]),
  _T5 = createTemplate('<!>', [$Comp, []]),
  _T6 = createTemplate("<div class='loader'></div>"),
  _T7 = createTemplate('<!>', [$Comp, []]),
  _T8 = createTemplate('<!>', [$Comp, []]),
  _T9 = createTemplate(
    '<div><!><!><!><!></div>',
    [4, [0]],
    [4, [1]],
    [4, [2]],
    [4, [3]]
  ),
  _T10 = createTemplate('<p>User</p>'),
  _T11 = createTemplate('<p>Admin</p>'),
  _T12 = createTemplate('<!>', [$Comp, []]),
  _T13 = createTemplate('<!>', [$Comp, []]),
  _T14 = createTemplate('<p>divisible by 4</p>'),
  _T15 = createTemplate('<p>divisble by 2</p>'),
  _T16 = createTemplate('<p>divisible by 5</p>'),
  _T17 = createTemplate('<p>divisible by 3</p>'),
  _T18 = createTemplate(
    '<div><!><!><!><!></div>',
    [4, [0]],
    [4, [1]],
    [4, [2]],
    [4, [3]]
  ),
  _T19 = createTemplate('<!>', [$Comp, []]),
  _T20 = createTemplate('<p>buzz</p>'),
  _T21 = createTemplate('<p>fizz buzz</p>'),
  _T22 = createTemplate("<p class='pending'>pending</p>"),
  _T23 = createTemplate("<p class='other'>other</p>"),
  _T24 = createTemplate("<p class='approved'>approved</p>"),
  _T25 = createTemplate('<div><!><!></div>', [4, [0]], [4, [1]]),
  _T26 = createTemplate('<!>', [$Comp, []]),
  _T27 = createTemplate(
    '<div><!><!><!></div>',
    [$Comp, [0]],
    [$Comp, [1]],
    [$Comp, [2]]
  ),
  _T28 = createTemplate('<div><h1>Welcome</h1><!></div>', [4, [1]]),
  _T29 = createTemplate('<div><!></div>', [$CondEl, [0]])

const if_else = _T9(
  [[() => count() % 2 === 0, _T2()], _T()],
  [[isEven, _T4([Even])], _T3([Odd])],
  [
    [() => data() === undefined, _T6()],
    _T5([
      Content,
      {
        get data() {
          return data('content')
        }
      }
    ])
  ],
  [
    [() => data() === undefined, _T8([Loader])],
    _T7([
      Content,
      {
        get data() {
          return data('content')
        }
      }
    ])
  ]
)

const if__else_if = _T18(
  [
    [isAdmin, _T11()],
    [isUser, _T10()]
  ],
  [
    [() => route.matches('/page1'), _T13([Page1])],
    [() => route.matches('/page2'), _T12([Page2])]
  ],
  [
    [divisibleBy2, _T15()],
    [divisibleBy4, _T14()]
  ],
  [
    [divisibleBy3, _T17()],
    [divisibleBy5, _T16()]
  ]
)

const if__else_if__else = _T25(
  [
    [() => count() % 15 === 0, _T21()],
    [() => count() % 3 === 0, _T19([Fizz])],
    _T20()
  ],
  [
    [() => status() === 'approved', _T24()],
    [() => status() === 'pending', _T22()],
    _T23()
  ]
)

const if__if__if_else = _T29([
  showModal,
  _T28([
    [
      isLoggedIn,
      _T27(
        [LoginInfo],
        [
          Admin,
          ,
          {
            '$:if': isAdmin
          }
        ],
        [
          User,
          ,
          {
            '$:if': isUser
          }
        ]
      )
    ],
    _T26([Login])
  ])
])
