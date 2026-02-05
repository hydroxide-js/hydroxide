'use client'

import { HydroxideDemo } from '../sandpack-demo'
import { sandpackBasicCSS } from '../sandpack-demo-common-css'

const jsx = `\
function App() {
  return (
    <div class="container">
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

function Welcome(props) {
  return <p >Hello, {props.name}!</p>;
}


export default App;
`

const css = `\
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--muted-foreground);
}

${sandpackBasicCSS}
`

export const componentsPropsDemo = {
  jsx,
  css
}

export function ComponentPropsDemo() {
  return (
    <HydroxideDemo
      code={componentsPropsDemo.jsx}
      css={componentsPropsDemo.css}
      height={450}
    />
  )
}
