test('string children', () => {
  const jsxEl = <a href="hello"> cool </a>

  // @ts-ignore
  expect(jsxEl).toEqual({
    type: 'a',
    props: {
      href: 'hello',
      children: ' cool '
    }
  })
})

test('array children', () => {
  const jsxEl = (
    <div className="container">
      <h1 className="title"> title </h1>
      <div className="info">
        <span> hello </span>
        <span> world </span>
      </div>
    </div>
  )

  // @ts-ignore
  expect(jsxEl).toEqual({
    type: 'div',
    props: {
      className: 'container',
      children: [
        {
          type: 'h1',
          props: {
            className: 'title',
            children: ' title '
          }
        },
        {
          type: 'div',
          props: {
            className: 'info',
            children: [
              {
                type: 'span',
                props: {
                  children: ' hello '
                }
              },
              {
                type: 'span',
                props: {
                  children: ' world '
                }
              }
            ]
          }
        }
      ]
    }
  })
})

export const foo = 10
