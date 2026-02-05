'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from "hydroxide";

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
`

const css = `
${sandpackDemoCommonCss}


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--foreground);
}

h1 {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.result {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: var(--card);
  color: var(--muted-foreground);
}

.fizz {
  color: oklch(0.75 0.2 145.01);
  background: oklch(0.75 0.2 145.01 / 0.1);
}

.buzz {
  color: oklch(0.75 0.2 55.0)
  background: oklch(0.75 0.2 55.0 / 0.1);
}

.fizzbuzz {
  color: oklch(0.75 0.2 275.0);
  background: oklch(0.75 0.2 275.0 / 0.1);
}
`

export const fizzBuzzDemo = {
  jsx,
  css
}

export function FizzBuzzDemo() {
  return <HydroxideDemo code={jsx} css={css} />
}
