import { render } from '../../src/index'

it('normal and custom event handlers work', () => {
  const container = document.createElement('div')
  document.body.append(container) // container must be connected to body for delegated events to work

  const clickHandler = jest.fn()
  const fooBarHandler = jest.fn()

  function App() {
    return (
      <div>
        <button on-click={clickHandler} on-foo-bar={fooBarHandler}>
          increment{' '}
        </button>
      </div>
    )
  }

  render(App, container)

  const button = container.querySelector('button')!

  expect(clickHandler).toHaveBeenCalledTimes(0)
  expect(fooBarHandler).toHaveBeenCalledTimes(0)

  button.click()

  expect(clickHandler).toHaveBeenCalledTimes(1)
  expect(fooBarHandler).toHaveBeenCalledTimes(0)

  const event = new CustomEvent('foo-bar', {
    bubbles: true
  })

  button.dispatchEvent(event)

  expect(clickHandler).toHaveBeenCalledTimes(1)
  expect(fooBarHandler).toHaveBeenCalledTimes(1)
})

// for fix ts warnings in vscode
export const React = null
