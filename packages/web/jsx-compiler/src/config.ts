import { CompilationType } from './types'

export const config = {
  domImportSource: 'hydroxide-dom',
  coreImportSource: 'hydroxide',
  type: 'csr' as CompilationType
}

export const marker = '<!>'

export const reservedPropsSet = new Set(['ref'])
