const React = require('react');

module.exports = function Layout({ children }) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('header', { className: 'site-header' },
      React.createElement('a', { href: '/', className: 'brand' }, 'My Site')
    ),
    React.createElement('main', { className: 'content' }, children),
    React.createElement('footer', { className: 'site-footer' },
      'Built with the MDX static site generator'
    )
  );
};

