'use client'

import { HydroxideDemo } from '../sandpack-demo'
import { sandpackBasicCSS, sandpackPrimaryButtonCSS } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from 'hydroxide';

function Display(props) {
  return <p class="count">Count: {props.count}</p>;
}

function App() {
  const count = reactive(0);

  function increment() {
    count.set(count() + 1);
  }

  return (
    <div class="container">
      <Display count={count()} />
      <button class="primary-button" on-click={increment}>
        Increment
      </button>
    </div>
  );
}

export default App;
`

const css = `\
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.count {
  font-size: 1.5rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

${sandpackPrimaryButtonCSS}
${sandpackBasicCSS}
`

export const componentsPropsDemo = {
  jsx,
  css
}

export function DynamicPropsDemo() {
  return (
    <HydroxideDemo
      code={componentsPropsDemo.jsx}
      css={componentsPropsDemo.css}
      height={500}
    />
  )
}
