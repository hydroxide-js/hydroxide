const test1 = <Foo />
// self closing, no props, no children

const test2 = <Foo></Foo>
// no props, no children

const test3 = <Foo.bar />
// member expression level 1

const test4 = <A.B.C.D.E />
// component name is member expression

const test5 = <Foo x={42} y={foo} z={'hello'} p={() => 42} />
// props

const test6 = <Foo $:foo={bar} $:ref={ref} />
// namespaced "special" props

const test7 = <Foo x={42} y={foo} $:ref={bar} />
// Normal Props + Reserved Props

const test8 = <Foo x={foo}> hello </Foo>
// props + single string children

const test9 = <Foo x={foo}> {10} </Foo>
// props + single numeric children

const test10 = <Foo x={foo}> {{ foo: 'bar'}} </Foo>
// props + single obj as child

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
    <h1> hi </h1>
    hello hi
    {<h1> foo </h1>}
    {(x) => <div> foo {x} </div>}
  </Foo>
)
// various types of children

const test13 = <Foo foo bar bazz ></Foo>
// props without values


const test14 = <Foo> {count() * 2}</Foo>
// reactive single child

const test15 = <Foo> {item => <span> {item()}</span>}</Foo>
// function single child

const test16 = <Foo> <span> {count() * 2} </span> {count() * 4}  </Foo>
// element with reactive as one of the children

const test17 = <Foo> <Bar /> {count() * 4}  </Foo>
// component as one of the children

const test18 = <Foo> <Bar /> </Foo>
// component as only child
