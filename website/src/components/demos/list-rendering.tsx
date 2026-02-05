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
