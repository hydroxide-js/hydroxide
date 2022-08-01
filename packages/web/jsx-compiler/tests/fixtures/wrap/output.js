import { delegateEvents as _delegateEvents } from 'hydroxide-dom'
import { branch as _branch } from 'hydroxide-dom'
import { effect as _effect } from 'hydroxide'
import { setAttribute as _setAttribute } from 'hydroxide-dom'
import { component as _component } from 'hydroxide-dom'
import { insert as _insert } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template(
    "<div><p title='Wikipedia'>Wikipedia.com</p><!></div>"
  ),
  _tmpl2 = /*#__PURE__*/ _template('<div><p><!></p><!></div>'),
  _tmpl3 = /*#__PURE__*/ _template('<div><p><!></p><!></div>'),
  _tmpl4 = /*#__PURE__*/ _template('<div><p><!></p><!></div>'),
  _tmpl5 = /*#__PURE__*/ _template('<div>bar</div>'),
  _tmpl6 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl7 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl8 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl9 = /*#__PURE__*/ _template('<div>bar</div>'),
  _tmpl10 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl11 = /*#__PURE__*/ _template('<div><p><!></p><!></div>')

// don't wrap literals
const literalTest = /*#__PURE__*/ (() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild.nextSibling

  _insert(
    _node,
    _component(
      Info,
      {
        foo: 100,
        children: 300
      },
      {
        '$:bar': 200
      }
    )
  )

  return _root
})() // wrap member expressions

const exprTest = /*#__PURE__*/ (() => {
  const _root2 = _tmpl2.cloneNode(true),
    _node2 = _root2.firstChild,
    _node3 = _node2.firstChild,
    _node4 = _node2.nextSibling

  _effect(() => _setAttribute(_node2, 'title', props.title), 3)

  _insert(_node3, () => props.site)

  _insert(
    _node4,
    _component(
      Info,
      {
        get foo() {
          return props.foo
        },

        get children() {
          return bar.bazz
        }
      },
      {
        '$:bar': () => foo.bar
      }
    )
  )

  return _root2
})() // don't wrap indentifiers

const idTest = /*#__PURE__*/ (() => {
  const _root3 = _tmpl3.cloneNode(true),
    _node5 = _root3.firstChild,
    _node6 = _node5.firstChild,
    _node7 = _node5.nextSibling

  _setAttribute(_node5, 'title', title)

  _node5.$$click = handleClick

  _insert(_node6, site)

  _insert(
    _node7,
    _component(
      Info,
      {
        onRemove: handleRemove,
        children: mapping
      },
      {
        '$:bar': bar
      }
    )
  )

  return _root3
})() // wrap call expressions

const callTest = /*#__PURE__*/ (() => {
  const _root4 = _tmpl4.cloneNode(true),
    _node8 = _root4.firstChild,
    _node9 = _node8.firstChild,
    _node10 = _node8.nextSibling

  _node8.$$click = createHandler()

  _effect(() => _setAttribute(_node8, 'title', title()), 3)

  _insert(_node9, site)

  _insert(
    _node10,
    _component(
      Info,
      {
        get onRemove() {
          return foo()
        },

        get children() {
          return createMapping()
        }
      },
      {
        '$:bar': bar
      }
    )
  )

  return _root4
})() // don't wrap component() and branch() calls

const compAndBranch = /*#__PURE__*/ (() => {
  const _root5 = _tmpl6.cloneNode(true),
    _node11 = _root5.firstChild

  _insert(
    _node11,
    _component(Foo, {
      get bar() {
        return _component(Bar)
      },

      get branch() {
        return _branch([bar, () => /*#__PURE__*/ _tmpl5.cloneNode(true)])
      }
    })
  )

  return _root5
})() // don't wrap pure iife

const pureIIFE = /*#__PURE__*/ (() => {
  const _root7 = _tmpl8.cloneNode(true),
    _node13 = _root7.firstChild

  _insert(
    _node13,
    _component(Foo, {
      bar: /*#__PURE__*/ (() => {
        const _root6 = _tmpl7.cloneNode(true),
          _node12 = _root6.firstChild

        _insert(_node12, bar)

        return _root6
      })()
    })
  )

  return _root7
})() // don't wrap cloneNode

const cloneNode = /*#__PURE__*/ (() => {
  const _root8 = _tmpl10.cloneNode(true),
    _node14 = _root8.firstChild

  _insert(
    _node14,
    _component(Foo, {
      bar: /*#__PURE__*/ _tmpl9.cloneNode(true)
    })
  )

  return _root8
})() // don't wrap unreactive expressions

const unreactive = /*#__PURE__*/ (() => {
  const _root9 = _tmpl11.cloneNode(true),
    _node15 = _root9.firstChild,
    _node16 = _node15.firstChild,
    _node17 = _node15.nextSibling

  _effect(() => _setAttribute(_node15, 'title', foo + bar), 3)

  _insert(_node16, x === y)

  _insert(
    _node17,
    _component(Info, {
      foo: 10 + 200,
      children: x + y
    })
  )

  return _root9
})()

_delegateEvents(['click'])
