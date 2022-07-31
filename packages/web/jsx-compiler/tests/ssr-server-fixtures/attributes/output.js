import { ssr as _ssr } from 'hydroxide-dom'
const _tmpl = [
  "<div><img src='hello.jpg' alt='hi'><img src=\"",
  '" alt="',
  '"><img src="',
  '" alt="',
  "\"><img><img><img><div a='true' d='10' e='e'></div><button foo bar bazz></button><button $:value=\"",
  '" foo:bar=\'bazz\' foo:bazz="',
  '"></button><input><input></div>'
]
_ssr(_tmpl, [src, img().alt, img().src, img().alt, value, fooBazz()])
