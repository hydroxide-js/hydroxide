type EventHandler = (event: Event) => any

type DelegatedEvents = {
  [K: string]: Map<HTMLElement, Function>
}

const delegatedEvents: DelegatedEvents = {}

/**
 * Delegate an Event for targetElement on rootElement
 * @param targetElement - target element of the event
 * @param eventName - name of the event
 * @param handler - event handler
 * @param rootElement - element on which the event is *actually* added
 */
export function addEvent(
  targetElement: HTMLElement,
  eventName: string,
  handler: EventHandler,
  rootElement: HTMLElement
) {
  const isExistingEvent = eventName in delegatedEvents

  if (!isExistingEvent) {
    // create map for the new event type
    delegatedEvents[eventName] = new Map()
  }

  delegatedEvents[eventName].set(targetElement, handler)

  if (!isExistingEvent) {
    // if it does not exist, add a new handler on root
    rootElement.addEventListener(eventName, (event) => {
      const eventMap = delegatedEvents[eventName]
      if (!eventMap) return
      const handler = eventMap.get(event.target as HTMLElement)
      if (!handler) return
      return handler(event)
    })
  }
}
