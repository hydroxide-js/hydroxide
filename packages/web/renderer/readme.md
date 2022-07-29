<img src="https://github.com/hydroxide-js/hydroxide/raw/main/docs/hx.png" />

# hydroxide-dom

DOM renderer for [Hydroxide](https://github.com/hydroxide-js/hydroxide) Framework

It exposes a set of APIs that is used by the [Hydroxide Compiler](https://github.com/hydroxide-js/hydroxide/tree/main/packages/web/jsx-compiler) to render JSX to DOM elements and a set of APIs for Library users.

<br/>

## APIs for Library Users

### `render`

renders the given Component inside the given container element

```typescript
render(component: Component<any>, container: HTMLElement)
```

#### Example

```typescript
import { render } from 'hydroxide-dom'

// component
const Hello = () => <p> Hello World </p>

// container where we want to render the component
const container = document.querySelector('#app')

render(Hello, container)
```

<br/>

### `<List />`

A component that maps a given list of items to DOM elements and updates them whenever the list is updated.

Note: A List component requires that it is wrapped with a containing element.

```typescript
export type ListProps<T> = {
  each: Array<T>
  as: (item: ReadonlyReactive<T>) => JSX.Element
}

List<T>(props: ListProps<T>): JSX.Element
```

#### Example

```typescript
import { List } from 'hydroxide-dom'
import { reactive } from 'hydroxide'

function Names() {
  const names = reactive(['John', 'Jane', 'Mary'])

  return (
    <ul>
      <List each={names()} as={name => <li>{name()}</li>} />
    </ul>
  )
}
```

<br/>
<br/>

## APIs for Hydroxide Compiler

These APIs are NOT meant to be used by Library users, they are only for Hydroxide Compiler.

Checkout the [Hydroxide Compiler Playground](https://hydroxide-compiler-playground.pages.dev/) to see how the compiler uses these APIs.

### `template`, `svg`

Creates an HTML Element from given HTML markup. If the markup is of an SVG element, `svg` should be used instead of `template` as SVG element needs to be created a bit differently.

```typescript
template(html: string): HTMLElement
```

```typescript
svg(html: string): HTMLElement
```

### setAttribute

sets attribute of given HTMLElement.

If the value is falsy, the attribute is removed from the element

```typescript
setAttribute(element: HTMLElement, attrName: string, value: string)
```

### `insert`

inserts an expression in place of given marker comment element

the expression can be either a stringifiable value, HTMLElement or an array of them.

```typescript
insert(marker: Comment, expr: any)
```

### `component`

Initializes a component with given props

```typescript
component(comp: Component<any>, props?: Record<string, any>): JSX.Element
```

### `delegateEvents`

delegates given events for the application

```typescript
delegateEvents(eventNames: string[])
```

### `branch`

creates a branching logic

```typescript
export type Branch = [condition: Function, renderer: () => HTMLElement]

branch(...branches: Branch[])
```
