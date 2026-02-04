'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '@/components/sandpack-demo-common-css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const baseCss = `${sandpackDemoCommonCss}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--foreground);
  padding: 1rem;
}
`

const examples = [
  {
    name: 'Reactive State',
    code: `import { reactive } from 'hydroxide';

function Counter() {
  const count = reactive(0);
  const increment = () => count.set(count() + 1);

  return (
    <button on-click={increment}>
      count is {count()}
    </button>
  );
}

export default Counter;
`,
    css: `${baseCss}
button {
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
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
  },
  {
    name: 'Components and Props',
    code: `function Welcome(props) {
  return <p class="welcome">Hello, {props.name}!</p>;
}

function App() {
  return (
    <div class="container">
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

export default App;
`,
    css: `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.welcome {
  padding: 0.75rem 1rem;
  background: var(--card);
  border-radius: 0.5rem;
  border: 1px solid var(--muted);
}
`
  },
  {
    name: 'Conditional Rendering',
    code: `import { reactive } from "hydroxide";

function FizzBuzz() {
  const count = reactive(0);

  return (
    <div class="container">
      <input
        type="range"
        min="0"
        max="100"
        bind-value={count}
      />
      <h1>{count()}</h1>
      <p if={count() % 15 === 0} class="result fizzbuzz">FizzBuzz</p>
      <p else-if={count() % 3 === 0} class="result fizz">Fizz</p>
      <p else-if={count() % 5 === 0} class="result buzz">Buzz</p>
      <p else class="result">{count()}</p>
    </div>
  );
}

export default FizzBuzz;
`,
    css: `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--primary);
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.result {
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: var(--muted);
}

.fizz { color: #22c55e; }
.buzz { color: #3b82f6; }
.fizzbuzz { color: #f59e0b; }
`
  },
  {
    name: 'List Rendering',
    code: `import { reactive } from 'hydroxide';
import { List } from 'hydroxide-dom';

function NameList() {
  const names = reactive(['Cooper', 'Charlie', 'Gus', 'Oliver']);

  return (
    <ul class="list">
      <List
        each={names()}
        as={name => <li class="item">{name()}</li>}
      />
    </ul>
  );
}

export default NameList;
`,
    css: `${baseCss}
.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  padding: 0.75rem 1rem;
  background: var(--card);
  border-radius: 0.5rem;
  border: 1px solid var(--muted);
}
`
  },
  {
    name: 'Input Binding',
    code: `import { reactive } from 'hydroxide';

function TextInput() {
  const text = reactive('Hello, Hydroxide!');

  return (
    <div class="container">
      <input
        type="text"
        bind-value={text}
        class="input"
      />
      <p class="preview">{text()}</p>
    </div>
  );
}

export default TextInput;
`,
    css: `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--muted);
  border-radius: 0.5rem;
  background: var(--card);
  color: var(--foreground);
  outline: none;
}

.input:focus {
  border-color: var(--primary);
}

.preview {
  padding: 0.75rem 1rem;
  background: var(--muted);
  border-radius: 0.5rem;
  word-break: break-word;
}
`
  },
  {
    name: 'SVG',
    code: `function SmileyFace() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#fbbf24" />
      <circle cx="45" cy="50" r="6" fill="#1f2937" />
      <circle cx="75" cy="50" r="6" fill="#1f2937" />
      <path
        d="M 35 70 Q 60 90 85 70"
        stroke="#1f2937"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default SmileyFace;
`,
    css: `${baseCss}
svg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}
`
  },
  {
    name: 'DOM Reference',
    code: `import { onConnect } from 'hydroxide';

function Canvas() {
  const canvasRef = {};

  onConnect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw a gradient
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#06b6d4');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);

    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Canvas!', 100, 105);
  });

  return (
    <canvas
      ref={canvasRef}
      width="200"
      height="200"
      class="canvas"
    />
  );
}

export default Canvas;
`,
    css: `${baseCss}
.canvas {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
`
  }
]

export function CompilerPlayground() {
  const [selectedExample, setSelectedExample] = useState(0)
  const example = examples[selectedExample]

  return (
    <div className="flex flex-col grow overflow-hidden">
      {/* Top bar with dropdown */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#151515] border-b border-fd-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="size-4" />
              {example.name}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-[180px]">
            {examples.map((ex, index) => (
              <DropdownMenuItem
                key={ex.name}
                onClick={() => setSelectedExample(index)}
                className={
                  selectedExample === index
                    ? 'bg-fd-accent text-fd-accent-foreground'
                    : ''
                }
              >
                {ex.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Demo */}
      <HydroxideDemo
        key={selectedExample}
        code={example.code}
        css={example.css}
        defaultTab="preview"
        className="grow border-0 rounded-none"
      />
    </div>
  )
}
