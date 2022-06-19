const eventNamesDelegated = new Set<string>()

export function delegateEvents(eventNames: string[]) {
  for (let i = 0, l = eventNames.length; i < l; i++) {
    const name = eventNames[i]
    if (!eventNamesDelegated.has(name)) {
      eventNamesDelegated.add(name)
      document.addEventListener(name, eventHandler)
    }
  }
}

// taken from solid js
function eventHandler(event: Event) {
  const key = `$$${event.type}`

  let node: EventTarget | null =
    (event.composedPath && event.composedPath()[0]) || event.target

  if (event.target !== node) {
    Object.defineProperty(event, 'target', {
      configurable: true,
      value: node
    })
  }

  Object.defineProperty(event, 'currentTarget', {
    configurable: true,
    get() {
      return node || document
    }
  })

  while (node !== null) {
    // @ts-expect-error
    const handler = node[key]

    // if not handler on node, try to find one on parent
    // @ts-expect-error
    if (handler && !node.disabled) {
      if (Array.isArray(handler)) {
        handler[0](handler[1], event)
      } else {
        handler(event)
      }

      if (event.cancelBubble) {
        return
      }
    }

    node =
      (node as ShadowRoot).host &&
      (node as ShadowRoot).host !== node &&
      (node as ShadowRoot).host instanceof Node
        ? (node as ShadowRoot).host
        : (node as Node).parentNode
  }
}
