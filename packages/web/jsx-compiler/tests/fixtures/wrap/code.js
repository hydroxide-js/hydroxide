// literals
// child, attribute -> stringify
// props, special prop, children -> as is
const literalTest = (
  <div>
    <p title={'Wikipedia'}> {'Wikipedia.com'} </p>
    <Info foo={100} $:bar={200} > {300} </Info>
  </div>
)


// expressions
// child, attribute, special prop, comp children -> wrap in arrow
// prop -> wrap in getter
const exprTest = (
  <div>
    <p title={props.title}> {props.site} </p>
    <Info foo={1 + 2} $:bar={Math.random()} > {x === y} </Info>
  </div>
)


// indentifiers
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is
const idTest = (
  <div>
    <p title={title} on:click={handleClick} > {site} </p>
    <Info onRemove={handleRemove} $:bar={bar} > {mapping} </Info>
  </div>
)


// call expressions
// child → as is (because function will not be used here right?)
// attribute → wrap with arrow
// prop, special prop, comp children ⇒ as is
const callTest = (
  <div>
    <p title={title()} on:click={createHandler()} > {site} </p>
    <Info onRemove={foo()} $:bar={bar()} > {createMapping()} </Info>
  </div>
)
