import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<!>', [$Comp, []]),
  _T2 = createTemplate('<!>', [$Comp, []]),
  _T3 = createTemplate('<!>', [$Comp, []]),
  _T4 = createTemplate('<!>', [$Comp, []]),
  _T5 = createTemplate('<!>', [$Comp, []]),
  _T6 = createTemplate('<!>', [$Comp, []]),
  _T7 = createTemplate('<!>', [$Comp, []]),
  _T8 = createTemplate('<!>', [$Comp, []]),
  _T9 = createTemplate('<h1>foo</h1>'),
  _T10 = createTemplate('<div>foo <!></div>', [$Embed, [1]]),
  _T11 = createTemplate('<h1>hi</h1>'),
  _T12 = createTemplate('<!>', [$Comp, []]),
  _T13 = createTemplate('<!>', [$Comp, []])

const test1 = _T([Foo]) // no props - self closing

const test2 = _T2([Foo]) // no props - with closing tag

const test3 = _T3([Foo.bar]) // member expression level 1

const test4 = _T4([A.B.C.D.E]) // member expression level 4

const test5 = _T5([
  Foo,
  {
    x: 42,
    y: foo,
    z: 'hello',
    p: () => 42
  }
]) // props

const test6 = _T6([
  Foo,
  ,
  {
    '$:if': bar
  }
]) // Reserved props

const test7 = _T7([
  Foo,
  {
    x: 42,
    y: foo
  },
  {
    '$:if': bar
  }
]) // Normal Props + Reserved Props

const test8 = _T8([
  Foo,
  {
    x: foo
  },
  ,
  ['hello']
]) // props + children

const test9 = _T12([
  Foo,
  ,
  ,
  [
    'foo\n    bar\n    bro',
    100,
    true,
    null,
    undefined,
    _T11(),
    'hello hi',
    _T9(),
    (x) => _T10(x)
  ]
]) // various types of children

const test10 = _T13([
  Foo,
  {
    foo: true,
    bar: true,
    bazz: true
  }
]) // props without values
