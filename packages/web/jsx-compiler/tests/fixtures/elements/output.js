import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template(
  '<div><p></p><img><img><hr><foo-bar></foo-bar><foo:bar></foo:bar></div>'
)

/*#__PURE__*/
_tmpl.cloneNode(true)
