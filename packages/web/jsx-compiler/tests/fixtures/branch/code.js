const if_else = (
  <div>
    {/* if(element), else(element) */}
    <p if={count() % 2 === 0}> even </p>
    <p else > odd </p>

    {/* if(Component), else(Component) */}
    <Even if={isEven()} />
    <Odd else />

    {/* if(element), else(Component) */}
    <div if={data() === undefined} class='loader' />
    <Content else data={data('content')} />

    {/* if(Component), else(element) */}
    <Loader if={data() === undefined} />
    <Content else data={data('content')}/>
  </div>
)

const if__else_if = (
  <div>
    {/* if(element), else-if(element) */}
    <p if={isAdmin()}> Admin </p>
    <p else-if={isUser()}> User </p>

    {/* if(component), else-if(component) */}
    <Page1 if={route.matches('/page1')} />
    <Page2 else-if={route.matches('/page2')} />

    {/* two condition groups next to each other */}
    <p if={divisibleBy2()}> divisible by 2 </p>
    <p else-if={divisibleBy4()}> divisible by 4 </p>
    <p if={divisibleBy3()}> divisible by 3 </p>
    <p else-if={divisibleBy5()}> divisible by 5 </p>
  </div>
)


const if__else_if__else = (
  <div>
    {/* el, comp, el */}
    <p if={count() % 15 === 0}> fizz buzz </p>
    <Fizz else-if={count() % 3 === 0}  />
    <p else={count() % 15 === 0}> buzz </p>

    {/* el, el, el */}
    <p if={status() === 'approved'} class='approved'> approved </p>
    <p else-if={status() === 'pending'} class='pending'> pending </p>
    <p else class='other'> other </p>
  </div>
)


const if__if__if_else = (
  <div>
    <div if={showModal()}>
      <h1> Welcome </h1>
      <div if={isLoggedIn()}>
        <LoginInfo />
        <Admin if={isAdmin()} />
        <User if={isUser()} />
      </div>
      <Login else />
    </div>
  </div>
)
