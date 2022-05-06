import { createTemplate } from '@nuejs/web'

const _T = createTemplate('<div></div>'),
  _T2 = createTemplate('<img>'),
  _T3 = createTemplate('<img>'),
  _T4 = createTemplate('<hr>'),
  _T5 = createTemplate('<foo-bar></foo-bar>')

;[
  // self closed non void elements, must be closed
  _T(), // self closed void elements, need not be closed
  _T2(), // ignore closing tag of void element
  _T3(), // ignore children of void element
  _T4(), // custom elements
  _T5()
]
