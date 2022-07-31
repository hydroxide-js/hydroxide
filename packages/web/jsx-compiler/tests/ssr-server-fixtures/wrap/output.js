import { branch as _branch } from 'hydroxide-dom'
import { ssr as _ssr } from 'hydroxide-dom'
import { component as _component } from 'hydroxide-dom'
const _tmpl = ["<div><p title='Wikipedia'>Wikipedia.com</p>", '</div>'],
  _tmpl2 = ['<div><p title="', '">', '</p>', '</div>'],
  _tmpl3 = ['<div><p title="', '">', '</p>', '</div>'],
  _tmpl4 = ['<div><p title="', '">', '</p>', '</div>'],
  _tmpl5 = ['', ''],
  _tmpl6 = ['<div>bar</div>'],
  _tmpl7 = ['', ''],
  _tmpl8 = ['<div>', '</div>'],
  _tmpl9 = ['<div>', '</div>'],
  _tmpl10 = ['<div>', '</div>'],
  _tmpl11 = ['<div>bar</div>'],
  _tmpl12 = ['<div>', '</div>'],
  _tmpl13 = ['<div><p title="', '">', '</p>', '</div>']

// don't wrap literals
const literalTest = _ssr(_tmpl, [
  _component(Info, {
    foo: 100,

    get children() {
      return [() => ' ', () => 300, () => ' ']
    }
  })
]) // wrap member expressions

const exprTest = _ssr(_tmpl2, [
  props.title,
  props.site,
  _component(Info, {
    get foo() {
      return props.foo
    },

    get children() {
      return [() => ' ', () => bar.bazz, () => ' ']
    }
  })
]) // don't wrap indentifiers

const idTest = _ssr(_tmpl3, [
  title,
  site,
  _component(
    Info,
    {
      onRemove: handleRemove,

      get children() {
        return [() => ' ', () => mapping, () => ' ']
      }
    },
    {
      ref: () => bar
    }
  )
]) // wrap call expressions

const callTest = _ssr(_tmpl4, [
  title(),
  site,
  _component(
    Info,
    {
      get onRemove() {
        return foo()
      },

      get children() {
        return [() => ' ', () => createMapping(), () => ' ']
      }
    },
    {
      ref: () => bar()
    }
  )
]) // don't wrap component() and branch() calls

const compAndBranch = _ssr(_tmpl8, [
  _component(Foo, {
    get bar() {
      return _ssr(_tmpl5, [_component(Bar)])
    },

    get branch() {
      return _ssr(_tmpl7, [_branch([() => bar, () => _ssr(_tmpl6, [])])])
    }
  })
]) // don't wrap pure iife

const pureIIFE = _ssr(_tmpl10, [
  _component(Foo, {
    get bar() {
      return _ssr(_tmpl9, [bar()])
    }
  })
]) // don't wrap cloneNode

const cloneNode = _ssr(_tmpl12, [
  _component(Foo, {
    get bar() {
      return _ssr(_tmpl11, [])
    }
  })
]) // don't wrap unreactive expressions

const unreactive = _ssr(_tmpl13, [
  foo + bar,
  x === y,
  _component(Info, {
    foo: 10 + 200,
    children: x + y
  })
])
