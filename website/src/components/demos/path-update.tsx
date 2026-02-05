'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackBasicCSS, sandpackPrimaryButtonCSS } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from 'hydroxide';

function Example() {
  const state = reactive({
    foo: {
      bar: {
        bazz: 0
      }
    }
  });

  function increment() {
    state('foo', 'bar', 'bazz').do(v => v + 1);
  }

  return (
    <button on-click={increment} class="primary-button">
      count is {state().foo.bar.bazz}
    </button>
  );
}

export default Example;`

const css = `\
${sandpackPrimaryButtonCSS}
${sandpackBasicCSS}
`

export function PathUpdateDemo() {
  return <HydroxideDemo code={jsx} css={css} height={600} />
}
