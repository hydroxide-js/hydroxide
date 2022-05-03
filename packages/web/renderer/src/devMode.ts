export const devMode = {
  /**
   *dont remove the condition false components, instead add attributes on it
   * */
  noRemove: true
}

const errorStylesAdded = false

// only used in development
export function createErrorElement() {
  if (!errorStylesAdded) {
    const errorStyle = document.createElement('style')
    errorStyle.textContent = `
    nue-error {
      outline: 2px dotted red;
      color:red;
      font-family: monospace;
      padding: 0.5em;
      letter-spacing: 0.1em;
      font-weight: bold;
      display: block
    }
    `
    document.body.append(errorStyle)
  }

  const errorEl = document.createElement('nue-error')
  errorEl.textContent = 'ERROR'
  return errorEl
}
