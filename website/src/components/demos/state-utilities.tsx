'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'
import { compileFunction } from 'node:vm'

const nestedCounter = `\
import { reactive } from 'hydroxide';

function Example() {
  const state = reactive({
    foo: {
      bar: {
        bazz: 0
      }
    }
  });

  function increment() {
    state('foo', 'bar', 'bazz').do(v => v + 1);
  }

  return (
    <button on-click={increment} class="primary-button">
      count is {state().foo.bar.bazz}
    </button>
  );
}

export default Example;`

export function DeepNestedDemo() {
  return <HydroxideDemo code={nestedCounter} css={sandpackDemoCommonCss} />
}

const arrayMethodsCode = `\
import { reactive } from "hydroxide";
import { List } from "hydroxide-dom";

function TodoApp() {
  const input = reactive("");
  const todos = reactive([
    { task: "Learn Hydroxide", done: false },
    { task: "Build something", done: true },
    { task: "Ship it", done: false },
  ]);

  const toggleDone = (index) => todos(index, "done").do((done) => !done);
  const removeTodo = (index) => todos.remove(index);
  const addNewTask = () => {
    if (input() === "") return;
    todos.push({ task: input(), done: false });
    input.set("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTask();
  };

  return (
    <div class="app">
      <div class="input-container">
        <input
          type="text"
          bind-value={input}
          on-keydown={handleKeyDown}
          placeholder="Create Task"
        />
        <button class="primary-button" on-click={addNewTask}>
          Add
        </button>
      </div>
      <ul>
        <List.Indexed
          each={todos()}
          as={(todo, index) => (
            <li class={todo().done ? "done" : ""}>
              <span class="task">{todo().task}</span>
              <button class="toggle" on-click={() => toggleDone(index())}>
                {todo().done ? "✓" : "○"}
              </button>
              <button class="remove" on-click={() => removeTodo(index())}>
                X
              </button>
            </li>
          )}
        />
      </ul>
    </div>
  );
}

export default TodoApp;
`

const arrayMethodsCss = `\
${sandpackDemoCommonCss}

.app {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 350px;
  width: 100vw;
}

.input-container {
  display: flex;
  gap: 8PX;
}

.primary-button,
input,
li {
  border-radius: 12px;
  font-size: 14px;
}

input {
  padding-block: 14px;
  padding-inline: 16px;
  height: auto;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

li {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  transition: background-color 150ms ease-out;
}

@media (hover: hover) {
  li:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

li.done .task {
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
  text-decoration-color: #3f3f46;
  color: #3f3f46;
}

.task {
  flex: 1;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.toggle,
.remove {
  background: transparent;
  border: none;
  color: #52525b;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: color 150ms ease-out, background-color 150ms ease-out, transform 100ms ease-out;
}

@media (hover: hover) {
  .toggle:hover {
    color: #fafafa;
    background: rgba(255, 255, 255, 0.08);
  }

  .remove:hover {
    color: #fafafa;
    background: rgba(255, 255, 255, 0.08);
  }
}

.toggle:active,
.remove:active {
  transform: scale(0.9);
}

li.done .toggle {
  color: #71717a;
}
`

export function TodoAppDemo() {
  return <HydroxideDemo code={arrayMethodsCode} css={arrayMethodsCss} stacked />
}
