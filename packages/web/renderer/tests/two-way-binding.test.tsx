import { reactive, render } from './imports'
import { fireEvent } from '@testing-library/dom'

it('two way binding of input.value', () => {
  const container = document.createElement('div')
  document.body.append(container) // container must be connected to body for delegated events to work

  const count = reactive(10)

  function App() {
    return (
      <div>
        <input type="text" bind-value={count} />
      </div>
    )
  }

  render(App, container)

  const input = container.querySelector('input')!

  // init
  expect(input.value).toBe('10')

  // DOM to state
  fireEvent.input(input, {
    target: {
      value: '20'
    }
  })

  expect(count()).toBe(20)

  // state to DOM
  count.set(100)
  expect(input.value).toBe('100')
})

// for fix ts warnings in vscode
export const React = null
