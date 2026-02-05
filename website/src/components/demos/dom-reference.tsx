'use client'

import { HydroxideDemo } from '@/components/sandpack-demo'
import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
import { onConnect } from 'hydroxide';

function Canvas() {
  const canvasRef = {};

  onConnect(() => {
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = '#a855f7';
    ctx.fillRect(20, 20, 60, 60);

    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(130, 50, 30, 0, Math.PI * 2);
    ctx.fill();
  });

  return <canvas ref={canvasRef} width="180" height="100" />;
}

export default Canvas;
`

export const domReferenceDemo = {
  jsx,
  css: sandpackDemoCommonCss
}

export function DomReferenceDemo() {
  return <HydroxideDemo code={jsx} css={sandpackDemoCommonCss} />
}
