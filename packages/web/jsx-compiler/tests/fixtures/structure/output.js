import {
  createTemplate,
  $Embed,
  $Attr,
  $Comp,
  $CondEl,
  $Branch
} from '@nuejs/web'

const _T = createTemplate(
  '<div><p>aaa <!> bbb <!></p>ccc   ddd<button>    eee     <!> <!> <!>     </button></div>',
  [$Embed, [0, 1]],
  [$Embed, [0, 3]],
  [$Embed, [2, 1]],
  [$Embed, [2, 3]],
  [$Embed, [2, 5]]
)

_T(x, x, x, y, z)
