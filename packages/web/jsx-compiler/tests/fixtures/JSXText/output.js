import { createTemplate } from '@nuejs/web'

const _T = createTemplate('<div> foo bar 100 true bazz </div>'),
  _T2 = createTemplate('<div>hello</div>'),
  _T3 = createTemplate('<div>foo 10 true hi <!></div>', [0, [1]]),
  _T4 = createTemplate(
    '<div><!> foo <!> bazz <!></div>',
    [0, [0]],
    [0, [2]],
    [0, [4]]
  ),
  _T5 = createTemplate(
    '<div><!> foo 10 <!> bazz <!></div>',
    [0, [0]],
    [0, [2]],
    [0, [4]]
  )

;[_T(), _T2(), _T3(X), _T4(X, Y, Z), _T5(X, Y, Z)]
