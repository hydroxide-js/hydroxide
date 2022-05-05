# web jsx compiler

compiles the jsx to optimized web templates

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
