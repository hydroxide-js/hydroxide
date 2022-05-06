const test1 = (
  <Foo a={A} b="B" {...C} d={42} {...E} {...F} g={null} h={undefined} />
)
// component

const test2 = (
  <p a={A} b="B" {...C} d={42} {...E} {...F} g={null} h={undefined}>
    hi
  </p>
)
// element
