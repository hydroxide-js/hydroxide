const sanitizer = document.createElement('div')

export function sanitize(text: string): string {
  sanitizer.textContent = text
  return sanitizer.innerHTML
}
