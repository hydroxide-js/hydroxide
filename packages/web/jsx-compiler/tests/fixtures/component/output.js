import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template('<!>'),
  _T2 = $template('<!>'),
  _T3 = $template('<!>'),
  _T4 = $template('<!>'),
  _T5 = $template('<!>'),
  _T6 = $template('<!>'),
  _T7 = $template('<!>'),
  _T8 = $template('<!>'),
  _T9 = $template('<!>'),
  _T10 = $template('<!>'),
  _T11 = $template('<!>'),
  _T12 = $template('<h1>foo</h1>'),
  _T13 = $template('<div>foo <!></div>'),
  _T14 = $template('<h1>hi</h1>'),
  _T15 = $template('<!>'),
  _T16 = $template('<!>')

const test1 = _T(() => {
  $comp([], [Foo])
}) // no props - self closing

const test2 = _T2(() => {
  $comp([], [Foo])
}) // no props - with closing tag

const test3 = _T3(() => {
  $comp([], [Foo.bar])
}) // member expression level 1

const test4 = _T4(() => {
  $comp([], [A.B.C.D.E])
}) // member expression level 4

const test5 = _T5(() => {
  $comp(
    [],
    [
      Foo,
      {
        x: 42,
        y: foo,
        z: 'hello',

        get p() {
          return () => 42
        }
      }
    ]
  )
}) // props

const test6 = _T6(() => {
  $branch([], [() => bar, () => [Foo]])
}) // Reserved props

const test7 = _T7(() => {
  $branch(
    [],
    [
      () => bar,
      () => [
        Foo,
        {
          x: 42,
          y: foo
        }
      ]
    ]
  )
}) // Normal Props + Reserved Props

const test8 = _T8(() => {
  $comp(
    [],
    [
      Foo,
      {
        x: foo,
        children: 'hello'
      }
    ]
  )
}) // props + single string children

const test9 = _T9(() => {
  $comp(
    [],
    [
      Foo,
      {
        x: foo,
        children: 10
      }
    ]
  )
}) // props + single number children

const test10 = _T10(() => {
  $comp(
    [],
    [
      Foo,
      {
        x: foo,
        children: () => ({
          foo: 'bar'
        })
      }
    ]
  )
}) // props + single obj

const test11 = _T11(() => {
  $comp(
    [],
    [
      Foo,
      {
        x: foo,
        children: () => x
      }
    ]
  )
}) // props + single id

const test12 = _T15(() => {
  $comp(
    [],
    [
      Foo,
      {
        children: [
          'foo\n    bar\n    bro',
          100,
          true,
          null,
          _T14(),
          'hello hi',
          _T12,
          () => (x) =>
            _T13(() => {
              $insert([1], () => x)
            })
        ]
      }
    ]
  )
}) // various types of children

const test13 = _T16(() => {
  $comp(
    [],
    [
      Foo,
      {
        foo: true,
        bar: true,
        bazz: true
      }
    ]
  )
}) // props without values
