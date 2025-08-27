import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ..._provideComponents(),
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx("header", {
      className: "site-header",
      children: _jsx("a", {
        href: "/",
        className: "brand",
        children: "My MDX Site"
      })
    }), "\n", _jsx("main", {
      className: "content",
      children: props.children
    }), "\n", _jsx("footer", {
      className: "site-footer",
      children: _jsx(_components.p, {
        children: "Built with MDX layout override"
      })
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
