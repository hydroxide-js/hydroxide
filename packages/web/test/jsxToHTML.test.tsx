import { jsxToHTML } from '../src/jsxToHTML'
import { DynamicParts } from '../src/types'

function setup(jsxElement: JSX.Element) {
  const dynamics: DynamicParts = []
  const html = jsxToHTML(jsxElement, dynamics, [])
  return [html, dynamics]
}

test('text', () => {
  const [html, dynamics] = setup('hello')
  expect(html).toBe('hello')
  expect(dynamics).toEqual([])
})

test('single div static', () => {
  const jsxTuple = <div className="hi"> hello </div>
  const dynamics: DynamicParts = []
  const html = jsxToHTML(jsxTuple, dynamics, [])
  expect(html).toBe('<div className="hi" > hello </div>')
  expect(dynamics).toEqual([])
})

// test("single div, dynamic text", () => {
//   const count = $(0);
//   const jsxTuple = <div class="hi"> count is {count} </div>;

//   const dynamics: DynamicParts = [];
//   const html = jsxToHTML(jsxTuple, dynamics, []);
//   expect(html).toBe(`<div class="hi" > count is <!-- --> </div>`);
//   expect(dynamics).toEqual([
//     {
//       text: true,
//       nodeAddress: [1]
//     }
//   ]);
// });

// test("div structure, with static text", () => {
//   const jsxTuple = (
//     <div class="container">
//       <h1 class="title"> hello </h1>
//       <p class="message"> world </p>
//       <button type="submit" class="btn btn-primiary">
//         submit
//       </button>
//     </div>
//   );

//   const dynamics: DynamicParts = [];
//   const html = jsxToHTML(jsxTuple, dynamics, []);

//   expect(html).toBe(
//     [
//       '<div class="container" >',
//       /**/ '<h1 class="title" > hello </h1>',
//       /**/ '<p class="message" > world </p>',
//       /**/ '<button type="submit" class="btn btn-primiary" >submit</button>',
//       "</div>"
//     ].join("")
//   );
// });

// test("div structure + dynamic texts", () => {
//   const to = $("world");
//   const message = $("welcome to javascript land");
//   const other = $("other stuff");

//   const jsxTuple = (
//     <div class="container">
//       <h1 class="title"> hello {to} </h1>
//       <p class="message">
//         message: {message} {other}
//       </p>
//       <button type="submit" class="btn btn-primiary">
//         submit
//       </button>
//     </div>
//   );

//   const dynamics: DynamicParts = [];
//   const html = jsxToHTML(jsxTuple, dynamics, []);

//   expect(html).toBe(
//     [
//       '<div class="container" >',
//       /**/ '<h1 class="title" > hello <!-- --> </h1>',
//       /**/ '<p class="message" >message: <!-- --> <!-- --></p>',
//       /**/ '<button type="submit" class="btn btn-primiary" >submit</button>',
//       "</div>"
//     ].join("")
//   );

//   expect(dynamics).toEqual([
//     {
//       text: true,
//       nodeAddress: [0, 1]
//     },
//     {
//       text: true,
//       nodeAddress: [1, 1]
//     },
//     {
//       text: true,
//       nodeAddress: [1, 3]
//     }
//   ]);
// });
