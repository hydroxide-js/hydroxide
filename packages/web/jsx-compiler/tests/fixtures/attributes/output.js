import { delegateEvents as _delegateEvents } from 'hydroxide-dom'
import { bind as _bind } from 'hydroxide-dom'
import { effect as _effect } from 'hydroxide'
import { setAttribute as _setAttribute } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template(
  "<div><img src='hello.jpg' alt='hi'><img><img><img><img><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button foo:bar='bazz'></button><input><input></div>"
)

/*#__PURE__*/
;(() => {
  const _root = _tmpl.cloneNode(true),
    _node = _root.firstChild.nextSibling,
    _node2 = _node.nextSibling,
    _node3 = _node2.nextSibling,
    _node4 = _node3.nextSibling,
    _node5 = _node4.nextSibling,
    _node6 = _node5.nextSibling.nextSibling.nextSibling,
    _node7 = _node6.nextSibling,
    _node8 = _node7.nextSibling

  _setAttribute(_node, 'src', src)

  _effect(() => _setAttribute(_node, 'alt', img().alt), 3)

  let _old, _old2

  _effect(() => {
    const _new = img().src,
      _new2 = img().alt
    _new !== _old && _setAttribute(_node2, 'src', (_old = _new))
    _new2 !== _old2 && _setAttribute(_node2, 'alt', (_old2 = _new2))
  }, 3)

  _node3.textContent = 'hello'
  _node3.foo = foo
  _node4.textContent = 'hello'

  _effect(() => (_node4.foo = foo()), 3)

  let _old3, _old4

  _effect(() => {
    const _new3 = text(),
      _new4 = foo()

    _new3 !== _old3 && (_node5['textContent'] = _old3 = _new3)
    _new4 !== _old4 && (_node5['foo'] = _old4 = _new4)
  }, 3)

  _setAttribute(_node6, '$:value', value)

  _effect(() => _setAttribute(_node6, 'foo:bazz', fooBazz()), 3)

  _bind(_node7, 'value', count)

  _bind(_node8, 'value', foo('bar', 'bazz'))

  return _root
})()

_delegateEvents(['input'])
