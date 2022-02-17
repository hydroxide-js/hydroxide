import { WebContext } from '.'

type EventHandler = (event: Event) => any

type DelegatedEvents = {
  [K: string]: Map<HTMLElement, Function>
}

type DelegatedEventsForRoot = Map<HTMLElement, DelegatedEvents>

export const delegatedEventsForRoot: DelegatedEventsForRoot = new Map()

/** supports event delegation for multiple roots  */

/**
 * Delegate an Event for targetElement on  given root
 */
export function delegateEvent(
  targetElement: HTMLElement,
  eventName: string,
  handler: EventHandler,
  root: HTMLElement,
  context: WebContext
) {
  if (!delegatedEventsForRoot.get(root)) {
    delegatedEventsForRoot.set(root, {})
  }

  const delegatedEvents = delegatedEventsForRoot.get(root)!

  const isExistingEvent = eventName in delegatedEvents

  const eventMap = isExistingEvent
    ? delegatedEvents[eventName]
    : (delegatedEvents[eventName] = new Map())

  eventMap.set(targetElement, handler)

  context.connectCbs.push(() => {
    eventMap.set(targetElement, handler)
  })

  context.disconnectCbs.push(() => {
    eventMap.delete(targetElement)
  })

  if (!isExistingEvent) {
    const eventHandler = (event: Event) => {
      const handler = eventMap.get(event.target as HTMLElement)
      return handler(event)
    }

    // if it does not exist, add a new handler on root
    root.addEventListener(eventName, eventHandler)
  }
}
