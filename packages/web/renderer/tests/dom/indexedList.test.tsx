import { render } from '../../src/index'
import { reactive } from 'hydroxide'
import { List } from '../../src/components/List'

it('renders static array', () => {
  const container = document.createElement('div')

  function App() {
    return (
      <ul>
        <List.Indexed
          each={['A', 'B', 'C']}
          as={(num, index) => (
            <li>
              {num()} at {index()}
            </li>
          )}
        />
      </ul>
    )
  }

  render(App, container)
  const li = (item: string, index: number) => `<li>${item} at ${index}</li>`

  expect(container.innerHTML).toBe(`<ul>${li('A', 0)}${li('B', 1)}${li('C', 2)}</ul>`)
})

it('renders reactive array', () => {
  const container = document.createElement('div')
  const numbers = reactive(['A', 'B', 'C'])

  function App() {
    return (
      <ul>
        <List.Indexed
          each={numbers()}
          as={(num, index) => (
            <li>
              {num()} at {index()}
            </li>
          )}
        />
      </ul>
    )
  }

  render(App, container)
  const li = (item: string, index: number) => `<li>${item} at ${index}</li>`
  const list = (items: string[]) => items.map(li).join('')

  function tester(items: string[]) {
    expect(container.innerHTML).toBe(`<ul>${list(items)}</ul>`)
  }

  // initial render
  tester(['A', 'B', 'C'])

  // push to array
  numbers.push('D')

  tester(['A', 'B', 'C', 'D'])

  // pop from array
  numbers.pop()
  tester(['A', 'B', 'C'])

  // insert at start
  numbers.insert(0, 'X')
  tester(['X', 'A', 'B', 'C'])

  // insert at end using negative index
  numbers.insert(-1, 'Z')
  tester(['X', 'A', 'B', 'C', 'Z'])

  // insert at index 2
  numbers.insert(2, 'P')
  tester(['X', 'A', 'P', 'B', 'C', 'Z'])

  // insert at index 3

  numbers.insert(2, 'Q')
  tester(['X', 'A', 'Q', 'P', 'B', 'C', 'Z'])

  // remove from start 1 item
  numbers.remove(0)
  tester(['A', 'Q', 'P', 'B', 'C', 'Z'])

  // remove from index 2

  numbers.remove(2)
  tester(['A', 'Q', 'B', 'C', 'Z'])

  // swap index 0 and 1
  numbers.swap(0, 1)
  tester(['Q', 'A', 'B', 'C', 'Z'])

  // clear array
  numbers.clear()
  tester([])

  // insert list
  numbers.insertList(0, ['M', 'N', 'O'])
  tester(['M', 'N', 'O'])

  // insert list at index 1
  numbers.insertList(1, ['X', 'Y', 'Z'])
  tester(['M', 'X', 'Y', 'Z', 'N', 'O'])

  // remove 3 items from list from index 1
  numbers.remove(1, 3)
  tester(['M', 'N', 'O'])

  // swap first two items
  numbers.swap(0, 1)
  tester(['N', 'M', 'O'])
})

// for fix ts warnings in vscode
export const React = null
