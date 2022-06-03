import { $template, $insert, $attr, $comp, $branch } from 'hydroxide-dom'

const _T = $template(
  '<div><div></div>, <img>, <img>, <hr>, <foo-bar></foo-bar>, <foo:bar></foo:bar></div>'
)

_T()
