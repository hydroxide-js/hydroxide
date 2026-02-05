'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `import { reactive } from 'hydroxide';

function Example() {
  const count = reactive(0);

  function increment() {
    count.set(count() + 1);
  }

  // open the console to see the logs
  // when state is updated, component does not re-render
  console.log('No renders!')

  return (
    <button on-click={increment} class="primary-button">
      count is {count()}
    </button>
  );
}

export default Example;
`

export const counterDemo = {
  jsx,
  css: sandpackDemoCommonCss
}

export function CounterDemo() {
  return <HydroxideDemo code={counterDemo.jsx} css={counterDemo.css} />
}

export function CounterCompiledDemo() {
  return (
    <HydroxideDemo code={counterDemo.jsx} css={counterDemo.css} defaultTab="compiled" />
  )
}
