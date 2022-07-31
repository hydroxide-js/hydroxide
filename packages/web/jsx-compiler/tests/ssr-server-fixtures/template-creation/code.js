const level0 = <h1> hello </h1>

function foo() {
  const level1 = <h1> hello </h1>

  function bar() {
    const level2 = <h1> hello </h1>

    function baz() {
      const level3 = <h1> hello </h1>
    }
  }
}
