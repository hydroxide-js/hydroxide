export const sandpackBasicCSS = `\
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --background: #151515;
  --foreground: oklch(0.97 0 0);
  --muted-foreground: oklch(0.8 0 0);
  --card: oklch(0.26 0 0);
  --input: oklch(0.23 0 0 / 0.3);
  --ring-border: oklch(0.97 0 0 / 0.2);
  --ring-ring: oklch(0.97 0 0 / 0.1);
  --primary: oklch(0.97 0 0);
  --primary-foreground: oklch(0.03 0 0);
  --border: oklch(0.3 0 0);
}

html, body {
  background: var(--background);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--foreground);
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
`

export const sandpackPrimaryButtonCSS = `\
.primary-button {
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.primary-button:hover {
  opacity: 0.9;
}

.primary-button:active {
  transform: scale(0.98);
}
`

export const sandpackInputCSS = `\
input {
  height: 2.25rem;
  width: 100%;
  min-width: 0;
  padding: 0.25rem 0.625rem;
  font-size: 0.875rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--input);
  color: var(--foreground);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input::placeholder {
  color: var(--muted-foreground);
}

input:focus {
  border-color: var(--ring-border);
  box-shadow: 0 0 0 3px var(--ring-ring);
}
`

export const sandpackRangeInputCSS = `\
input[type="range"] {
  height: auto;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

input[type="range"]:focus {
  box-shadow: none;
}
`

export const sandpackDemoCommonCss = `\
${sandpackBasicCSS}

${sandpackPrimaryButtonCSS}

${sandpackInputCSS}

${sandpackRangeInputCSS}
`
