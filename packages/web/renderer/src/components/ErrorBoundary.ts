import { JSX } from 'hydroxide-jsx'

type errorProps = {
  fallback: JSX.Element
  children: JSX.Element
}

export function ErrorBoundary(props: errorProps) {
  try {
    return props.children
  } catch (error) {
    return props.fallback || 'Error'
  }
}
