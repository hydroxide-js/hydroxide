'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackBasicCSS, sandpackPrimaryButtonCSS } from '../sandpack-demo-common-css'

const reactiveObjectPropsCode = `import { reactive } from 'hydroxide';

function Display(props) {
  return <p class="count">Count: {props.count()}</p>;
}

function App() {
  const count = reactive(0);

  return (
    <div class="container">
      <Display count={count} />
      <button class="primary-button" on-click={() => count.do(v => v + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`

const css = `\
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

${sandpackPrimaryButtonCSS}
${sandpackBasicCSS}
`

export function ReactivePropsDemo() {
  return <HydroxideDemo code={reactiveObjectPropsCode} css={css} height={500} />
}
