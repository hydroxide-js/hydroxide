import { insert as _insert } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'
import { component as _component } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template('<h1>foo</h1>'),
  _tmpl2 = /*#__PURE__*/ _template('<div>foo <!></div>'),
  _tmpl3 = /*#__PURE__*/ _template('<h1>hi</h1>'),
  _tmpl4 = /*#__PURE__*/ _template('<span><!></span>'),
  _tmpl5 = /*#__PURE__*/ _template('<span><!></span>')

const test1 = _component(Foo) // self closing, no props, no children

const test2 = _component(Foo) // no props, no children

const test3 = _component(Foo.bar) // member expression level 1

const test4 = _component(A.B.C.D.E) // component name is member expression

const test5 = _component(Foo, {
  x: 42,
  y: foo,
  z: 'hello',
  p: () => 42
}) // props

const test6 = _component(Foo, null, {
  '$:foo': bar,
  '$:ref': ref
}) // namespaced "special" props

const test7 = _component(
  Foo,
  {
    x: 42,
    y: foo
  },
  {
    '$:ref': bar
  }
) // Normal Props + Reserved Props

const test8 = _component(Foo, {
  x: foo,
  children: 'hello'
}) // props + single string children

const test9 = _component(Foo, {
  x: foo,
  children: 10
}) // props + single numeric children

const test10 = _component(Foo, {
  x: foo,
  children: {
    foo: 'bar'
  }
}) // props + single obj as child

const test11 = _component(Foo, {
  x: foo,
  children: x
}) // props + single id

const test12 = _component(Foo, {
  get children() {
    return [
      'foo\n    bar\n    bro',
      100,
      true,
      null,
      /*#__PURE__*/ _tmpl3.cloneNode(true),
      'hello hi',
      /*#__PURE__*/ _tmpl.cloneNode(true),
      x =>
        /*#__PURE__*/ (() => {
          const _root = _tmpl2.cloneNode(true),
            _node = _root.firstChild.nextSibling

          _insert(_node, x)

          return _root
        })()
    ]
  }
}) // various types of children

const test13 = _component(Foo, {
  foo: true,
  bar: true,
  bazz: true
}) // props without values

const test14 = _component(Foo, {
  get children() {
    return count() * 2
  }
}) // reactive single child

const test15 = _component(Foo, {
  children: item =>
    /*#__PURE__*/ (() => {
      const _root2 = _tmpl4.cloneNode(true),
        _node2 = _root2.firstChild

      _insert(_node2, item)

      return _root2
    })()
}) // function single child

const test16 = _component(Foo, {
  get children() {
    return [
      /*#__PURE__*/ (() => {
        const _root3 = _tmpl5.cloneNode(true),
          _node3 = _root3.firstChild

        _insert(_node3, () => count() * 2)

        return _root3
      })(),
      () => count() * 4
    ]
  }
}) // element with reactive as one of the children

const test17 = _component(Foo, {
  get children() {
    return [() => _component(Bar), () => count() * 4]
  }
}) // component as one of the children

const test18 = _component(Foo, {
  get children() {
    return _component(Bar)
  }
}) // component as only child
