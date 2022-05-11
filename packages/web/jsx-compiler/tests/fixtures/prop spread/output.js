import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate('<!>', [$Comp, []]),
  _T2 = createTemplate('<p>hi</p>', [$Attr, []])

const test1 = _T([
  Foo,
  {
    a: A,
    b: 'B',
    ...C,
    d: 42,
    ...E,
    ...F,
    g: null,
    h: undefined
  }
]) // component

const test2 = _T2({
  a: A,
  b: 'B',
  ...C,
  d: 42,
  ...E,
  ...F,
  g: null,
  h: undefined
}) // element
