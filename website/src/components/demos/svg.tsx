import { sandpackDemoCommonCss } from '../sandpack-demo-common-css'

const jsx = `\
function SmileyFace() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#fbbf24" />
      <circle cx="45" cy="50" r="6" fill="#1f2937" />
      <circle cx="75" cy="50" r="6" fill="#1f2937" />
      <path
        d="M 35 70 Q 60 90 85 70"
        stroke="#1f2937"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default SmileyFace;
`

const css = `\
${sandpackDemoCommonCss}

svg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}
`

export const svgDemo = {
  jsx,
  css
}
