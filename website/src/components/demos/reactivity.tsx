'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'
import { counterDemo } from './counter'
import { effectDemo } from './effect'

export function ReactiveCounterDemo() {
  return <HydroxideDemo code={counterDemo.jsx} css={counterDemo.css} />
}

const effectCode = `import { reactive, effect } from 'hydroxide';

function App() {
  const count = reactive(0);
  const log = reactive([]);

  effect(() => {
    log.push(\`count changed to \${count()}\`);
  });

  return (
    <div class="container">
      <button class="primary-button" on-click={() => count.do(v => v + 1)}>
        Increment ({count()})
      </button>
      <div class="log">
        <List each={log()} as={(msg) => <p>{msg()}</p>} />
      </div>
    </div>
  );
}

export default App;`

export function EffectDemo() {
  return <HydroxideDemo code={effectDemo.jsx} css={effectDemo.css} />
}
