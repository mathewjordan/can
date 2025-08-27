import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    p: "p",
    ..._provideComponents(),
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h1, {
      children: "Sitemap"
    }), "\n", _jsx(_components.p, {
      children: "Here are the available pages:"
    }), "\n", _jsxs("ul", {
      children: [props.pages.map(p => _jsx("li", {
        children: _jsx("a", {
          href: `/${p.href}`,
          children: p.title
        })
      }, p.href)), props.pages.length === 0 && _jsx("li", {
        children: _jsx("em", {
          children: "No pages yet."
        })
      })]
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ..._provideComponents(),
    ...props.components
  };
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
