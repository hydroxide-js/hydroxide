import { createReactive } from '../src/store/reactive'
import { dirtyStores } from '../src/store/updatedStores'

test('assignment', () => {
  dirtyStores.clear()
  const count = createReactive(0)
  count.value = 1
  expect(dirtyStores.size).toBe(1)
})

test('shallow mutation', () => {
  dirtyStores.clear()
  const user = createReactive({
    name: 'Manan',
    age: 23
  })

  user.$('name').value = 'new name'

  expect(dirtyStores.size).toBe(1)
})
