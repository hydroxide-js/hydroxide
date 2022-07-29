import { reactive } from 'hydroxide'
import { render } from '../../src/index'

describe('if', () => {
  it('conditional element, starts with true', () => {
    const container = document.createElement('div')
    const count = reactive(10)

    function App() {
      return (
        <div>
          <p if={count() % 2 === 0}> even </p>
        </div>
      )
    }

    render(App, container)

    // initial render
    expect(container.innerHTML).toBe('<div><p>even</p></div>')

    // update count
    count.do(v => v + 1)

    // p is replaced with comment node  because count is odd
    expect(container.innerHTML).toBe('<div><!----></div>')

    // update count
    count.do(v => v + 1)

    // paragraph is added back
    expect(container.innerHTML).toBe('<div><p>even</p></div>')
  })

  it('conditional element, starts with false', () => {
    const container = document.createElement('div')
    const count = reactive(10)

    function App() {
      return (
        <div>
          <p if={count() % 2 !== 0}> odd </p>
        </div>
      )
    }

    render(App, container)

    // initial render does not have <p> and has comment
    expect(container.innerHTML).toBe('<div><!----></div>')

    // update count to 11
    count.do(v => v + 1)

    // comment is replaced with <p>
    expect(container.innerHTML).toBe('<div><p>odd</p></div>')

    // update count to 12
    count.do(v => v + 1)

    // paragraph is removed
    expect(container.innerHTML).toBe('<div><!----></div>')
  })
})

it('if / else', () => {
  const container = document.createElement('div')
  const count = reactive(10)

  function App() {
    return (
      <div>
        <p if={count() % 2 === 0}> even </p>
        <p else> odd </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  expect(container.innerHTML).toBe('<div><p>even</p></div>')

  // update count to 11
  count.do(v => v + 1)

  // show odd
  expect(container.innerHTML).toBe('<div><p>odd</p></div>')

  // update count to 12
  count.do(v => v + 1)

  // show even
  expect(container.innerHTML).toBe('<div><p>even</p></div>')
})

it('if / else-if - single reactive', () => {
  const container = document.createElement('div')
  const show = reactive('lorem')

  function App() {
    return (
      <div>
        <p if={show() === 'foo'}> foo </p>
        <p else-if={show() === 'bar'}> bar </p>
        <p else-if={show() === 'bazz'}> bazz </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  expect(container.innerHTML).toBe('<div><!----></div>')

  // show foo
  show.set('foo')
  expect(container.innerHTML).toBe('<div><p>foo</p></div>')

  // show bar
  show.set('bar')
  expect(container.innerHTML).toBe('<div><p>bar</p></div>')

  // show bazz
  show.set('bazz')
  expect(container.innerHTML).toBe('<div><p>bazz</p></div>')

  // show none
  show.set('xxx')
  expect(container.innerHTML).toBe('<div><!----></div>')

  // show bazz
  show.set('bazz')
  expect(container.innerHTML).toBe('<div><p>bazz</p></div>')
})

it('if / else-if - multiple reactives', () => {
  const container = document.createElement('div')
  const a = reactive(true)
  const b = reactive(true)
  const c = reactive(true)

  function App() {
    return (
      <div>
        <p if={a()}> a </p>
        <p else-if={b()}> b </p>
        <p else-if={c()}> c </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  expect(container.innerHTML).toBe('<div><p>a</p></div>')

  // change b or c, and expect no change
  b.set(false)
  expect(container.innerHTML).toBe('<div><p>a</p></div>')
  c.set(false)
  expect(container.innerHTML).toBe('<div><p>a</p></div>')

  // set a to false and expect nothing to be rendered
  a.set(false)
  expect(container.innerHTML).toBe('<div><!----></div>')

  // set b to true, and expect b to be rendered
  b.set(true)
  expect(container.innerHTML).toBe('<div><p>b</p></div>')

  // set a to true, and expect a to be rendered
  a.set(true)
  expect(container.innerHTML).toBe('<div><p>a</p></div>')
})

it('if / else-if / else ', () => {
  const container = document.createElement('div')
  const show = reactive('lorem')

  function App() {
    return (
      <div>
        <p if={show() === 'foo'}> foo </p>
        <p else-if={show() === 'bar'}> bar </p>
        <p else> bazz </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  expect(container.innerHTML).toBe('<div><p>bazz</p></div>')

  // show foo
  show.set('foo')
  expect(container.innerHTML).toBe('<div><p>foo</p></div>')

  // show bar
  show.set('bar')
  expect(container.innerHTML).toBe('<div><p>bar</p></div>')

  // show bazz
  show.set('xxx')
  expect(container.innerHTML).toBe('<div><p>bazz</p></div>')

  // show bazz
  show.set('yyy')
  expect(container.innerHTML).toBe('<div><p>bazz</p></div>')

  // show bazz
  show.set('foo')
  expect(container.innerHTML).toBe('<div><p>foo</p></div>')
})

// for fixing warning in vscode
export const React = null
