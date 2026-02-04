'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const counterCode = `import { reactive } from 'hydroxide';

function Example() {
  const count = reactive(0);

  function increment() {
    count.set(count() + 1);
  }

  // open the console to see the logs
  // when state is updated, component does not re-render
  console.log('No renders!')

  return (
    <button on-click={increment}>
      count is {count()}
    </button>
  );
}

export default Example;
`

const counterCss = `${sandpackDemoCommonCss}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--foreground);
}

button {
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.98);
}
`

export function CounterDemo() {
  return <HydroxideDemo code={counterCode} css={counterCss} />
}

export function CounterCompiledDemo() {
  return <HydroxideDemo code={counterCode} css={counterCss} defaultTab="compiled" />
}
