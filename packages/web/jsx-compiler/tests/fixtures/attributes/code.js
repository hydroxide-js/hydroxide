<div>
  {/** static attributes */}
  <img src="hello.jpg" alt="hi" />

  {/** static and dynamic attributes */}
  <img src="hello.jpg" alt={x} />

  {/** dynamic attributes */}
  <img src={x} alt={y} />

  {/** literals in expression container */}
  <div a={true} b={null} c={undefined} d={10} e={'e'} />

  {/** attributes without values */}
  <button foo bar bazz />

  {/** namespaced attribute names */}
  <button on:click={x} $:value={y} foo:bar="bazz" foo:bazz={XXX} />

  {/** conditional elements */}
  <p $:if={FOO}> hi </p>

  {/** conditional elements with other attributes */}
  <p $:if={BAR} foo="foo" bar={bar}> hello </p>

  {/** bunch of different attributes with conditional attribute */}
  <div
    a={true}
    b={null}
    c={undefined}
    d={10}
    e={'e'}
    on:click={x}
    $:value={y}
    $:if={x}
    title="title"
    data-x={X}
  > complex 1 </div>

  {/** bunch of different attributes with one spread with conditional attribute */}
  <div
    a={true}
    b={null}
    {...X}
    c={undefined}
    d={10}
    e={'e'}
    on:click={x}
    $:value={y}
    $:if={x}
    title="title"
    data-x={X}
  > complex 2 </div>
</div>

