const if_else = (
  <div>
    {/* if(element), else(element) */}
    <h1 $:if={X} />
    <h2 $:else />

    {/* if(Component), else(Component) */}
    <Foo $:if={X} />
    <Foo $:else />

    {/* if(element), else(Component) */}
    <h1 $:if={X} />
    <Foo $:else />

    {/* if(Component), else(element) */}
    <Foo $:if={X} />
    <h2 $:else />
  </div>
)

const if__else_if = (
  <div>
    {/* if(element), else-if(element) */}
    <p $:if={X}> X </p>
    <p $:else-if={Y}> Y </p>

    {/* if(component), else-if(component) */}
    <Foo $:if={X}> X </Foo>
    <Foo $:else-if={Y}> Y </Foo>

    {/* two condition groups next to each other */}
    <p $:if={X}> X </p>
    <p $:else-if={Y}> Y </p>
    <p $:if={Z}> Z </p>
    <p $:else-if={W}> E </p>
  </div>
)


const if__else_if__else = (
  <div>
    {/* el, comp, el */}
    <p $:if={X}> X </p>
    <Foo $:else-if={Y} a={A} b={B} />
    <p $:else={Y}> Z </p>

    {/* el, el, el */}
    <p $:if={X}> X </p>
    <p $:else-if={Y}> Y </p>
    <p $:else={Y}> Z </p>
  </div>
)


const if__if__if_else = (
  <div>
    <p $:if={X}>
      this is X
      <p $:if={Y}>
        this is Y<p $:if={Z}> this is Z </p>
      </p>
      <div $:else> this is not Y </div>
    </p>
  </div>
)
