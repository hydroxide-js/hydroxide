const bindAttributes = ['value', 'checked', 'selected']
const conditionAttributes = ['if', 'else-if', 'else']

export const config = {
  importSource: '@nuejs/web',
  conditionAttributes: new Set(conditionAttributes),
  bindAttributes: new Set(bindAttributes),
  $Attributes: new Set([...bindAttributes, ...conditionAttributes])
}

export const marker = '<!>'
