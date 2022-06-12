import { programInfo } from './programInfo'

export const config = {
  domImportSource: 'hydroxide-dom',
  coreImportSource: 'hydroxide'
}

export const marker = '<!>'

export const requiredImport = {
  effect() {
    programInfo.coreImports.add('effect')
  },
  attr() {
    programInfo.domImports.add('attr')
  },
  component() {
    programInfo.domImports.add('component')
  },
  insert() {
    programInfo.domImports.add('insert')
  },
  branch() {
    programInfo.domImports.add('branch')
  },
  template() {
    programInfo.domImports.add('template')
  },
  svg() {
    programInfo.domImports.add('svg')
  },
  delegateEvents() {
    programInfo.domImports.add('delegateEvents')
  }
}
