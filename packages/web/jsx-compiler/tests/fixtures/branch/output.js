import { insert as _insert } from 'hydroxide-dom'
import { branch as _branch } from 'hydroxide-dom'
import { component as _component } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template('<p>even</p>'),
  _tmpl2 = /*#__PURE__*/ _template('<p>odd</p>'),
  _tmpl3 = /*#__PURE__*/ _template("<div class='loader'></div>"),
  _tmpl4 = /*#__PURE__*/ _template('<div><!><!><!><!></div>'),
  _tmpl5 = /*#__PURE__*/ _template('<p>Admin</p>'),
  _tmpl6 = /*#__PURE__*/ _template('<p>User</p>'),
  _tmpl7 = /*#__PURE__*/ _template('<p>divisble by 2</p>'),
  _tmpl8 = /*#__PURE__*/ _template('<p>divisible by 4</p>'),
  _tmpl9 = /*#__PURE__*/ _template('<p>divisible by 3</p>'),
  _tmpl10 = /*#__PURE__*/ _template('<p>divisible by 5</p>'),
  _tmpl11 = /*#__PURE__*/ _template('<div><!><!><!><!></div>'),
  _tmpl12 = /*#__PURE__*/ _template('<p>fizz buzz</p>'),
  _tmpl13 = /*#__PURE__*/ _template('<p>buzz</p>'),
  _tmpl14 = /*#__PURE__*/ _template("<p class='approved'>approved</p>"),
  _tmpl15 = /*#__PURE__*/ _template("<p class='pending'>pending</p>"),
  _tmpl16 = /*#__PURE__*/ _template("<p class='other'>other</p>"),
  _tmpl17 = /*#__PURE__*/ _template('<div><!><!></div>'),
  _tmpl18 = /*#__PURE__*/ _template('<div><!><!><!></div>'),
  _tmpl19 = /*#__PURE__*/ _template('<div><h1>Welcome</h1><!></div>'),
  _tmpl20 = /*#__PURE__*/ _template('<div><!></div>')

const if_else = /*#__PURE__*/ (() => {
  const _root = _tmpl4.cloneNode(true),
    _node = _root.firstChild,
    _node2 = _node.nextSibling,
    _node3 = _node2.nextSibling,
    _node4 = _node3.nextSibling

  _insert(
    _node,
    _branch(
      [() => count() % 2 === 0, () => /*#__PURE__*/ _tmpl.cloneNode(true)],
      [() => true, () => /*#__PURE__*/ _tmpl2.cloneNode(true)]
    )
  )

  _insert(
    _node2,
    _branch(
      [isEven, () => _component(Even)],
      [() => true, () => _component(Odd)]
    )
  )

  _insert(
    _node3,
    _branch(
      [() => data() === undefined, () => /*#__PURE__*/ _tmpl3.cloneNode(true)],
      [
        () => true,
        () =>
          _component(Content, {
            get data() {
              return data('content')
            }
          })
      ]
    )
  )

  _insert(
    _node4,
    _branch(
      [() => data() === undefined, () => _component(Loader)],
      [
        () => true,
        () =>
          _component(Content, {
            get data() {
              return data('content')
            }
          })
      ]
    )
  )

  return _root
})()

const if__else_if = /*#__PURE__*/ (() => {
  const _root2 = _tmpl11.cloneNode(true),
    _node5 = _root2.firstChild,
    _node6 = _node5.nextSibling,
    _node7 = _node6.nextSibling,
    _node8 = _node7.nextSibling

  _insert(
    _node5,
    _branch(
      [isAdmin, () => /*#__PURE__*/ _tmpl5.cloneNode(true)],
      [isUser, () => /*#__PURE__*/ _tmpl6.cloneNode(true)]
    )
  )

  _insert(
    _node6,
    _branch(
      [() => route.matches('/page1'), () => _component(Page1)],
      [() => route.matches('/page2'), () => _component(Page2)]
    )
  )

  _insert(
    _node7,
    _branch(
      [divisibleBy2, () => /*#__PURE__*/ _tmpl7.cloneNode(true)],
      [divisibleBy4, () => /*#__PURE__*/ _tmpl8.cloneNode(true)]
    )
  )

  _insert(
    _node8,
    _branch(
      [divisibleBy3, () => /*#__PURE__*/ _tmpl9.cloneNode(true)],
      [divisibleBy5, () => /*#__PURE__*/ _tmpl10.cloneNode(true)]
    )
  )

  return _root2
})()

const if__else_if__else = /*#__PURE__*/ (() => {
  const _root3 = _tmpl17.cloneNode(true),
    _node9 = _root3.firstChild,
    _node10 = _node9.nextSibling

  _insert(
    _node9,
    _branch(
      [() => count() % 15 === 0, () => /*#__PURE__*/ _tmpl12.cloneNode(true)],
      [() => count() % 3 === 0, () => _component(Fizz)],
      [() => true, () => /*#__PURE__*/ _tmpl13.cloneNode(true)]
    )
  )

  _insert(
    _node10,
    _branch(
      [
        () => status() === 'approved',
        () => /*#__PURE__*/ _tmpl14.cloneNode(true)
      ],
      [
        () => status() === 'pending',
        () => /*#__PURE__*/ _tmpl15.cloneNode(true)
      ],
      [() => true, () => /*#__PURE__*/ _tmpl16.cloneNode(true)]
    )
  )

  return _root3
})()

const if__if__if_else = /*#__PURE__*/ (() => {
  const _root6 = _tmpl20.cloneNode(true),
    _node15 = _root6.firstChild

  _insert(
    _node15,
    _branch([
      showModal,
      () =>
        /*#__PURE__*/ (() => {
          const _root5 = _tmpl19.cloneNode(true),
            _node14 = _root5.firstChild.nextSibling

          _insert(
            _node14,
            _branch(
              [
                isLoggedIn,
                () =>
                  /*#__PURE__*/ (() => {
                    const _root4 = _tmpl18.cloneNode(true),
                      _node11 = _root4.firstChild,
                      _node12 = _node11.nextSibling,
                      _node13 = _node12.nextSibling

                    _insert(_node11, _component(LoginInfo))

                    _insert(
                      _node12,
                      _branch([isAdmin, () => _component(Admin)])
                    )

                    _insert(_node13, _branch([isUser, () => _component(User)]))

                    return _root4
                  })()
              ],
              [() => true, () => _component(Login)]
            )
          )

          return _root5
        })()
    ])
  )

  return _root6
})()
