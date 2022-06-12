import { Context } from '../src/context/ComponentContext'

test("when parent context is disconnected, it's children contexts get disconnected", () => {
  // c1 > c2 > c3
  const c1 = new Context(null)
  const c2 = new Context(c1)
  const c3 = new Context(c2)

  // all connected by default
  expect(c1.isConnected).toBe(true)
  expect(c2.isConnected).toBe(true)
  expect(c3.isConnected).toBe(true)

  // disconnect c1
  c1.disconnect()

  // expect c2 and c23 to be disconnected as well
  expect(c1.isConnected).toBe(false)
  expect(c2.isConnected).toBe(false)
  expect(c3.isConnected).toBe(false)

  // connect again
  c1.connect()

  // expect all to be connected again
  expect(c1.isConnected).toBe(true)
  expect(c2.isConnected).toBe(true)
  expect(c3.isConnected).toBe(true)

  // now disconnect c2
  c2.disconnect()

  // expect c2, and c3 to be disconnected, but c1 remains connected
  expect(c1.isConnected).toBe(true)
  expect(c2.isConnected).toBe(false)
  expect(c3.isConnected).toBe(false)

  // now connect the c2 back
  c2.connect()
  // expect c2 and c3 to be connected
  expect(c1.isConnected).toBe(true)
  expect(c2.isConnected).toBe(true)
  expect(c3.isConnected).toBe(true)
})
