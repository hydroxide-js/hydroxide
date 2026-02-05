'use client'

import { getSandpackCssText } from '@codesandbox/sandpack-react'
import { useServerInsertedHTML } from 'next/navigation'

/**
 * Ensures Sandpack CSS-in-JS styles are loaded server-side.
 * This prevents flash of unstyled content and improves initial render.
 */
export function SandpackCSS() {
  useServerInsertedHTML(() => {
    return (
      <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" />
    )
  })

  return null
}
