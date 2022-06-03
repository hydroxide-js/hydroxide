import { $template, $insert, $attr, $comp, $branch } from 'hydroxide-dom'

const _T = $template("<div><p title='Wikipedia'>Wikipedia.com</p><!></div>"),
  _T2 = $template('<div><p><!></p><!></div>'),
  _T3 = $template('<div><p><!></p><!></div>'),
  _T4 = $template('<div><p><!></p><!></div>')

// literals
// child, attribute -> stringify
// props, special prop, children -> as is
const literalTest = _T(() => {
  $comp(
    [1],
    [
      Info,
      {
        foo: 100,
        children: 300
      },
      {
        '$:bar': 200
      }
    ]
  )
}) // expressions
// child, attribute, special prop, comp children -> wrap in arrow
// prop -> wrap in getter

const exprTest = _T2(() => {
  $attr([0], {
    title: () => props.title
  })
  $insert([0, 0], () => props.site)
  $comp(
    [1],
    [
      Info,
      {
        get foo() {
          return 1 + 2
        },

        get children() {
          return x === y
        }
      },
      {
        '$:bar': () => Math.random()
      }
    ]
  )
}) // indentifiers
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is

const idTest = _T3(() => {
  $attr([0], {
    title: () => title,
    'on:click': () => handleClick
  })
  $insert([0, 0], () => site)
  $comp(
    [1],
    [
      Info,
      {
        onRemove: handleRemove,
        children: mapping
      },
      {
        '$:bar': bar
      }
    ]
  )
}) // call expressions
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is

const callTest = _T4(() => {
  $attr([0], {
    title: title,
    'on:click': createHandler
  })
  $insert([0, 0], () => site)
  $comp(
    [1],
    [
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
    ]
  )
})
