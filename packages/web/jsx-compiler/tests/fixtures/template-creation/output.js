import { template as _template } from 'hydroxide-dom'

const _tmpl = /*#__PURE__*/ _template('<h1>hello</h1>'),
  _tmpl2 = /*#__PURE__*/ _template('<h1>hello</h1>'),
  _tmpl3 = /*#__PURE__*/ _template('<h1>hello</h1>'),
  _tmpl4 = /*#__PURE__*/ _template('<h1>hello</h1>')

const level0 = /*#__PURE__*/ _tmpl.cloneNode(true)

function foo() {
  const level1 = /*#__PURE__*/ _tmpl2.cloneNode(true)

  function bar() {
    const level2 = /*#__PURE__*/ _tmpl3.cloneNode(true)

    function baz() {
      const level3 = /*#__PURE__*/ _tmpl4.cloneNode(true)
    }
  }
}
