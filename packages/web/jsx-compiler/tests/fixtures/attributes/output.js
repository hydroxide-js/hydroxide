import { attr, template } from 'hydroxide-dom'
import { effect } from 'hydroxide'

const _tmpl = /*#__PURE__*/ template(
  "<div><img src='hello.jpg' alt='hi'><img><img><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button></div>"
)

/*#__PURE__*/
;(() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild.nextSibling,
    _node2 = _node.nextSibling,
    _node3 = _node2.nextSibling,
    _node4 = _node3.nextSibling.nextSibling.nextSibling

  attr(_node, 'src', src)
  effect(() => attr(_node, 'alt', img().alt), 1)

  let _old, _old2

  effect(() => {
    const _new = img().src,
      _new2 = img().alt
    _new !== _old && $attr(_node2, src, (_old = _new))
    _new2 !== _old2 && $attr(_node2, alt, (_old2 = _new2))
  }, 1)
  _node3.textContent = 'hello'
  _node3.foo = foo
  attr(_node4, '$:value', value)
  effect(() => attr(_node4, 'foo:bazz', fooBazz()), 1)
  return _root
})()
