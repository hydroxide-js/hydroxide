'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const effectCode = `\
import { reactive, effect } from 'hydroxide';

function Example() {
  const countA = reactive(0);
  const countB = reactive(0);

  // Only tracks countA - ignores countB changes
  // open the console to see the logs
  effect(() => {
    console.log('Counter A updated:', countA());
  });

  function incrementA() {
    countA.set(countA() + 1);
  }

  function incrementB() {
    countB.set(countB() + 1);
  }

  return (
    <div class="container">
      <div class="counter">
        <button on-click={incrementA}>A is {countA()}</button>
      </div>
      <div class="counter">
        <button on-click={incrementB}>B is {countB()}</button>
      </div>
    </div>
  );
}

export default Example;
`

const effectCss = `${sandpackDemoCommonCss}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--foreground);
}

.container {
  display: flex;
  gap: 1rem;
}

.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

button {
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
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

export function EffectDemo() {
  return <HydroxideDemo code={effectCode} css={effectCss} />
}
