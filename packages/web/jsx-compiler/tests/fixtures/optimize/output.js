import { insert as _insert } from 'hydroxide-dom'
import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template('<div>AAA BBB</div>'),
  _tmpl2 = /*#__PURE__*/ _template('<div>CCC DDD</div>'),
  _tmpl3 = /*#__PURE__*/ _template('<div>EEE FFF GGG</div>'),
  _tmpl4 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl5 = /*#__PURE__*/ _template('<div>HHH <!> III</div>'),
  _tmpl6 = /*#__PURE__*/ _template('<div></div>'),
  _tmpl7 = /*#__PURE__*/ _template('<div><!></div>'),
  _tmpl8 = /*#__PURE__*/ _template('<div>JJJ KKK LLL MMM 100 true NNN <!> OOO</div>'),
  _tmpl9 = /*#__PURE__*/ _template('<div>PPP</div>'),
  _tmpl10 = /*#__PURE__*/ _template('<div>QQQ</div>'),
  _tmpl11 = /*#__PURE__*/ _template('<div><!> <!> <!> <!></div>'),
  _tmpl12 = /*#__PURE__*/ _template('<div>AAA true <!> BBB 100 <!> <!> <!></div>')

const test1 = /*#__PURE__*/ _tmpl.cloneNode(true) // extra whitespaces should be removed

const test2 = /*#__PURE__*/ _tmpl2.cloneNode(true) // extra whitespace should not be removed from expression container

const test3 = /*#__PURE__*/ _tmpl3.cloneNode(true) // extra whitespace should not be removed from expression container

const test4 = /*#__PURE__*/ (() => {
  const _root = _tmpl4.cloneNode(true),
    _node = _root.firstChild

  _insert(_node, count)

  return _root
})() // single expression

const test5 = /*#__PURE__*/ (() => {
  const _root2 = _tmpl5.cloneNode(true),
    _node2 = _root2.firstChild.nextSibling

  _insert(_node2, heading)

  return _root2
})() // few texts before expression

const test6 = /*#__PURE__*/ _tmpl6.cloneNode(true) // comments should be removed

const test7 = /*#__PURE__*/ (() => {
  const _root3 = _tmpl7.cloneNode(true),
    _node3 = _root3.firstChild

  _insert(_node3, foo)

  return _root3
})() // comments should be removed

const test8 = /*#__PURE__*/ (() => {
  const _root4 = _tmpl8.cloneNode(true),
    _node4 = _root4.firstChild.nextSibling

  _insert(_node4, hello)

  return _root4
})() // stringifiable expressions before actual expression

const test9 = /*#__PURE__*/ _tmpl9.cloneNode(true) // expression container touches the text

const test10 = /*#__PURE__*/ _tmpl10.cloneNode(true) // expression container whitespace away from the text (this middle whitespace should be respected)

const test11 = /*#__PURE__*/ (() => {
  const _root5 = _tmpl11.cloneNode(true),
    _node5 = _root5.firstChild,
    _node6 = _node5.nextSibling.nextSibling,
    _node7 = _node6.nextSibling.nextSibling,
    _node8 = _node7.nextSibling.nextSibling

  _insert(_node5, x)

  _insert(_node6, y)

  _insert(_node7, z)

  _insert(_node8, p)

  return _root5
})() // multiple expressions

const test12 = /*#__PURE__*/ (() => {
  const _root6 = _tmpl12.cloneNode(true),
    _node9 = _root6.firstChild.nextSibling,
    _node10 = _node9.nextSibling.nextSibling,
    _node11 = _node10.nextSibling.nextSibling,
    _node12 = _node11.nextSibling.nextSibling

  _insert(_node9, x)

  _insert(_node10, y)

  _insert(_node11, z)

  _insert(_node12, p)

  return _root6
})() // multiple expressions and multiple texts
