import { delegateEvents, template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ template(
  '<div><button>increment</button><input></div>'
)

/*#__PURE__*/
;(() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild,
    _node2 = _node.nextSibling

  _node.$$click = increment
  _node2.$$input = updateInput
  return _root
})()

delegateEvents(['click', 'input'])
