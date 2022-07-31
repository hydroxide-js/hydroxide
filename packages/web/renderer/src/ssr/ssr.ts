/**
 * To be used on server
 */
export function ssr(htmlStrings: string[], exprs: any[]) {
  let html = htmlStrings[0]
  for (let i = 0; i < exprs.length; i++) {
    html += exprs[i] + htmlStrings[i + 1]
  }

  return html
}
