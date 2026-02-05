import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

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
${sandpackDemoCommonCss}

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
`

export const inputBindingDemo = {
  jsx,
  css: css
}
