import { reactive } from 'hydroxide'
import { render } from '../../src'

it('disconnected node does not get updated', () => {
  const container = document.createElement('div')
  const count = reactive(20)

  function App() {
    return (
      <div>
        <p if={count() > 10}> count is {count()} </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  const paragraph = container.querySelector('p')!
  expect(container.innerHTML).toBe('<div><p>count is 20</p></div>')
  expect(paragraph.innerHTML).toBe('count is 20')

  // update count
  count.perform((v) => v + 1)

  // dom is updated
  expect(container.innerHTML).toBe('<div><p>count is 21</p></div>')
  expect(paragraph.innerHTML).toBe('count is 21')

  // update count
  count.perform((v) => v + 1)

  // dom is updated
  expect(container.innerHTML).toBe('<div><p>count is 22</p></div>')
  expect(paragraph.innerHTML).toBe('count is 22')

  // update count to < 10
  count.set(5)

  // p is replaced with comment node  because count is odd
  expect(container.innerHTML).toBe('<div><!----></div>')
  expect(paragraph.innerHTML).toBe('count is 22') // count is not updated in paragraph

  // update count to 6
  count.perform((v) => v + 1)

  // still same
  expect(container.innerHTML).toBe('<div><!----></div>')
  expect(paragraph.innerHTML).toBe('count is 22') // count is not updated in paragraph

  // update count to 30 (>10)
  count.set(30)

  // paragraph is added back
  expect(container.innerHTML).toBe('<div><p>count is 30</p></div>')
  expect(paragraph.innerHTML).toBe('count is 30')
})

// for fixing React warning in vscode
export const React = null
