import * as t from '@babel/types'
import { programInfo } from '../programInfo'
import { registerImportMethod } from './build'

export function appendTemplates() {
  if (programInfo.templates.length === 0) return
  const declarations = programInfo.templates.map(template => {
    return t.variableDeclarator(template.id, template.expr())
  })

  programInfo.path.node.body.unshift(t.variableDeclaration('const', declarations))
}

// delegateEvents([...eventsNames])
export function addEventDelegation() {
  if (programInfo.usedEvents.size === 0) return

  const stringExprs = [...[...programInfo.usedEvents].map(name => t.stringLiteral(name))]

  programInfo.path.node.body.push(
    t.expressionStatement(
      t.callExpression(registerImportMethod('delegateEvents', 'dom'), [
        t.arrayExpression(stringExprs)
      ])
    )
  )
}

export function postprocess() {
  addEventDelegation()
  appendTemplates()

  // reset global info
  programInfo.imports.clear()
  programInfo.usedEvents.clear()
  programInfo.templates = []
}
