import {
  attr,
  branch,
  component,
  delegateEvents,
  insert,
  template
} from 'hydroxide-dom'
import { effect } from 'hydroxide'

const _tmpl = /*#__PURE__*/ template(
    "<div><p title='Wikipedia'>Wikipedia.com</p><!></div>"
  ),
  _tmpl2 = /*#__PURE__*/ template('<div><p><!></p><!></div>'),
  _tmpl3 = /*#__PURE__*/ template('<div><p><!></p><!></div>'),
  _tmpl4 = /*#__PURE__*/ template('<div><p><!></p><!></div>'),
  _tmpl5 = /*#__PURE__*/ template('<div>bar</div>'),
  _tmpl6 = /*#__PURE__*/ template('<div><!></div>'),
  _tmpl7 = /*#__PURE__*/ template('<div><!></div>'),
  _tmpl8 = /*#__PURE__*/ template('<div><!></div>'),
  _tmpl9 = /*#__PURE__*/ template('<div>bar</div>'),
  _tmpl10 = /*#__PURE__*/ template('<div><!></div>'),
  _tmpl11 = /*#__PURE__*/ template('<div><p><!></p><!></div>')

// don't wrap literals
const literalTest = /*#__PURE__*/ (() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild.nextSibling

  insert(
    _node,
    component(
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

  effect(() => attr(_node2, 'title', props.title), 1)
  insert(_node3, () => props.site)
  insert(
    _node4,
    component(
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

  attr(_node5, 'title', title)
  _node5.$$click = handleClick
  insert(_node6, site)
  insert(
    _node7,
    component(
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
  effect(() => attr(_node8, 'title', title()), 1)
  insert(_node9, site)
  insert(
    _node10,
    component(
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

  insert(
    _node11,
    component(Foo, {
      bar: component(Bar),
      branch: branch([bar, /*#__PURE__*/ _tmpl5.cloneNode(true)])
    })
  )
  return _root5
})() // don't wrap pure iife

const pureIIFE = /*#__PURE__*/ (() => {
  const _root7 = _tmpl8.cloneNode(true),
    _node13 = _root7.firstChild

  insert(
    _node13,
    component(Foo, {
      bar: /*#__PURE__*/ (() => {
        const _root6 = _tmpl7.cloneNode(true),
          _node12 = _root6.firstChild

        insert(_node12, bar)
        return _root6
      })()
    })
  )
  return _root7
})() // don't wrap cloneNode

const cloneNode = /*#__PURE__*/ (() => {
  const _root8 = _tmpl10.cloneNode(true),
    _node14 = _root8.firstChild

  insert(
    _node14,
    component(Foo, {
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

  effect(() => attr(_node15, 'title', foo + bar), 1)
  insert(_node16, x === y)
  insert(
    _node17,
    component(Info, {
      foo: 10 + 200,
      children: x + y
    })
  )
  return _root9
})()

delegateEvents(['click'])
