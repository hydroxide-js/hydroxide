import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template(
  '<div><div></div>, <img>, <img>, <hr>, <foo-bar></foo-bar>, <foo:bar></foo:bar></div>'
)

_T()
