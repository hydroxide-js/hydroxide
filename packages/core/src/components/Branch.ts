export type BranchProps = {
  children: JSX.Element[]
}

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Branch(props: BranchProps): JSX.Element {
  return ''
}
