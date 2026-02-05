'use client'

import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

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

const css = `
${sandpackDemoCommonCss}

.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--muted-foreground);
}
`

export const componentsPropsDemo = {
  jsx,
  css
}
