'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'

const baseCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151515;
  font-family: system-ui, sans-serif;
  color: #fafafa;
}`

const propsCode = `function App() {
  return (
    <div class="container">
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

function Welcome(props) {
  return <p>Hello, {props.name}!</p>;
}

export default App;`

const propsCss = `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}`

export function PropsDemo() {
  return <HydroxideDemo code={propsCode} css={propsCss} />
}

const childrenCode = `function Card(props) {
  return (
    <div class="card">
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>My Card</h2>
      <p>This content is passed as children</p>
    </Card>
  );
}

export default App;`

const childrenCss = `${baseCss}
.card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
}
.card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}
.card p {
  margin: 0;
  color: #888;
}`

export function ChildrenDemo() {
  return <HydroxideDemo code={childrenCode} css={childrenCss} />
}

const reactivePropsCode = `import { reactive } from 'hydroxide';

function Display(props) {
  return <p class="count">Count: {props.count}</p>;
}

function App() {
  const count = reactive(0);

  return (
    <div class="container">
      <Display count={count()} />
      <button class="primary-button" on-click={() => count.do(v => v + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`

const reactivePropsCss = `${baseCss}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.count {
  font-size: 1.5rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.primary-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #fafafa;
  color: #151515;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.primary-button:hover {
  opacity: 0.9;
}`

export function DynamicPropsDemo() {
  return <HydroxideDemo code={reactivePropsCode} css={reactivePropsCss} />
}

const reactiveObjectPropsCode = `import { reactive } from 'hydroxide';

function Display(props) {
  return <p class="count">Count: {props.count()}</p>;
}

function App() {
  const count = reactive(0);

  return (
    <div class="container">
      <Display count={count} />
      <button class="primary-button" on-click={() => count.do(v => v + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`

export function ReactiveObjectPropsDemo() {
  return <HydroxideDemo code={reactiveObjectPropsCode} css={reactivePropsCss} />
}
