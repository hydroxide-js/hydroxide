import { effect as _effect } from 'hydroxide'
import { setAttribute as _setAttribute } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template(
  "<div><img src='hello.jpg' alt='hi'><img><img><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button></div>"
)

/*#__PURE__*/
;(() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild.nextSibling,
    _node2 = _node.nextSibling,
    _node3 = _node2.nextSibling,
    _node4 = _node3.nextSibling.nextSibling.nextSibling

  _setAttribute(_node, 'src', src)

  _effect(() => _setAttribute(_node, 'alt', img().alt), 1)

  let _old, _old2

  _effect(() => {
    const _new = img().src,
      _new2 = img().alt
    _new !== _old && _setAttribute(_node2, 'src', (_old = _new))
    _new2 !== _old2 && _setAttribute(_node2, 'alt', (_old2 = _new2))
  }, 1)

  _node3.textContent = 'hello'
  _node3.foo = foo

  _setAttribute(_node4, '$:value', value)

  _effect(() => _setAttribute(_node4, 'foo:bazz', fooBazz()), 1)

  return _root
})()
