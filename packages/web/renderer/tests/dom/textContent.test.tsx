import { reactive } from 'hydroxide'
import { render } from '../../src/index'

it('textContent is updated', () => {
  const container = document.createElement('div')
  const count = reactive(10)

  function App() {
    return (
      <div>
        <h1> count is {count()} </h1>
        <p> paragraph </p>
      </div>
    )
  }

  render(App, container)

  // initial render
  expect(container.innerHTML).toBe('<div><h1>count is 10</h1><p>paragraph</p></div>')
  const heading = container.querySelector('h1')!

  expect(heading.innerHTML).toBe('count is 10')

  // update count
  count.do(v => v + 1)

  // textContent is updated
  expect(heading.innerHTML).toBe('count is 11')

  // update count again
  count.do(v => v + 1)

  // textContent is updated
  expect(heading.innerHTML).toBe('count is 12')
})

// for fix ts warnings in vscode
export const React = null
