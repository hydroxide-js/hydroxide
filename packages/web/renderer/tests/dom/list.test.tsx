import { render } from '../../src/index'
import { List, reactive } from 'hydroxide'

it('static array', () => {
  const container = document.createElement('div')

  function App() {
    return (
      <ul>
        <List each={[1, 2, 3]}>{num => <li>{num()}</li>}</List>
      </ul>
    )
  }

  render(App, container)
  const li = (n: number) => `<li>${n}</li>`

  expect(container.innerHTML).toBe(`<ul>${li(1)}${li(2)}${li(3)}</ul>`)
})

it('reactive array', () => {
  const container = document.createElement('div')
  const numbers = reactive([1, 2, 3])

  function App() {
    return (
      <ul>
        <List each={numbers()}>{num => <li>{num()}</li>}</List>
      </ul>
    )
  }

  render(App, container)
  const li = (n: number) => `<li>${n}</li>`
  const list = (numbers: number[]) => numbers.map(li).join('')

  // initial render
  expect(container.innerHTML).toBe(`<ul>${list([1, 2, 3])}</ul>`)

  // push to array
  numbers.push(4)
  expect(container.innerHTML).toBe(`<ul>${list([1, 2, 3, 4])}</ul>`)

  // pop from array
  numbers.pop()
  expect(container.innerHTML).toBe(`<ul>${list([1, 2, 3])}</ul>`)

  // insert at start
  numbers.insert(0, 10)
  expect(container.innerHTML).toBe(`<ul>${list([10, 1, 2, 3])}</ul>`)

  // insert at end using negative index
  numbers.insert(-1, 20)
  expect(container.innerHTML).toBe(`<ul>${list([10, 1, 2, 3, 20])}</ul>`)

  // insert at index 2
  numbers.insert(2, 100)
  expect(container.innerHTML).toBe(`<ul>${list([10, 1, 100, 2, 3, 20])}</ul>`)

  // insert at index 3
  numbers.insert(2, 200)
  expect(container.innerHTML).toBe(`<ul>${list([10, 1, 200, 100, 2, 3, 20])}</ul>`)

  // remove from start 1 item
  numbers.remove(0)
  expect(container.innerHTML).toBe(`<ul>${list([1, 200, 100, 2, 3, 20])}</ul>`)

  // remove from index 2
  numbers.remove(2)
  expect(container.innerHTML).toBe(`<ul>${list([1, 200, 2, 3, 20])}</ul>`)

  // swap index 0 and 1
  numbers.swap(0, 1)
  expect(container.innerHTML).toBe(`<ul>${list([200, 1, 2, 3, 20])}</ul>`)

  // clear array
  numbers.clear()
  expect(container.innerHTML).toBe(`<ul>${list([])}</ul>`)

  // insert list
  numbers.insertList(0, [1, 2, 3])
  expect(container.innerHTML).toBe(`<ul>${list([1, 2, 3])}</ul>`)

  // insert list at index 1
  numbers.insertList(1, [10, 20, 30])
  expect(container.innerHTML).toBe(`<ul>${list([1, 10, 20, 30, 2, 3])}</ul>`)

  // remove 3 items from list from index 1
  numbers.remove(1, 3)
  expect(container.innerHTML).toBe(`<ul>${list([1, 2, 3])}</ul>`)
})

// for fix ts warnings in vscode
export const React = null
