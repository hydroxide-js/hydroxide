;[
  // self closed non void elements, must be closed
  <div />,
  // self closed void elements, need not be closed
  <img />,
  // ignore closing tag of void element
  <img></img>,
  // ignore children of void element
  <hr> foo </hr>,
  // custom elements
  <foo-bar></foo-bar>,
  // namespaced elements
  <foo:bar></foo:bar>
]
