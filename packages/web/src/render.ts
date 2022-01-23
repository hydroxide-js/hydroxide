import { runComponent } from './runComponent'

export function render(jsxElement: JSX.Element, target: HTMLElement) {
  const app = () => jsxElement
  const node = runComponent(app, null, target)
  target.append(node)
}
