// don't wrap literals
const literalTest = (
  <div>
    <p title={'Wikipedia'}> {'Wikipedia.com'} </p>
    <Info foo={100} $:bar={200} > {300} </Info>
  </div>
)


// wrap member expressions
const exprTest = (
  <div>
    <p title={props.title}> {props.site} </p>
    <Info foo={props.foo} $:bar={foo.bar} > {bar.bazz} </Info>
  </div>
)


// don't wrap indentifiers
const idTest = (
  <div>
    <p title={title} on:click={handleClick} > {site} </p>
    <Info onRemove={handleRemove} $:bar={bar} > {mapping} </Info>
  </div>
)


// wrap call expressions
const callTest = (
  <div>
    <p title={title()} on:click={createHandler()} > {site} </p>
    <Info onRemove={foo()} $:bar={bar()} > {createMapping()} </Info>
  </div>
)


// don't wrap component() and branch() calls
const compAndBranch = (
  <div>
    <Foo bar={<Bar />} branch={<div $:if={bar}> bar </div>}></Foo>
  </div>
)


// don't wrap pure iife
const pureIIFE = (
  <div>
    <Foo bar={<div> {bar()} </div>}></Foo>
  </div>
)

// don't wrap cloneNode
const cloneNode = (
  <div>
    <Foo bar={<div> bar </div>}></Foo>
  </div>
)

// don't wrap unreactive expressions
const unreactive =  (
  <div>
    <p title={foo + bar}> {x === y} </p>
    <Info foo={10 + 200} > {x + y} </Info>
  </div>
)