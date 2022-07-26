<img src="https://github.com/hydroxide-js/hydroxide/raw/main/docs/hx.png" />

# hydroxide-jsx

Type Definitions for Hydroxide's JSX

It contains Type Definitions for all HTML and SVG elements

<br/>

## Type Definitions

Attribute names are the same as HTML spec.

( They should not be camel-cased like how it is done in React )

This allows you to quickly copy any valid HTML and directly use it as JSX

( but you will need to self-close the void elements in JSX - `<input>` to `<input />` - as that is required by JSX spec )

<br/>

### Attributes

```javascript
'autoPlay' //  React
'autoplay' // HTML, Hydroxide
```

<br/>

### Event Handlers

Event Handlers have the `on-` prefix with event names being the same as browser event names.

They are not camel-cased like React to be consistent with browser event names.

```javascript
'onClick' // React
'on-click' // Hydroxide
```

<br/>

### Special Attributes

These attributes are not part of HTML spec, instead, they have a special meaning in Hydroxide.

```javascript
// creating reference to a DOM element
'ref'

// conditional rendering
'if'
'else'
'elseIf'

// two way binding
'bind-value'
'bind-checked'
```
