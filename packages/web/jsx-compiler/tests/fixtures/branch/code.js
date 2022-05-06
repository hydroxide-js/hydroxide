// if and else --------------

const test1 = <div>
  <h1 $:if={X} />
  <h2 $:else />
</div>
// if(element), else(element)

const test1_2 = <div>
  <Foo $:if={X} />
  <Foo $:else />
</div>
// if(Component), else(Component)

const test1_3 = <div>
  <h1 $:if={X} />
  <Foo $:else />
</div>
// if(element), else(Component)

const test1_4 = <div>
  <Foo $:if={X} />
  <h2 $:else />
</div>
// if(Component), else(element)

// ---------------- if else-if

const test2 = <div>
  <p $:if={X}> X </p>
  <p $:else-if={Y}> Y </p>
</div>
// if(element), else-if(element)

const test3 = <div>
  <Foo $:if={X}> X </Foo>
  <Foo $:else-if={Y}> Y </Foo>
</div>
// if(component), else-if(component)

// ---------------- if else-if else

const test4 = <div>
  <p $:if={X}> X </p>
  <Foo $:else-if={Y} a={A} b={B} />
  <p $:else={Y}> Z </p>
</div>
// if, else-if, else

const test5 = <div>
  <p $:if={X}> X </p>
  <p $:else-if={Y}> Y </p>
  <p $:else={Y}> Z </p>
</div>
// if, else-if, else-if, else

const test6 = <div>
  <p $:if={X}> X </p>
  <p $:else-if={Y}> Y </p>
  <p $:if={Z}> Z </p>
  <p $:else> E </p>
</div>
// if, else + if, else

const test7 = <div>
  <p $:if={X}>
    this is X
    <p $:if={Y}>
      this is Y
      <p $:if={Z}> this is Z </p>
    </p>
    <div $:else> this is not Y </div>
  </p>
</div>
// if > if > if