'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackBasicCSS, sandpackInputCSS } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive } from 'hydroxide';

function TextInput() {
  const text = reactive('Hello, Hydroxide!');

  return (
    <div class="container">
     <input
       type="text"
       bind-value={text}
       placeholder="Enter your text here"
     />
     <p class='preview'>{text() || "Nothing"}</p>
    </div>
  );
}

export default TextInput;
`

const css = `\
.container {
  display: flex;
  width: 100vw;
  max-width: 360px;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.preview {
 color: var(--muted-foreground);
 font-size: 14px;
 text-align: center;
}

${sandpackInputCSS}
${sandpackBasicCSS}
`

export const inputBindingDemo = {
  jsx,
  css: css
}

export function InputBindingDemo() {
  return <HydroxideDemo code={jsx} css={css} height={500} />
}
