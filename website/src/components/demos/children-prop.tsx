'use client'

import { HydroxideDemo } from '../sandpack-demo'
import { sandpackBasicCSS } from '../sandpack-demo-common-css'

const jsx = `\
function Card(props) {
  return (
    <div class="card">
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <div>
        <h2>My Card</h2>
        <p>This content is passed as children</p>
      </div>
    </Card>
  );
}

export default App;
`

const css = `\
.card {
  padding: 16px;
  border-radius: 12px;
  background: var(--card);
  border: 1px solid var(--border);
}

.card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  font-size: 14px;
}

.card p {
  color: var(--muted-foreground);
  font-size: 14px;
}

${sandpackBasicCSS}

`

export const componentsPropsDemo = {
  jsx,
  css
}

export function ChildrenPropDemo() {
  return (
    <HydroxideDemo
      code={componentsPropsDemo.jsx}
      css={componentsPropsDemo.css}
      height={500}
    />
  )
}
