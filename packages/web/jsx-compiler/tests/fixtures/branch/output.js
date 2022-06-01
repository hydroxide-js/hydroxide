import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template('<p>even</p>'),
  _T2 = $template('<p>odd</p>'),
  _T3 = $template("<div class='loader'></div>"),
  _T4 = $template('<div><!><!><!><!></div>'),
  _T5 = $template('<p>Admin</p>'),
  _T6 = $template('<p>User</p>'),
  _T7 = $template('<p>divisble by 2</p>'),
  _T8 = $template('<p>divisible by 4</p>'),
  _T9 = $template('<p>divisible by 3</p>'),
  _T10 = $template('<p>divisible by 5</p>'),
  _T11 = $template('<div><!><!><!><!></div>'),
  _T12 = $template('<p>fizz buzz</p>'),
  _T13 = $template('<p>buzz</p>'),
  _T14 = $template("<p class='approved'>approved</p>"),
  _T15 = $template("<p class='pending'>pending</p>"),
  _T16 = $template("<p class='other'>other</p>"),
  _T17 = $template('<div><!><!></div>'),
  _T18 = $template('<div><!><!><!></div>'),
  _T19 = $template('<div><h1>Welcome</h1><!></div>'),
  _T20 = $template('<div><!></div>')

const if_else = _T4(() => {
  $branch([0], [() => count() % 2 === 0, _T], [() => true, _T2])
  $branch([1], [isEven, () => [Even]], [() => true, () => [Odd]])
  $branch(
    [2],
    [() => data() === undefined, _T3],
    [
      () => true,
      () => [
        Content,
        {
          get data() {
            return data('content')
          }
        }
      ]
    ]
  )
  $branch(
    [3],
    [() => data() === undefined, () => [Loader]],
    [
      () => true,
      () => [
        Content,
        {
          get data() {
            return data('content')
          }
        }
      ]
    ]
  )
})

const if__else_if = _T11(() => {
  $branch([0], [isAdmin, _T5], [isUser, _T6])
  $branch(
    [1],
    [() => route.matches('/page1'), () => [Page1]],
    [() => route.matches('/page2'), () => [Page2]]
  )
  $branch([2], [divisibleBy2, _T7], [divisibleBy4, _T8])
  $branch([3], [divisibleBy3, _T9], [divisibleBy5, _T10])
})

const if__else_if__else = _T17(() => {
  $branch(
    [0],
    [() => count() % 15 === 0, _T12],
    [() => count() % 3 === 0, () => [Fizz]],
    [() => true, _T13]
  )
  $branch(
    [1],
    [() => status() === 'approved', _T14],
    [() => status() === 'pending', _T15],
    [() => true, _T16]
  )
})

const if__if__if_else = _T20(() => {
  $branch(
    [0],
    [
      showModal,
      () =>
        _T19(() => {
          $branch(
            [1],
            [
              isLoggedIn,
              () =>
                _T18(() => {
                  $comp([0], [LoginInfo])
                  $branch([1], [isAdmin, () => [Admin]])
                  $branch([2], [isUser, () => [User]])
                })
            ],
            [() => true, () => [Login]]
          )
        })
    ]
  )
})
