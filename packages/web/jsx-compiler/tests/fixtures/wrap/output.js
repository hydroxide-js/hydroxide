import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate(
    "<div><p title='Wikipedia'>Wikipedia.com</p><!></div>",
    [$Comp, [1]]
  ),
  _T2 = createTemplate(
    '<div><p><!></p><!></div>',
    [$Attr, [0]],
    [$Embed, [0, 0]],
    [$Comp, [1]]
  ),
  _T3 = createTemplate(
    '<div><p><!></p><!></div>',
    [$Attr, [0]],
    [$Embed, [0, 0]],
    [$Comp, [1]]
  ),
  _T4 = createTemplate(
    '<div><p><!></p><!></div>',
    [$Attr, [0]],
    [$Embed, [0, 0]],
    [$Comp, [1]]
  )

// literals
// child, attribute -> stringify
// props, special prop, children -> as is
const literalTest = _T([
  Info,
  {
    foo: 100,
    children: [300]
  },
  {
    '$:bar': 200
  }
]) // expressions
// child, attribute, special prop, comp children -> wrap in arrow
// prop -> wrap in getter

const exprTest = _T2(
  {
    title: () => props.title
  },
  () => props.site,
  [
    Info,
    {
      get foo() {
        return 1 + 2
      },

      children: [() => x === y]
    },
    {
      '$:bar': () => Math.random()
    }
  ]
) // indentifiers
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is

const idTest = _T3(
  {
    title: () => title,
    'on:click': () => handleClick
  },
  site,
  [
    Info,
    {
      onRemove: handleRemove,
      children: [mapping]
    },
    {
      '$:bar': bar
    }
  ]
) // call expressions
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is

const callTest = _T4(
  {
    title: title,
    'on:click': createHandler
  },
  site,
  [
    Info,
    {
      get onRemove() {
        return foo()
      },

      children: [mapping]
    },
    {
      '$:bar': bar
    }
  ]
)
