# babel-plugin-hydroxide

Compiler for Hydroxide Framework

It compiles JSX into efficient Template Hydrations

## Example

### Input

```jsx
import { reactive } from 'hydroxide'

function Counter() {
  const count = reactive(0)
  const increment = () => count.set(count() + 1)
  return <button on-click={increment}>count is {count()}</button>
}
```

### Output

```js
import { reactive } from 'hydroxide'
import { delegateEvents, insert, template } from 'hydroxide-dom'

const _tmpl = /* #__PURE__ */ template('<button>count is <!></button>')

function Counter() {
  const count = reactive(0)
  const increment = () => count.set(count() + 1)

  return /* #__PURE__ */ (() => {
    const _root = _tmpl.cloneNode(true)
    const _node = _root.firstChild.nextSibling
    _root.$$click = increment
    insert(_node, count)
    return _root
  })()
}

delegateEvents(['click'])
```
