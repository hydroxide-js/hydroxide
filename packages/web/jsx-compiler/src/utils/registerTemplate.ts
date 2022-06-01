import { template, types as t } from '@babel/core'
import { g } from '..'
import { config } from '../config'

export function registerTemplate(html: string) {
  // templateArgs = [html, ...hydrations]
  // const templateArgs: t.Expression[] = [t.stringLiteral(html), ...hydrations]

  // if not imported, import all the stuff
  if (!g.imported) {
    const importDeclaration = template(
      `import { $template, $insert, $attr, $comp, $branch } from '${config.importSource}';`
    )

    g.program.unshiftContainer('directives', importDeclaration())
    g.imported = true
  }

  // _Tx
  const templateId = g.program.scope.generateUidIdentifier('T')

  // createTemplate(...templateArgs)
  const createTemplateExpr = t.callExpression(t.identifier('$template'), [
    t.stringLiteral(html)
  ])

  // const _Tx = createTemplate(...templateArgs)
  g.program.scope.push({
    id: templateId,
    init: createTemplateExpr,
    kind: 'const'
  })

  return templateId
}
