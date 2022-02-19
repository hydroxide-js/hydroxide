// for automatic runtime
export function jsx(
  jsxTag: string | Nue.Component<any>,
  _props: Nue.GenericPassableProps
): JSX.HtmlElement {
  // no need to do anything if both children and $if is not present
  if (!_props.children && !_props.$if) {
    return { jsxTag, props: _props }
  }

  const jsxEl: JSX.HtmlElement = {
    jsxTag,
    props: {}
  }

  // if children
  if (_props.children) {
    // convert to array if not already
    if (!Array.isArray(_props.children)) {
      _props.children = [_props.children]
    }
  }

  // clone props and remove children, $if keys from it
  for (const key in _props) {
    if (key === 'children') {
      jsxEl.children = _props.children
    } else if (key === '$if') {
      jsxEl.$if = _props.$if
    } else {
      jsxEl.props[key] = _props[key]
    }
  }

  return jsxEl
}

export const jsxs = jsx

// for classic runtime
export function createElement(
  jsxTag: string | Nue.Component<any>,
  _props: Nue.GenericPassableProps | null,
  ...children: JSX.Element[]
): JSX.HtmlElement {
  // convert null props to objects
  const props = _props || {}

  // no need to do anything if both children and $if is not present
  if (!children.length && !props.$if) {
    return { jsxTag, props }
  }

  const jsxEl: JSX.HtmlElement = {
    jsxTag,
    props: {}
  }

  if (children.length) {
    jsxEl.children = children
  }

  for (const key in _props) {
    if (key === '$if') {
      jsxEl.$if = _props.$if
    } else {
      jsxEl.props[key] = _props[key]
    }
  }

  return jsxEl
}
