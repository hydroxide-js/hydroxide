'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'

const baseCss = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #09090b;
  font-family: 'Outfit', system-ui, sans-serif;
  color: #fafafa;
  -webkit-font-smoothing: antialiased;
}`

const showHideCode = `import { reactive } from 'hydroxide';

function App() {
  const show = reactive(true);

  return (
    <div class="container">
      <button class="toggle-btn" on-click={() => show.do(v => !v)}>
        {show() ? 'Hide' : 'Show'} Message
      </button>
      <p if={show()} class="message">Hello! I can be toggled.</p>
    </div>
  );
}

export default App;`

const showHideCss = `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}
.toggle-btn {
  background: #fafafa;
  color: #09090b;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  min-width: 160px;
  transition: transform 120ms ease-out;
}
@media (hover: hover) {
  .toggle-btn:hover { transform: translateY(-1px); }
}
.toggle-btn:active { transform: scale(0.97); }
.message {
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.625rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}`

export function ShowHideDemo() {
  return <HydroxideDemo code={showHideCode} css={showHideCss} />
}
