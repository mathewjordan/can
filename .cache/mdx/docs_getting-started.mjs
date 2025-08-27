import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ..._provideComponents(),
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h1, {
      children: "Getting Started"
    }), "\n", _jsxs(_components.p, {
      children: ["Welcome! Create pages under ", _jsx(_components.code, {
        children: "content/"
      }), " using MDX. Examples:"]
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.code, {
          children: "content/index.mdx"
        }), " → homepage at ", _jsx(_components.code, {
          children: "/index.html"
        }), "."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.code, {
          children: "content/sitemap.mdx"
        }), " → sitemap at ", _jsx(_components.code, {
          children: "/sitemap.html"
        }), "."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.code, {
          children: "content/docs/getting-started.mdx"
        }), " → ", _jsx(_components.code, {
          children: "/docs/getting-started.html"
        }), "."]
      }), "\n"]
    }), "\n", _jsx(_components.h2, {
      children: "Next Steps"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: ["Edit ", _jsx(_components.code, {
          children: "content/_layout.mdx"
        }), " to customize header/footer."]
      }), "\n", _jsxs(_components.li, {
        children: ["Add more docs in ", _jsx(_components.code, {
          children: "content/docs/"
        }), "."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "hello"
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
