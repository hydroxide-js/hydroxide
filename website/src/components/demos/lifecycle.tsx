import { sandpackBasicCSS, sandpackPrimaryButtonCSS } from '../sandpack-demo-common-css'

const jsx = `\
import { reactive, onConnect, onDisconnect } from 'hydroxide';

function Timer() {
  const seconds = reactive(0);
  let interval;

  onConnect(() => {
    console.log('Timer connected');
    interval = setInterval(() => seconds.do(s => s + 1), 1000);
  });

  onDisconnect(() => {
    console.log('Timer disconnected');
    clearInterval(interval);
  });

  return <p class="timer">{seconds()}s</p>;
}

function App() {
  const show = reactive(true);

  return (
    <div class="container">
      <button class="primary-button" on-click={() => show.do(v => !v)}>
        {show() ? 'Stop' : 'Start'} Timer
      </button>
      <Timer if={show()} />
    </div>
  );
}

export default App;
`

const css = `\
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.timer {
  font-size: 3rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--foreground);
}

${sandpackPrimaryButtonCSS}
${sandpackBasicCSS}
`

export const lifecycleDemo = {
  jsx,
  css
}
