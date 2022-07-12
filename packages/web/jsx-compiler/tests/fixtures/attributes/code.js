<div>
  {/** all static attributes */}
  <img src="hello.jpg" alt="hi" />

  {/** 1 static and 1 dynamic attributes */}
  <img src={src} alt={img().alt} />

  {/** multiple dynamic attributes */}
  <img src={img().src} alt={img().alt} />

  {/** static props */}
  <img prop-textContent={'hello'} prop-foo={foo} />

   {/** 1 static prop, 1 dynamic prop */}
  <img prop-textContent={'hello'} prop-foo={foo()} />

   {/** multiple dynamic props */}
  <img prop-textContent={text()} prop-foo={foo()} />

  {/** literals in expression container */}
  <div a={true} b={null} c={undefined} d={10} e={'e'} />

  {/** attributes without values */}
  <button foo bar bazz />

  {/** namespaced attribute names */}
  <button $:value={value} foo:bar="bazz" foo:bazz={fooBazz()} />

</div>

