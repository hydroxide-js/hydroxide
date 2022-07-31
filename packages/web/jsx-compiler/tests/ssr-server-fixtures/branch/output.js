import { component as _component } from 'hydroxide-dom'
import { branch as _branch } from 'hydroxide-dom'
import { ssr as _ssr } from 'hydroxide-dom'
const _tmpl = ['<p>even</p>'],
  _tmpl2 = ['<p>odd</p>'],
  _tmpl3 = ['', ''],
  _tmpl4 = ['', ''],
  _tmpl5 = ["<div class='loader'></div>"],
  _tmpl6 = ['', ''],
  _tmpl7 = ['', ''],
  _tmpl8 = ['', ''],
  _tmpl9 = ['<div>', '', '', '', '</div>'],
  _tmpl10 = ['<p>Admin</p>'],
  _tmpl11 = ['<p>User</p>'],
  _tmpl12 = ['', ''],
  _tmpl13 = ['', ''],
  _tmpl14 = ['<p>divisible by 2</p>'],
  _tmpl15 = ['<p>divisible by 4</p>'],
  _tmpl16 = ['<p>divisible by 3</p>'],
  _tmpl17 = ['<p>divisible by 5</p>'],
  _tmpl18 = ['<div>', '', '', '', '</div>'],
  _tmpl19 = ['<p>fizz buzz</p>'],
  _tmpl20 = ['', ''],
  _tmpl21 = ['<p>buzz</p>'],
  _tmpl22 = ["<p class='approved'>approved</p>"],
  _tmpl23 = ["<p class='pending'>pending</p>"],
  _tmpl24 = ["<p class='other'>other</p>"],
  _tmpl25 = ['<div>', '', '</div>'],
  _tmpl26 = ['', ''],
  _tmpl27 = ['', ''],
  _tmpl28 = ['<div>', '', '', '</div>'],
  _tmpl29 = ['', ''],
  _tmpl30 = ['<div><h1>Welcome</h1>', '</div>'],
  _tmpl31 = ['<div>', '</div>']

const if_else = _ssr(_tmpl9, [
  _branch(
    [() => count() % 2 === 0, () => _ssr(_tmpl, [])],
    [() => true, () => _ssr(_tmpl2, [])]
  ),
  _branch(
    [() => isEven(), () => _ssr(_tmpl3, [_component(Even)])],
    [() => true, () => _ssr(_tmpl4, [_component(Odd)])]
  ),
  _branch(
    [() => data() === undefined, () => _ssr(_tmpl5, [])],
    [
      () => true,
      () =>
        _ssr(_tmpl6, [
          _component(Content, {
            get data() {
              return data('content')
            }
          })
        ])
    ]
  ),
  _branch(
    [() => data() === undefined, () => _ssr(_tmpl7, [_component(Loader)])],
    [
      () => true,
      () =>
        _ssr(_tmpl8, [
          _component(Content, {
            get data() {
              return data('content')
            }
          })
        ])
    ]
  )
])

const if__else_if = _ssr(_tmpl18, [
  _branch(
    [() => isAdmin(), () => _ssr(_tmpl10, [])],
    [() => isUser(), () => _ssr(_tmpl11, [])]
  ),
  _branch(
    [() => route.matches('/page1'), () => _ssr(_tmpl12, [_component(Page1)])],
    [() => route.matches('/page2'), () => _ssr(_tmpl13, [_component(Page2)])]
  ),
  _branch(
    [() => divisibleBy2(), () => _ssr(_tmpl14, [])],
    [() => divisibleBy4(), () => _ssr(_tmpl15, [])]
  ),
  _branch(
    [() => divisibleBy3(), () => _ssr(_tmpl16, [])],
    [() => divisibleBy5(), () => _ssr(_tmpl17, [])]
  )
])

const if__else_if__else = _ssr(_tmpl25, [
  _branch(
    [() => count() % 15 === 0, () => _ssr(_tmpl19, [])],
    [() => count() % 3 === 0, () => _ssr(_tmpl20, [_component(Fizz)])],
    [() => true, () => _ssr(_tmpl21, [])]
  ),
  _branch(
    [() => status() === 'approved', () => _ssr(_tmpl22, [])],
    [() => status() === 'pending', () => _ssr(_tmpl23, [])],
    [() => true, () => _ssr(_tmpl24, [])]
  )
])

const if__if__if_else = _ssr(_tmpl31, [
  _branch([
    () => showModal(),
    () =>
      _ssr(_tmpl30, [
        _branch(
          [
            () => isLoggedIn(),
            () =>
              _ssr(_tmpl28, [
                _component(LoginInfo),
                _branch([() => isAdmin(), () => _ssr(_tmpl26, [_component(Admin)])]),
                _branch([() => isUser(), () => _ssr(_tmpl27, [_component(User)])])
              ])
          ],
          [() => true, () => _ssr(_tmpl29, [_component(Login)])]
        )
      ])
  ])
])
