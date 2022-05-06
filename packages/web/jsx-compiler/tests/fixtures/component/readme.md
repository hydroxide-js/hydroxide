# component

- Capitalized elements are treated as components
- Component name can also be member expression which is multiple levels deep
- props are collected in object
- special props are collected in different object
  - $:if converted to if
  - $:else-if converted to else-if
  - $:else converted to else
- if no props and only special props - props object is null
- children are collected in array
  - texts are trimmed
  - whitespaces inside the texts are left as is
  - whitespace only texts are removed
  - null, undefined and other static values are sent as is in array
  - elements are converted to templates
