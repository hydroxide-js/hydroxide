import { insert as _insert } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template(
  '<div><p>aaa <!> bbb <!></p>ccc ddd<button>eee <!> <!> <!></button></div>'
)

/*#__PURE__*/
;(() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild,
    _node2 = _node.firstChild.nextSibling,
    _node3 = _node2.nextSibling.nextSibling,
    _node4 = _node.nextSibling.nextSibling.firstChild.nextSibling,
    _node5 = _node4.nextSibling.nextSibling,
    _node6 = _node5.nextSibling.nextSibling

  _insert(_node2, x)

  _insert(_node3, x)

  _insert(_node4, x)

  _insert(_node5, y)

  _insert(_node6, z)

  return _root
})()
