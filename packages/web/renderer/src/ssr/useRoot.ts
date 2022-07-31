import { coreInfo } from 'hydroxide'
import { SSRTemplate } from 'src/types'

/**
 * @internal
 * Not to be used by library users, only by compiler
 * and only in SSR mode
 */
export function useRoot(tmpl: SSRTemplate) {
  const rootEl = coreInfo.context && coreInfo.context.ssrEl
  if (rootEl) {
    // use the element from DOM and hydrate it
    return rootEl
  } else {
    // create a new element and hydrate it
    if (!tmpl.templateEl) {
      const template = document.createElement('template')
      template.innerHTML = tmpl.isSVG ? `<svg>${tmpl.html}</svg>` : tmpl.html
      tmpl.templateEl = tmpl.isSVG
        ? (template.content.firstChild!.firstChild as HTMLElement)
        : (template.content.firstChild as HTMLElement)
    }

    return tmpl.templateEl.cloneNode(true) as HTMLElement
  }
}
