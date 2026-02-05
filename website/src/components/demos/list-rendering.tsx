'use client'

import { sandpackBasicCSS } from '../sandpack-demo-common-css'
import { HydroxideDemo } from '../sandpack-demo'

const jsx = `\
import { reactive } from 'hydroxide';
import { List } from 'hydroxide-dom';

function NameList() {
  const names = reactive(['Cooper', 'Charlie', 'Gus', 'Oliver']);

  return (
    <ul>
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
  css: sandpackBasicCSS
}

export function ListDemo() {
  return (
    <HydroxideDemo
      code={listRenderingDemo.jsx}
      css={listRenderingDemo.css}
      height={600}
    />
  )
}
