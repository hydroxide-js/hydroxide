import { createTemplate } from '@nuejs/web'

const _T = createTemplate('<div>hello</div>'),
  _T2 = createTemplate('<div><!></div>', [0, [0]]),
  _T3 = createTemplate('<div>hello</div>'),
  _T4 = createTemplate('<div>foo bar</div>'),
  _T5 = createTemplate('<div><img>hello<p>foo</p></div>'),
  _T6 = createTemplate('<div>foo <!> bar</div>', [0, [1]]),
  _T7 = createTemplate('<div>100 foo bar <!> true</div>', [0, [1]])

const test1 = _T() // text

const test2 = _T2(x) // expression only

const test3 = _T3() // text betwween comments

const test4 = _T4() // comment between texts

const test5 = _T5() // whitespace between elements and text

const test6 = _T6(x) // expression between text

const test7 = _T7(`hi ${mom}`) // statßic values in expression container
