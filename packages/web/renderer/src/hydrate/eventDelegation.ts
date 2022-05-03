import type { WebContext } from '../WebContext'

export type EventHandler = (event: Event) => any

type DelegatedEvents = {
  [K: string]: Map<HTMLElement, Function>
}

const delegatedEvents: DelegatedEvents = {}

/** supports event delegation for multiple roots  */

/**
 * Delegate an Event for targetElement on  given root
 */
export function delegateEvent(
  targetElement: HTMLElement,
  eventName: string,
  handler: EventHandler,
  context: WebContext
) {
  const isExistingEvent = eventName in delegatedEvents

  const eventMap = isExistingEvent
    ? delegatedEvents[eventName]
    : (delegatedEvents[eventName] = new Map())

  eventMap.set(targetElement, handler)

  context.addConnectCb(() => {
    eventMap.set(targetElement, handler)
  })

  context.addDisconnectCb(() => {
    eventMap.delete(targetElement)
  })

  if (!isExistingEvent) {
    const eventHandler = (event: Event) => {
      const handler = eventMap.get(event.target as HTMLElement)
      if (!handler) return
      return handler(event)
    }

    // if it does not exist, add a new handler on root
    document.body.addEventListener(eventName, eventHandler)
  }
}
