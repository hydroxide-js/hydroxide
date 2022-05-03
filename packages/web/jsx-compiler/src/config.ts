export const config = {
  importSource: '@nuejs/web',
  conditionAttributes: new Set(['if', 'else-if', 'else']),
  bindAttributes: new Set(['value', 'checked', 'selected'])
}
