<div>
  {/** static attributes */}
  <img src="hello.jpg" alt="hi" />

  {/** static and dynamic attributes */}
  <img src="hello.jpg" alt={img('alt')} />

  {/** dynamic attributes */}
  <img src={img('src')} alt={alt} />

  {/** literals in expression container */}
  <div a={true} b={null} c={undefined} d={10} e={'e'} />

  {/** attributes without values */}
  <button foo bar bazz />

  {/** namespaced attribute names */}
  <button on:click={handleClick} $:value={value} foo:bar="bazz" foo:bazz={fooBazz()} />

  {/** conditional elements */}
  <p $:if={count() % 2 === 0}> even </p>

  {/** conditional elements with other attributes */}
  <p $:if={ShowFoo} foo="foo" bar={bar}> foo </p>

  {/** bunch of different attributes with conditional attribute */}
  <div
    a={true}
    b={null}
    c={undefined}
    d={10}
    e={'e'}
    on:click={handleClick}
    $:value={value}
    $:if={foo()}
    title="title"
    data-x={x}
  > complex </div>

</div>

