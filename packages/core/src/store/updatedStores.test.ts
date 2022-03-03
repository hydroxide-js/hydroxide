import { createReactive } from '../apis/createReactive'
import { updatedStores } from './updatedStores'

test('assignment', () => {
  updatedStores.clear()
  const count = createReactive(0)
  count.value = 1
  expect(updatedStores.size).toBe(1)
})

test('shallow mutation', () => {
  updatedStores.clear()
  const user = createReactive({
    name: 'Manan',
    age: 23
  })

  user.$('name').value = 'new name'

  expect(updatedStores.size).toBe(1)
})
