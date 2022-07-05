import { escape } from '../src/utils/process'

test('textContent', () => {
  // < and > are escaped
  expect(escape('<div>textContent</div>')).toBe('&lt;div&gt;textContent&lt;/div&gt;')

  // & is escaped
  expect(escape('hi & bye')).toBe('hi &amp; bye')

  // quotes
  // eslint-disable-next-line quotes
  expect(escape(`'hi' "bye"`)).toBe('&apos;hi&apos; &quot;bye&quot;')
})
