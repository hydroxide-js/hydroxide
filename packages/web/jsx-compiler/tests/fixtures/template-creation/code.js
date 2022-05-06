const hello = <h1> hello </h1>

function foo() {
  const x = 10
  function bar() {
    const y = 20

    return <h1> hi {x} </h1>

    function baz() {
      const z = 20
      return (
        <h1>
          hello {x} {y} {z}
        </h1>
      )
    }
  }
}
