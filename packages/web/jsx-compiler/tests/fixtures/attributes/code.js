const test1 = <img src="hello.jpg" alt="hi" />
// 1. static attributes

const test2 = <img src="hello.jpg" alt={x} />
// 2. static and dynamic attributes

const test3 = <img src={x} alt={y} />
// 3. all dynamic attributes

const test4 = <div a={true} b={null} c={undefined} d={10} e={'e'} />
// 4. literal value inside jsxExpressionContainer
// attributes with null and undefined value will be removed

const test5 = <button foo bar bazz />
// 5. attributes without values

const test6 = <button on:click={x} $:value={y} />
// 6. attribute names with namespace

const test8 = <p $:if={x}> </p>
// 8. conditional attribute only

const test9 = <p $:if={x} foo="foo" bar={bar}></p>
// 8. conditional attributes with other attributes

// all together in one example
const test10 = (
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
  ></div>
)

const test11 = (
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
  ></div>
)
// spread attribute present
