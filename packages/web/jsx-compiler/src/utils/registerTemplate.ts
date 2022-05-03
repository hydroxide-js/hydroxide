import { template, types as t } from '@babel/core'
import { g } from '..'
import { config } from '../config'

export function registerTemplate(html: string, hydrations: t.Expression[]) {
  const args: t.Expression[] = [t.stringLiteral(html)]

  if (hydrations.length) {
    args.push(...hydrations)
  }

  // _template
  const templateId = g.program.scope.generateUidIdentifier('T')

  if (!g.imported) {
    const importDeclaration = template(
      `import { createTemplate } from '${config.importSource}';`
    )

    g.program.unshiftContainer('directives', importDeclaration())
    g.imported = true
  }

  const createTemplateExpr = t.callExpression(
    t.identifier('createTemplate'),
    args
  )

  // var _template = [html, exprs]
  g.program.scope.push({
    id: templateId,
    init: createTemplateExpr,
    kind: 'const'
  })

  return templateId
}
