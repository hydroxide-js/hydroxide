import { $template, $insert, $attr, $comp, $branch } from 'hydroxide-dom'

const _T = $template('<div>AAA BBB</div>'),
  _T2 = $template('<div>    CCC         DDD    </div>'),
  _T3 = $template('<div>    EEE     FFF     GGG    </div>'),
  _T4 = $template('<div><!></div>'),
  _T5 = $template('<div>HHH <!> III</div>'),
  _T6 = $template('<div></div>'),
  _T7 = $template('<div><!></div>'),
  _T8 = $template('<div>JJJ KKK LLL MMM 100 true NNN <!> OOO</div>'),
  _T9 = $template('<div>     PPP    </div>'),
  _T10 = $template('<div>     QQQ     </div>'),
  _T11 = $template('<div><!> <!> <!> <!></div>'),
  _T12 = $template('<div>AAA true <!> BBB 100 <!> <!> <!></div>')

const test1 = _T() // extra whitespaces should be removed

const test2 = _T2() // extra whitespace should not be removed from expression container

const test3 = _T3() // extra whitespace should not be removed from expression container

const test4 = _T4(() => {
  $insert([0], count)
}) // single expression

const test5 = _T5(() => {
  $insert([1], () => heading)
}) // few texts before expression

const test6 = _T6() // comments should be removed

const test7 = _T7(() => {
  $insert([0], foo)
}) // comments should be removed

const test8 = _T8(() => {
  $insert([1], () => hello)
}) // strigifiable expressions before actual expression

const test9 = _T9() // expression container touches the text

const test10 = _T10() // expression container whitespace away from the text (this middle whitespace should be respected)

const test11 = _T11(() => {
  $insert([0], () => x)
  $insert([2], () => y)
  $insert([4], () => z)
  $insert([6], () => p)
}) // multiple expressions

const test12 = _T12(() => {
  $insert([1], () => x)
  $insert([3], () => y)
  $insert([5], () => z)
  $insert([7], () => p)
}) // multiple expressions and multiple texts
