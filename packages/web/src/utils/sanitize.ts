const sanitizer = document.createElement('div')

// Note: This won't work when doing SSR
export function sanitize(text: string): string {
  sanitizer.textContent = text
  return sanitizer.innerHTML
}
