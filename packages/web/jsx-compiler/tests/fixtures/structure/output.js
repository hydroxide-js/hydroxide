import { createTemplate } from '@nuejs/web'

const _T = createTemplate(
  '<div><p>aaa <!> bbb <!></p>ccc   ddd<button>    eee     <!> <!> <!>     </button></div>',
  [0, [0, 1]],
  [0, [0, 3]],
  [0, [2, 1]],
  [0, [2, 3]],
  [0, [2, 5]]
)

_T(x, x, x, y, z)
