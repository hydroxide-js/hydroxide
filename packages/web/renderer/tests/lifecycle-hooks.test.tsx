import { reactive, render, onConnect, onDisconnect } from './imports'

it('two way binding of input.value', () => {
  const container = document.createElement('div')
  document.body.append(container) // container must be connected to body for delegated events to work

  const count = reactive(10)

  const onConnectFn = jest.fn()
  const onDisconnectFn = jest.fn()

  function Even() {
    onConnect(onConnectFn)
    onDisconnect(onDisconnectFn)
    return <p> {count()} is even </p>
  }

  function App() {
    return (
      <div>
        <Even if={count() % 2 === 0} />
      </div>
    )
  }

  render(App, container)

  const p = container.querySelector('p')!

  // onConnect is called when Even is connected
  expect(p.textContent).toBe('10 is even')
  expect(onConnectFn).toHaveBeenCalledTimes(1)
  expect(onDisconnectFn).toHaveBeenCalledTimes(0)

  count.set(11)

  // onDisconnect is called when Even is disconnected
  const p2 = container.querySelector('p')!
  expect(p2).toBe(null)
  expect(onConnectFn).toHaveBeenCalledTimes(1)
  expect(onDisconnectFn).toHaveBeenCalledTimes(1)
})

// for fix ts warnings in vscode
export const React = null
