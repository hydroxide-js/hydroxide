import { $ } from '@nuejs/core'

it('works', () => {
  const condition = $(10)

  const jsxEl = (
    <div class="container">
      <input type="text" name="foo" id="bar" />
      <h1 class="title" $if={condition}>
        title
      </h1>
      <div class="info" $if={condition}>
        <span> hello </span>
        <span> world </span>
      </div>
    </div>
  )

  // @ts-ignore
  expect(jsxEl).toEqual({
    jsxTag: 'div',
    props: {
      class: 'container'
    },
    children: [
      {
        jsxTag: 'input',
        props: {
          type: 'text',
          name: 'foo',
          id: 'bar'
        }
      },
      {
        jsxTag: 'h1',
        props: {
          class: 'title'
        },
        $if: condition,
        children: ['title']
      },
      {
        jsxTag: 'div',
        props: {
          class: 'info'
        },
        $if: condition,
        children: [
          {
            jsxTag: 'span',
            props: {},
            children: [' hello ']
          },
          {
            jsxTag: 'span',
            props: {},
            children: [' world ']
          }
        ]
      }
    ]
  })
})

export const foo = 10
