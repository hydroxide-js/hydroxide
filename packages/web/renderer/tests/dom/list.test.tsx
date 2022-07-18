import { render } from '../../src/index'
import { reactive } from 'hydroxide'
import { List } from '../../src/components/List'

it('renders static array', () => {
  const container = document.createElement('div')

  function App() {
    return (
      <ul>
        <List each={[1, 2, 3]} as={num => <li>{num()}</li>} />
      </ul>
    )
  }

  render(App, container)
  const li = (n: number) => `<li>${n}</li>`

  expect(container.innerHTML).toBe(`<ul>${li(1)}${li(2)}${li(3)}</ul>`)
})

it('renders reactive array', () => {
  const container = document.createElement('div')
  const numbers = reactive([1, 2, 3])

  function App() {
    return (
      <ul>
        <List each={numbers()} as={num => <li>{num()}</li>} />
      </ul>
    )
  }

  render(App, container)
  const li = (n: number) => `<li>${n}</li>`
  const list = (numbers: number[]) => numbers.map(li).join('')

  function tester(numbers: number[]) {
    expect(container.innerHTML).toBe(`<ul>${list(numbers)}</ul>`)
  }

  // initial render
  tester([1, 2, 3])

  // push to array
  numbers.push(4)
  tester([1, 2, 3, 4])

  // pop from array
  numbers.pop()
  tester([1, 2, 3])

  // insert at start
  numbers.insert(0, 10)
  tester([10, 1, 2, 3])

  // insert at end using negative index
  numbers.insert(-1, 20)
  tester([10, 1, 2, 3, 20])

  // insert at index 2
  numbers.insert(2, 100)
  tester([10, 1, 100, 2, 3, 20])

  // insert at index 3
  numbers.insert(2, 200)
  tester([10, 1, 200, 100, 2, 3, 20])

  // remove from start 1 item
  numbers.remove(0)
  tester([1, 200, 100, 2, 3, 20])

  // remove from index 2
  numbers.remove(2)
  tester([1, 200, 2, 3, 20])

  // swap index 0 and 1
  numbers.swap(0, 1)
  tester([200, 1, 2, 3, 20])

  // clear array
  numbers.clear()
  tester([])

  // insert list
  numbers.insertList(0, [1, 2, 3])
  tester([1, 2, 3])

  // insert list at index 1
  numbers.insertList(1, [10, 20, 30])
  tester([1, 10, 20, 30, 2, 3])

  // remove 3 items from list from index 1
  numbers.remove(1, 3)
  tester([1, 2, 3])
})

// for fix ts warnings in vscode
export const React = null
