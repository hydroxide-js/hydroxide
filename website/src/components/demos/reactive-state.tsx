'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'

const sharedStateCode = `import { reactive } from 'hydroxide';

// State created outside components - shared globally
const count = reactive(0);

function DisplayA() {
  return (
    <div class="card">
      <span class="label">Display A</span>
      <span class="value">{count()}</span>
    </div>
  );
}

function DisplayB() {
  return (
    <div class="card">
      <span class="label">Display B</span>
      <span class="value">{count()}</span>
    </div>
  );
}

function Controls() {
  return (
    <div class="controls">
      <button on-click={() => count.do(v => v - 1)}>−</button>
      <button on-click={() => count.do(v => v + 1)}>+</button>
    </div>
  );
}

function App() {
  return (
    <div class="app">
      <div class="displays">
        <DisplayA />
        <DisplayB />
      </div>
      <Controls />
    </div>
  );
}

export default App;`

const sharedStateCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151515;
  font-family: system-ui, sans-serif;
  color: #fafafa;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.displays {
  display: flex;
  gap: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: #2a2a2a;
  border-radius: 0.5rem;
  border: 1px solid #3a3a3a;
}
.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}
.value {
  font-size: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.controls {
  display: flex;
  gap: 0.5rem;
}
button {
  background: #2a2a2a;
  color: #fafafa;
  border: 1px solid #3a3a3a;
  padding: 0.5rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
button:hover {
  background: #3a3a3a;
}`

export function SharedStateDemo() {
  return <HydroxideDemo code={sharedStateCode} css={sharedStateCss} />
}
