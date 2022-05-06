import { createTemplate } from '@nuejs/web'

const _T = createTemplate("<img src='hello.jpg' alt='hi'>"),
  _T2 = createTemplate("<img src='hello.jpg'>", [1, []]),
  _T3 = createTemplate('<img>', [1, []]),
  _T4 = createTemplate("<div a='true' d='10' e='e'></div>"),
  _T5 = createTemplate('<button foo bar bazz></button>'),
  _T6 = createTemplate('<button></button>', [1, []]),
  _T7 = createTemplate('<p></p>'),
  _T8 = createTemplate('<!>', [3, []]),
  _T9 = createTemplate("<p foo='foo'></p>", [1, []]),
  _T10 = createTemplate('<!>', [3, []]),
  _T11 = createTemplate("<div a='true' d='10' e='e' title='title'></div>", [
    1,
    []
  ]),
  _T12 = createTemplate('<!>', [3, []]),
  _T13 = createTemplate('<div></div>', [1, []]),
  _T14 = createTemplate('<!>', [3, []])

const test1 = _T() // 1. static attributes

const test2 = _T2({
  alt: x
}) // 2. static and dynamic attributes

const test3 = _T3({
  src: x,
  alt: y
}) // 3. all dynamic attributes

const test4 = _T4() // 4. literal value inside jsxExpressionContainer
// attributes with null and undefined value will be removed

const test5 = _T5() // 5. attributes without values

const test6 = _T6({
  'on:click': x,
  '$:value': y
}) // 6. attribute names with namespace

const test8 = _T8([x, _T7()]) // 8. conditional attribute only

const test9 = _T10([
  x,
  _T9({
    bar: bar
  })
]) // 8. conditional attributes with other attributes
// all together in one example

const test10 = _T12([
  x,
  _T11({
    'on:click': x,
    '$:value': y,
    'data-x': X
  })
])

const test11 = _T14([
  x,
  _T13({
    a: true,
    b: null,
    ...X,
    c: undefined,
    d: 10,
    e: 'e',
    'on:click': x,
    '$:value': y,
    title: 'title',
    'data-x': X
  })
]) // spread attribute present
