import { component, ForProps } from '@nuejs/core'
import { ArrayOperations } from '../../../core/src/types/arrayOps'
import { runComponent } from '../runComponent'
import { WebContext } from '../WebContext'

export function hydrateFor<T>(
  forProps: ForProps<T>,
  parentContext: WebContext,
  parentElement: HTMLElement,
  root: HTMLElement
) {
  const { each, render } = forProps

  type CompProps = {
    item: T
  }

  // TODO: cache this component so if parent component is looped, this comp remains the same
  // @ts-expect-error
  const comp = component<CompProps>((props) => render(props.item))

  const contexts = each.value.map((itemValue) => {
    const context = runComponent(
      comp,
      { item: itemValue },
      root,
      parentContext,
      true
    )
    parentElement.append(context.el)
    return context
  })

  // temp comments are for swapping nodes
  const tempComment1 = document.createComment('')
  const tempComment2 = document.createComment('')

  // save disconnected contexts for recycling the nodes
  const disconnectedContexts: WebContext[] = []

  function handleArrayMutation(arrayOp: ArrayOperations) {
    // new value assigned to array item
    // TODO: what happens if deep assign ?
    if ('dirty' in arrayOp) {
      const { key } = arrayOp
      const newValue = each.value[key]
      contexts[key].props.item.value = newValue
    }

    // insert
    else if ('insert' in arrayOp) {
      const key = arrayOp.insert
      const values = arrayOp.values as T[]
      const frag = document.createDocumentFragment()

      const newContexts = []

      for (let i = 0; i < values.length; i++) {
        // recycle disconnected contexts
        if (disconnectedContexts.length) {
          // console.log('recycled')
          const context = disconnectedContexts.pop()!
          context.props.item.value = values[i]
          context.connect()
          frag.append(context.el)
          newContexts.push(context)
        }

        // create new context
        else {
          // TODO: instead of creating new context, recycle removed ones
          const context = runComponent(
            comp,
            { item: values[i] },
            root,
            parentContext
          )

          frag.append(context.el)
          context.connected()
          newContexts.push(context)
        }
      }

      // if push
      if (key === contexts.length) {
        parentElement.append(frag)
      } else if (key === 0) {
        parentElement.prepend(frag)
      } else {
        contexts[key - 1].el.after(frag)
      }

      // TODO: don't splice the contexts - use a element to context map instead
      contexts.splice(key, 0, ...newContexts)
    }

    // remove
    else if ('remove' in arrayOp) {
      const removeIndex = arrayOp.remove
      const removeCount = arrayOp.count

      // disconnect components
      for (let i = 0; i < removeCount; i++) {
        // TODO: save the disconnected contexts so it could be recycled later if needed
        const context = contexts[removeIndex + i]

        // if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
        //   document.getElementById('removed')!.append(context.el)
        // } else {
        //   context.el.remove()
        // }
        context.el.remove()
        context.disconnect()
        disconnectedContexts.push(context)
      }

      contexts.splice(removeIndex, removeCount)
    }

    // swap
    else if ('swap' in arrayOp) {
      const [i, j] = arrayOp.swap

      performance.mark('swap-start')

      // replace elements with comments
      contexts[i].el.replaceWith(tempComment1)
      contexts[j].el.replaceWith(tempComment2)

      // replace comments with elements but switch the order
      tempComment1.replaceWith(contexts[j].el)
      tempComment2.replaceWith(contexts[i].el)

      performance.mark('swap-end')
      performance.measure('swap', 'swap-start', 'swap-end')

      const temp = contexts[i]
      contexts[i] = contexts[j]
      contexts[j] = temp
    }

    // clear
    else if ('clear' in arrayOp) {
      // console.log('clear')
      parentElement.textContent = ''
      disconnectedContexts.push(...contexts)
      contexts.length = 0
    }
  }

  each.subscribe((dirty) => {
    const s = performance.now()

    if (dirty && dirty._arr) {
      dirty._arr.forEach(handleArrayMutation)
    }

    requestAnimationFrame(() => {
      const e = performance.now()
      console.log(e - s)
    })
  }, false)
}
