import { component, insert, template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ template('<h1>foo</h1>'),
  _tmpl2 = /*#__PURE__*/ template('<div>foo <!></div>'),
  _tmpl3 = /*#__PURE__*/ template('<h1>hi</h1>'),
  _tmpl4 = /*#__PURE__*/ template('<span><!></span>'),
  _tmpl5 = /*#__PURE__*/ template('<span><!></span>')

const test1 = component(Foo) // self closing, no props, no children

const test2 = component(Foo) // no props, no children

const test3 = component(Foo.bar) // member expression level 1

const test4 = component(A.B.C.D.E) // component name is member expression

const test5 = component(Foo, {
  x: 42,
  y: foo,
  z: 'hello',
  p: () => 42
}) // props

const test6 = component(Foo, null, {
  '$:foo': bar,
  '$:ref': ref
}) // namespaced "special" props

const test7 = component(
  Foo,
  {
    x: 42,
    y: foo
  },
  {
    '$:ref': bar
  }
) // Normal Props + Reserved Props

const test8 = component(Foo, {
  x: foo,
  children: 'hello'
}) // props + single string children

const test9 = component(Foo, {
  x: foo,
  children: 10
}) // props + single numeric children

const test10 = component(Foo, {
  x: foo,
  children: {
    foo: 'bar'
  }
}) // props + single obj as child

const test11 = component(Foo, {
  x: foo,
  children: x
}) // props + single id

const test12 = component(Foo, {
  get children() {
    return [
      'foo\n    bar\n    bro',
      100,
      true,
      null,
      /*#__PURE__*/ _tmpl3.cloneNode(true),
      'hello hi',
      /*#__PURE__*/ _tmpl.cloneNode(true),
      (x) =>
        /*#__PURE__*/ (() => {
          const _root = _tmpl2.cloneNode(true),
            _node = _root.firstChild.nextSibling

          insert(_node, x)
          return _root
        })()
    ]
  }
}) // various types of children

const test13 = component(Foo, {
  foo: true,
  bar: true,
  bazz: true
}) // props without values

const test14 = component(Foo, {
  get children() {
    return count() * 2
  }
}) // reactive single child

const test15 = component(Foo, {
  children: (item) =>
    /*#__PURE__*/ (() => {
      const _root2 = _tmpl4.cloneNode(true),
        _node2 = _root2.firstChild

      insert(_node2, item)
      return _root2
    })()
}) // function single child

const test16 = component(Foo, {
  get children() {
    return [
      /*#__PURE__*/ (() => {
        const _root3 = _tmpl5.cloneNode(true),
          _node3 = _root3.firstChild

        insert(_node3, () => count() * 2)
        return _root3
      })(),
      () => count() * 4
    ]
  }
}) // element with reactive as one of the children

const test17 = component(Foo, {
  get children() {
    return [component(Bar), () => count() * 4]
  }
}) // component as one of the children

const test18 = component(Foo, {
  get children() {
    return component(Bar)
  }
}) // component as only child
