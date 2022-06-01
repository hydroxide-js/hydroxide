const test1 = <Foo />
// no props - self closing

const test2 = <Foo></Foo>
// no props - with closing tag

const test3 = <Foo.bar />
// member expression level 1

const test4 = <A.B.C.D.E />
// member expression level 4

const test5 = <Foo x={42} y={foo} z={'hello'} p={() => 42} />
// props

const test6 = <Foo $:if={bar} />
// Reserved props

const test7 = <Foo x={42} y={foo} $:if={bar} />
// Normal Props + Reserved Props

const test8 = <Foo x={foo}> hello </Foo>
// props + single string children

const test9 = <Foo x={foo}> {10} </Foo>
// props + single number children

const test10 = <Foo x={foo}> {{ foo: 'bar'}} </Foo>
// props + single obj

const test11 = <Foo x={foo}> {x} </Foo>
// props + single id

const test12 = (
  <Foo>
    foo
    bar
    bro
    {100}
    {true}
    {null}
    {undefined}
    <h1> hi </h1>
    hello hi
    {<h1> foo </h1>}
    {(x) => <div> foo {x} </div>}
  </Foo>
)
// various types of children

const test13 = <Foo foo bar bazz ></Foo>
// props without values