'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
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
      <button
        on-click={incrementA} class="primary-button">
        A is {countA()}
      </button>
      <button on-click={incrementB} class="primary-button">
        B is {countB()}
      </button>
    </div>
  );
}

export default Example;
`

const css = `
${sandpackDemoCommonCss}

.container {
  display: flex;
  gap: 12px;
}
`

export function EffectDemo() {
  return <HydroxideDemo code={jsx} css={css} />
}

export const effectDemo = {
  jsx,
  css
}
