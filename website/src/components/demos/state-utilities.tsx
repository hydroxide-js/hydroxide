'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'

const deepNestedCode = `import { reactive } from 'hydroxide';

const state = reactive({
  foo: {
    bar: {
      bazz: 0
    }
  }
});

function DeepCounter() {
  return (
    <button on-click={() => state('foo', 'bar', 'bazz').do(v => v + 1)}>
      count is {state().foo.bar.bazz}
    </button>
  );
}

export default DeepCounter;`

const deepNestedCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151515;
  font-family: system-ui, sans-serif;
}
button {
  background: #3a3a3a;
  color: #fafafa;
  border: 1px solid #4a4a4a;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
button:hover {
  background: #4a4a4a;
}`

export function DeepNestedDemo() {
  return <HydroxideDemo code={deepNestedCode} css={deepNestedCss} />
}

const arrayMethodsCode = `import { reactive } from 'hydroxide';
import { List } from 'hydroxide-dom';

function TodoApp() {
  const input = reactive('');
  const todos = reactive([
    { task: 'Learn Hydroxide', done: false },
    { task: 'Build something', done: true },
    { task: 'Ship it', done: false }
  ]);

  const toggleDone = (index) => todos(index, 'done').do(done => !done);
  const removeTodo = (index) => todos.remove(index);
  const addNewTask = () => {
    if (input() === '') return;
    todos.push({ task: input(), done: false });
    input.set('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addNewTask();
  };

  return (
    <div class="app">
      <div class="input-row">
        <input
          type="text"
          bind-value={input}
          on-keydown={handleKeyDown}
          placeholder="Add new task..."
        />
        <button class="add" on-click={addNewTask}>+</button>
      </div>
      <ul>
        <List.Indexed each={todos()} as={(todo, index) => (
          <li class={todo().done ? 'done' : ''}>
            <span class="task">{todo().task}</span>
            <button class="toggle" on-click={() => toggleDone(index())}>
              {todo().done ? '✓' : '○'}
            </button>
            <button class="remove" on-click={() => removeTodo(index())}>
              ×
            </button>
          </li>
        )} />
      </ul>
    </div>
  );
}

export default TodoApp;`

const arrayMethodsCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
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
  gap: 1rem;
  padding: 1.5rem;
  background: #2a2a2a;
  border-radius: 0.5rem;
  border: 1px solid #3a3a3a;
  min-width: 300px;
}
.input-row {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
  background: #1a1a1a;
  border: 1px solid #3a3a3a;
  border-radius: 0.375rem;
  padding: 0.625rem 0.75rem;
  color: #fafafa;
  font-size: 0.875rem;
}
input::placeholder { color: #666; }
input:focus { outline: none; border-color: #10b981; }
.add {
  background: #10b981;
  border: none;
  color: #fff;
  width: 2.5rem;
  border-radius: 0.375rem;
  font-size: 1.25rem;
  cursor: pointer;
}
.add:hover { background: #059669; }
ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #3a3a3a;
  border-radius: 0.375rem;
}
li.done .task { text-decoration: line-through; color: #888; }
.task { flex: 1; }
.toggle, .remove {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}
.toggle:hover { color: #10b981; }
.remove:hover { color: #f87171; }
li.done .toggle { color: #10b981; }`

export function TodoAppDemo() {
  return <HydroxideDemo code={arrayMethodsCode} css={arrayMethodsCss} stacked />
}
