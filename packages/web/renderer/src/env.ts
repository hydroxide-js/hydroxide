export const isDEV = process.env.NODE_ENV !== 'production'
// @ts-expect-error
export const isLibDev = import.meta.env.VITE_NODE_ENV === 'lib-dev'

export const devInfo = {
  prevComponent: null as Function | null,
  currentComponent: null as Function | null
}
