'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackBasicCSS } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive, onConnect, onDisconnect } from 'hydroxide';

function getCursorPosition() {
  const position = reactive({ x: 0, y: 0 });

  function handleMouseMove(e) {
    position.set({ x: e.clientX, y: e.clientY });
  }

  onConnect(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });

  onDisconnect(() => {
    window.removeEventListener('mousemove', handleMouseMove);
  });

  return position;
}

function App() {
  const position = getCursorPosition();

  return (
    <div class="container">
      <div class="coords">
        <span class="label">x</span>
        <span class="value">{position().x}</span>
      </div>
      <div class="coords">
        <span class="label">y</span>
        <span class="value">{position().y}</span>
      </div>
    </div>
  );
}

export default App;
`

const css = `\
.container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.coords {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted-foreground);
}

.value {
  font-size: 3rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  min-width: 5ch;
  text-align: center;
}

${sandpackBasicCSS}
`

export const cursorPositionDemo = {
  jsx,
  css
}

export function CursorPositionDemo() {
  return <HydroxideDemo code={jsx} css={css} height={800} />
}
