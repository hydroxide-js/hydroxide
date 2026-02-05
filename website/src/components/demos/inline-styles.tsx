'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `import { reactive } from 'hydroxide';

function App() {
  const hue = reactive(200);

  return (
    <div class="container">
      <div
        class="box"
        style={\`background-color: oklch(0.7 0.3 \${hue()}); transform: rotate(\${hue() / 2}deg)\`}
      />
      <input
        type="range"
        min="0"
        max="360"
        bind-value={hue}
      />
      <p>Hue: {hue()}°</p>
    </div>
  );
}

export default App;`

const css = `${sandpackDemoCommonCss}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 1rem;
  transition: transform 0.1s ease;
}

input[type="range"] {
  width: 200px;
  accent-color: var(--foreground);
}

p {
  font-variant-numeric: tabular-nums;
  color: var(--muted-foreground);
}`

export const inlineStylesDemo = {
  jsx,
  css
}

export function InlineStylesDemo() {
  return <HydroxideDemo code={jsx} css={css} />
}
