import { ssr as _ssr } from 'hydroxide-dom'
import { component as _component } from 'hydroxide-dom'
const _tmpl = ['', ''],
  _tmpl2 = ['', ''],
  _tmpl3 = ['', ''],
  _tmpl4 = ['', ''],
  _tmpl5 = ['', ''],
  _tmpl6 = ['', ''],
  _tmpl7 = ['', ''],
  _tmpl8 = ['', ''],
  _tmpl9 = ['', ''],
  _tmpl10 = ['', ''],
  _tmpl11 = ['', ''],
  _tmpl12 = ['<h1>foo</h1>'],
  _tmpl13 = ['<div>foo ', '</div>'],
  _tmpl14 = ['<h1>hi</h1>'],
  _tmpl15 = ['', ''],
  _tmpl16 = ['', ''],
  _tmpl17 = ['', ''],
  _tmpl18 = ['<span>', '</span>'],
  _tmpl19 = ['', ''],
  _tmpl20 = ['<span>', '</span>'],
  _tmpl21 = ['', ''],
  _tmpl22 = ['', ''],
  _tmpl23 = ['', ''],
  _tmpl24 = ['', ''],
  _tmpl25 = ['', '']

const test1 = _ssr(_tmpl, [_component(Foo)]) // self closing, no props, no children

const test2 = _ssr(_tmpl2, [_component(Foo)]) // no props, no children

const test3 = _ssr(_tmpl3, [_component(Foo.bar)]) // member expression level 1

const test4 = _ssr(_tmpl4, [_component(A.B.C.D.E)]) // component name is member expression

const test5 = _ssr(_tmpl5, [
  _component(Foo, {
    x: 42,
    y: foo,
    z: 'hello',
    p: () => 42
  })
]) // props

const test6 = _ssr(_tmpl6, [_component(Foo)]) // namespaced "special" props

const test7 = _ssr(_tmpl7, [
  _component(Foo, {
    x: 42,
    y: foo
  })
]) // Normal Props + Reserved Props

const test8 = _ssr(_tmpl8, [
  _component(Foo, {
    x: foo,
    children: 'hello'
  })
]) // props + single string children

const test9 = _ssr(_tmpl9, [
  _component(Foo, {
    x: foo,
    children: 10
  })
]) // props + single numeric children

const test10 = _ssr(_tmpl10, [
  _component(Foo, {
    x: foo,
    children: {
      foo: 'bar'
    }
  })
]) // props + single obj as child

const test11 = _ssr(_tmpl11, [
  _component(Foo, {
    x: foo,
    children: x
  })
]) // props + single id

const test12 = _ssr(_tmpl15, [
  _component(Foo, {
    get children() {
      return [
        () => 'foo bar bro',
        () => 100,
        () => true,
        () => null,
        () => _ssr(_tmpl14, []),
        () => 'hello hi',
        () => _ssr(_tmpl12, []),
        () => x => _ssr(_tmpl13, [x])
      ]
    }
  })
]) // various types of children

const test13 = _ssr(_tmpl16, [
  _component(Foo, {
    foo: true,
    bar: true,
    bazz: true
  })
]) // props without values

const test14 = _ssr(_tmpl17, [
  _component(Foo, {
    get children() {
      return count() * 2
    }
  })
]) // reactive single child

const test15 = _ssr(_tmpl19, [
  _component(Foo, {
    children: item => _ssr(_tmpl18, [item()])
  })
]) // function single child

const test16 = _ssr(_tmpl21, [
  _component(Foo, {
    get children() {
      return [() => ' ', () => _ssr(_tmpl20, [count() * 2]), () => count() * 4, () => ' ']
    }
  })
]) // element with reactive as one of the children

const test17 = _ssr(_tmpl23, [
  _component(Foo, {
    get children() {
      return [
        () => ' ',
        () => _ssr(_tmpl22, [_component(Bar)]),
        () => count() * 4,
        () => ' '
      ]
    }
  })
]) // component as one of the children

const test18 = _ssr(_tmpl25, [
  _component(Foo, {
    get children() {
      return [() => ' ', () => _ssr(_tmpl24, [_component(Bar)]), () => ' ']
    }
  })
]) // component as only child
