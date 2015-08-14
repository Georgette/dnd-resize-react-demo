require('es5-shim')
require('console-polyfill')
var React = require('react')
var Page = require('./components/page')

React.render(
    <Page />,
    document.getElementById('landing')
);