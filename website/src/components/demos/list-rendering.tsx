'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from 'hydroxide';
import { List } from 'hydroxide-dom';

function NameList() {
  const names = reactive(['Cooper', 'Charlie', 'Gus', 'Oliver']);

  return (
    <ul >
      <List
        each={names()}
        as={name => <li >{name()}</li>}
      />
    </ul>
  );
}

export default NameList;
`

export const listRenderingDemo = {
  jsx,
  css: sandpackDemoCommonCss
}

export function ListDemo() {
  return <HydroxideDemo code={listRenderingDemo.jsx} css={listRenderingDemo.css} />
}

const listIndexedCode = `import { reactive } from 'hydroxide';
import { List } from 'hydroxide-dom';

const items = reactive(['Apple', 'Banana', 'Cherry']);

function EditableList() {
  return (
    <div class="container">
      <ul>
        <List.Indexed each={items()} as={(item, index) => (
          <li>
            <span class="index">{index()}</span>
            <span class="text">{item()}</span>
            <button class="remove" on-click={() => items.remove(index())}>
              ×
            </button>
          </li>
        )} />
      </ul>
      <button on-click={() => items.push('New Item')}>Add Item</button>
    </div>
  );
}

export default EditableList;`

const listIndexedCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151515;
  font-family: system-ui, sans-serif;
  color: #fafafa;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: #2a2a2a;
  border-radius: 0.5rem;
  border: 1px solid #3a3a3a;
  min-width: 240px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #3a3a3a;
  border-radius: 0.375rem;
}
.index {
  font-size: 0.75rem;
  color: #888;
  font-variant-numeric: tabular-nums;
}
.text {
  flex: 1;
}
.remove {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}
.remove:hover {
  color: #f87171;
}
button {
  background: #3a3a3a;
  color: #fafafa;
  border: 1px solid #4a4a4a;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
button:hover {
  background: #4a4a4a;
}`

export function ListIndexedDemo() {
  return <HydroxideDemo code={listIndexedCode} css={listIndexedCss} />
}
