import { render } from '../../src/index'

it('renders the content of component in container', () => {
  const container = document.createElement('div')

  function App() {
    return (
      <div>
        <h1> heading </h1>
        <p> paragraph </p>
      </div>
    )
  }

  render(App, container)

  expect(container.innerHTML).toBe('<div><h1>heading</h1><p>paragraph</p></div>')
})

// for fix ts warnings in vscode
export const React = null
