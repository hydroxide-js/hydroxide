'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from 'hydroxide';

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
    <button on-click={increment} class="primary-button">
      count is {state().foo.bar.baz}
    </button>
  );
}

export default Example;
`

export function DeepUpdateDemo() {
  return <HydroxideDemo code={jsx} css={sandpackDemoCommonCss} />
}
