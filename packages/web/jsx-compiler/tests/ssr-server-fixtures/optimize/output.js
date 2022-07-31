import { ssr as _ssr } from 'hydroxide-dom'
const _tmpl = ['<div>AAA BBB</div>'],
  _tmpl2 = ['<div>CCC DDD</div>'],
  _tmpl3 = ['<div>EEE FFF GGG</div>'],
  _tmpl4 = ['<div>', '</div>'],
  _tmpl5 = ['<div>HHH ', ' III</div>'],
  _tmpl6 = ['<div></div>'],
  _tmpl7 = ['<div>', '</div>'],
  _tmpl8 = ['<div>JJJ KKK LLL MMM 100 true NNN ', ' OOO</div>'],
  _tmpl9 = ['<div>PPP</div>'],
  _tmpl10 = ['<div>QQQ</div>'],
  _tmpl11 = ['<div>', ' ', ' ', ' ', '</div>'],
  _tmpl12 = ['<div>AAA true ', ' BBB 100 ', ' ', ' ', '</div>']

const test1 = _ssr(_tmpl, []) // extra whitespaces should be removed

const test2 = _ssr(_tmpl2, []) // extra whitespace should not be removed from expression container

const test3 = _ssr(_tmpl3, []) // extra whitespace should not be removed from expression container

const test4 = _ssr(_tmpl4, [count()]) // single expression

const test5 = _ssr(_tmpl5, [heading]) // few texts before expression

const test6 = _ssr(_tmpl6, []) // comments should be removed

const test7 = _ssr(_tmpl7, [foo()]) // comments should be removed

const test8 = _ssr(_tmpl8, [hello]) // stringifiable expressions before actual expression

const test9 = _ssr(_tmpl9, []) // expression container touches the text

const test10 = _ssr(_tmpl10, []) // expression container whitespace away from the text (this middle whitespace should be respected)

const test11 = _ssr(_tmpl11, [x, y, z, p]) // multiple expressions

const test12 = _ssr(_tmpl12, [x, y, z, p]) // multiple expressions and multiple texts
