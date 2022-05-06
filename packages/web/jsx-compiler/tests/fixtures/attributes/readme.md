# Element Attributes

- static valued attributes should be embeded in the markup of template
  - static values include:
    - string,
    - template tag without expressions
    - number, bigInt
    - boolean
  - any other values or expressions are considered dynamic
- `null` and `undefined` valued attributes should be removed
- dynamic attributes should be collected in a props object
- if attribute spread is done on element, all attributes should be collected in a props object and static attributes should not be embeded in markup - reason being that it's possible that these they may get overridden by the attributes added from spread
  - `null` and `undefined` valued attributes will not be removed and should be kept in props object
- attributes without any value, are embedded as is (without any value)
  - in case of spread on element, `true` value is given to it and saved in props object
