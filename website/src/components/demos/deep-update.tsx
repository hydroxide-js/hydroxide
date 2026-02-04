'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const deepUpdateCode = `import { reactive } from 'hydroxide';

function Example() {
  const state = reactive({
    foo: {
      bar: { baz: 0 }
    }
  });

  // performing complex state update is simple
  function increment() {
    state('foo', 'bar', 'baz').do(n => n + 1);
  }

  return (
    <button on-click={increment}>
      count is {state().foo.bar.baz}
    </button>
  );
}

export default Example;
`

const deepUpdateCss = `${sandpackDemoCommonCss}
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

export function DeepUpdateDemo() {
  return <HydroxideDemo code={deepUpdateCode} css={deepUpdateCss} />
}
