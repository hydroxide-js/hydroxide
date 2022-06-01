# hydroxide jsx compiler

compiles the jsx to html templates

## scripts

```json
{
  // build the jsx-compiler library
  "build": "rollup -c",

  // type check the codebase
  "type-check": "tsc --noEmit ./src/index.ts",

  // test the functionality of compiler
  "test": "jest",

  // build the library
  // update the patch version and publish
  "publish-patch": "npm run build && npm version patch && npm publish --public"
}
```

## Transformation

### Static

```javascript
// input
const heading = <h1> hello </h1>

// compiles to
const T = createTemplate('<h1> hello </h1>')
const heading = T()
```

### Embed and Attribute

```javascript
// input
const heading = <h1 title={title}> {text} </h1>

// compiles to
const T = createTemplate('<h1><!></h1>')

const heading = T(() => {
  attr([], { title: () => title })
  insert([0], text)
})
```

### Component Embed

```javascript
// input
const heading = (
  <div>
    <Foo />
  </div>
)

// compiles to
const T = createTemplate('<div><!></div>')
const heading = T(() => {
  comp([0], Foo)
})
```

```javascript
$Attr(path, attrObj)
$Insert(path, anyValue)
$Comp(path, comp, props, specialProps)
$Branch(path, branch1, branch2)
```

```jsx
<p $:if={x}> x </p>
<Foo $:else={y} foo={1} />
```

```javascript
T(() => {
  $Branch([0], [x, () => T2()], [y, () => [Foo, { foo: 1 }]])
})
```
