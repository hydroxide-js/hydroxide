import { createTemplate } from '@nuejs/web'

const _T = createTemplate('<div>AAA BBB</div>'),
  _T2 = createTemplate('<div>    CCC         DDD    </div>'),
  _T3 = createTemplate('<div>    EEE     FFF     GGG    </div>'),
  _T4 = createTemplate('<div><!></div>', [0, [0]]),
  _T5 = createTemplate('<div>HHH <!> III</div>', [0, [1]]),
  _T6 = createTemplate('<div></div>'),
  _T7 = createTemplate('<div><!></div>', [0, [0]]),
  _T8 = createTemplate('<div>JJJ KKK LLL MMM 100 true NNN <!> OOO</div>', [
    0,
    [1]
  ]),
  _T9 = createTemplate('<div>     PPP    </div>'),
  _T10 = createTemplate('<div>     QQQ     </div>'),
  _T11 = createTemplate(
    '<div><!> <!> <!> <!></div>',
    [0, [0]],
    [0, [2]],
    [0, [4]],
    [0, [6]]
  ),
  _T12 = createTemplate(
    '<div>AAA true <!> BBB 100 <!> <!> <!></div>',
    [0, [1]],
    [0, [3]],
    [0, [5]],
    [0, [7]]
  )

const test1 = _T() // extra whitespaces should be removed

const test2 = _T2() // extra whitespace should not be removed from expression container

const test3 = _T3() // extra whitespace should not be removed from expression container

const test4 = _T4(X) // single expression

const test5 = _T5(x) // few texts before expression

const test6 = _T6() // comments should be removed

const test7 = _T7(x) // comments should be removed

const test8 = _T8(x) // strigifiable expressions before actual expression

const test9 = _T9() // expression container touches the text

const test10 = _T10() // expression container whitespace away from the text (this middle whitespace should be respected)

const test11 = _T11(x, y, z, p) // multiple expressions

const test12 = _T12(x, y, z, p) // multiple expressions and multiple texts
