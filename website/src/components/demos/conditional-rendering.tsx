'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackBasicCSS, sandpackPrimaryButtonCSS } from '../sandpack-demo-common-css'

const showHideCode = `\
import { reactive } from 'hydroxide';

function App() {
  const show = reactive(true);

  function toggle() {
    show.do(v => !v);
  }

  return (
    <div class="container">
      <button class="primary-button" on-click={toggle}>
        {show() ? 'Hide' : 'Show'} Message
      </button>
      <p if={show()} class="message">
        Hello!
      </p>
    </div>
  );
}

export default App;`

const showHideCss = `\
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.message {
  padding: 16px 24px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
}

${sandpackPrimaryButtonCSS}
${sandpackBasicCSS}
`

export function ShowHideDemo() {
  return <HydroxideDemo code={showHideCode} css={showHideCss} height={600} />
}
