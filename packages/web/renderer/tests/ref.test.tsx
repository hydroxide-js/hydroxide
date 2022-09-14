import { render, Ref } from './imports'

it('ref works', () => {
  const container = document.createElement('div')

  const h1Ref = {} as Ref<HTMLHeadingElement>
  const h2Ref = {} as Ref<HTMLHeadingElement>

  function App() {
    return (
      <div>
        <h1 ref={h1Ref}> hello </h1>
        <h2 ref={h2Ref}> world </h2>
      </div>
    )
  }

  render(App, container)

  expect(h1Ref.current.innerHTML).toBe('hello')
  expect(h2Ref.current.innerHTML).toBe('world')
})

// for fix ts warnings in vscode
export const React = null
