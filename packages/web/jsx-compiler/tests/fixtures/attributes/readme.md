# Element Attributes

- attributes with literal values inside the expression container should be embeded in the markup
  - these literal values include
    - string,
    - template tag without expressions
    - number,
    - boolean
- `null` and `undefined` valued attributes should be removed
- other values should be collected in a props object in expressions array
- if attribute spread is done on element, all attributes should be collected in a props object and static attributes should not be embeded in markup - reason being that it's possible that they may get overridden by the attributes added from spread. `null` and `undefined` valued attributes will _not_ be removed and should be kept in props object for the same reason
- attributes without any value and just name, are embedded as is (without any value)
  - in case of spread, it's given `true` value and saved in props object
