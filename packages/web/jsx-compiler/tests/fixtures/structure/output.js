import { $template, $insert, $attr, $comp, $branch } from '@nuejs/web'

const _T = $template(
  '<div><p>aaa <!> bbb <!></p>ccc   ddd<button>    eee     <!> <!> <!>     </button></div>'
)

_T(() => {
  $insert([0, 1], () => x)
  $insert([0, 3], () => x)
  $insert([2, 1], () => x)
  $insert([2, 3], () => y)
  $insert([2, 5], () => z)
})
