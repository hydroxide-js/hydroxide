<img src="https://github.com/hydroxide-js/hydroxide/raw/main/docs/hx.png" />

# Hydroxide

Reactive core of the [Hydroxide](https://github.com/hydroxide-js/hydroxide) Framework

<br/>

## Creating State with `reactive`

creates a "reactive" value. Whenever it is updated using any of the [updator](#methods-to-update-reactive) methods, it automatically updates anything that uses it.

reactive value is a function that when called returns the current value it

```javascript
const count = reactive(0)

count() // 0
```

JSX where you use the reactive; gets updated whenever the reactive is updated

```jsx
function Counter() {
  const count = reactive(0)

  setInterval(() => {
    count.set(count() + 1)
  })

  return <p> count is {count()} </p>
}
```

<br/>

## Updating State

### `Reactive.set`

sets a new value for the reactive

```javascript
count.set(10)
```

<br/>

### `Reactive.do`

`Reactive.do` takes a transformer function as argument. It is used when you want to assign new value using the previous current value of reactive.

```javascript
count.do(v => v + 1)
```

<br/>

### `reactive(...path)` to perform a deep update

if you want to update a value deep in a nested object, call the reactive with the path to the value and use the reactive methods to update it.

```javascript
const user = reactive({
  name: 'John Doe',
  address: {
    street: 'Main St',
    city: 'New York'
  },
  todos: [
    { task: 'Buy milk', done: true },
    { task: 'Buy Groceries', done: false }
  ]
})

// update street address of the user
user('address', 'street').set('Broadway')

// toggle first task of the user
user('todos', 0, 'done').do(v => !v)
```

<br/>

## Special State Management APIs for Arrays

Take this state for example:

```javascript
const todos = reactive([
  { task: 'Buy milk', done: true },
  { task: 'Buy Groceries', done: false },
  { task: 'Grab some snacks', done: false }
])
```

Here is the list of array methods to perform all kinds of updates

<br/>

### `Reactive.push`

push the item at the end of array

```javascript
todos.push({ task: 'Eat Pizza', done: false })
```

<br/>

### `Reactive.insert`

insert the item at the specified index

```javascript
todos.insert(1, { task: 'Write Code', done: true })
```

<br/>

### `Reactive.remove`

remove the item at given index, optional second argument is the number of items to remove (default is 1)

```javascript
// remove 1 todo at index 2
todos.remove(2)

// remove 2 todo at index 3
todos.remove(2, 3)
```

<br/>

### `Reactive.swap`

swap the items at given indices

```javascript
// swap the items at index 2 and 3
todos.swap(2, 3)
```

<br/>

### `Reactive.pop`

removes the last item from the array

optional second argument is the number of items to remove (default is 1)

```javascript
// remove 1 item at the end of array
todos.pop()

// remove 3 items at the end of array
todos.pop(3)
```

<br/>

### `Reactive.pushList` & `Reactive.insertList`

If you want to insert or push more an entire list instead of an item, use the `insertList` and `pushList` methods

```javascript
todos.insertList(3, [
  { task: 'Write Tests', done: true },
  { task: 'Publish Package', done: false }
])
```

```javascript
todos.pushList([
  { task: 'Write Tests', done: true },
  { task: 'Publish Package', done: false }
])
```

<br/>

## Updating Array nested inside an object

call the reactive with path you want to target and use the update methods

```javascript
const xyz = reactive({
  foo: {
    bar: {
      bazz: [1, 2, 3]
    }
  }
})
```

```javascript
xyz('foo', 'bar', 'bazz').push(4)
```

<br />

## Create side effects using `effect`

```javascript
effect(() => {
  console.log('count is', count())
})
```

effect takes a function as argument, this function is executed whenever any reactives that are read inside it are updated.

<br />

## Create a computed value

Creating a computed value is just as simple as wrapping the expression with a function. So It's basically a helper function that calculates and returns value.

```javascript
function App() {
  const count = reactive(0)
  const double = () => count() * 2
  return (
    <div>
      <p> count is {count()} </p>
      <p> double is {count() * 2} </p>
      <p> double is {double()} </p>
    </div>
  )
}
```

<br/>

## Create a memoized value using `memo`

If a value is calculated as a result of a heavy computation, it is not wise to calculate it everytime like this:

```javascript
function App() {
  const count = reactive(0)
  const val = () => heavyComputation(count())
  return (
    <div>
      <p> {val()} </p>
      <p> {val()} </p>
      <p> {val()} </p>
    </div>
  )
}
```

Instead it should be memoized using `memo`

```javascript
const val = memo(() => heavyComputation(count()))
```

With this approach, no matter how many times you read the memoized value - `val()`, it's value will only be recalculated when any reactive's used for calculating the value isi updated. - `count`

<br/>

## Lifecycle Hooks

### `onConnect`, `onDisconnect`

When a component is connected, the function passed to `onConnect` hook is called. When the component is disconnected, the function passed to `onDisconnect` hook is called.

```javascript
function Foo() {
  onConnect(() => {
    console.log('component connected')
  })

  onDisconnect(() => {
    console.log('component disconnected')
  })

  return <p> Hello world </p>
}
```

You can use these hooks multiple times too:

```javascript
function Foo() {
  onConnect(() => {
    console.log('component connected 1')
  })

  onConnect(() => {
    console.log('component connected 2')
  })

  return <p> Hello world </p>
}
```

<br />

## Custom Hooks

Using `effect`, `onConnect` and `onDisconnect` you can create custom hooks
