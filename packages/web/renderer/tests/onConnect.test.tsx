import { onConnect } from 'hydroxide'
import { render } from 'hydroxide-dom'

test('after the component is rendered, onConnect callbacks are called for the root component', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()

  function App() {
    onConnect(fn1)
    onConnect(fn2)
    return <div>Hello</div>
  }

  render(App, document.createElement('div'))

  expect(fn1).toHaveBeenCalledTimes(1)
  expect(fn2).toHaveBeenCalledTimes(1)
})

test('after the component is rendered, onConnect callbacks are called for the child components', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()

  function Child() {
    onConnect(fn1)
    onConnect(fn2)
    return <div> child </div>
  }

  function App() {
    return (
      <div>
        <Child />
      </div>
    )
  }

  render(App, document.createElement('div'))

  expect(fn1).toHaveBeenCalledTimes(1)
  expect(fn2).toHaveBeenCalledTimes(1)
})
