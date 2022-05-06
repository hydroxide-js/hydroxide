import { createTemplate } from '@nuejs/web'

const _T = createTemplate(
  '<div>count is <!><button> count is <!></button></div>',
  [0, [1]],
  [0, [2, 1]]
)

_T(count, count)
