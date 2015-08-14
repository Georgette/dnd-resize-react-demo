var React = require('react')
var GridStore = require('../stores/grid-store')
var ToolStore = require('../stores/tool-store')
var MouseActions = require('../actions/mouse-actions')
var ComponentToolbar = require('./component-toolbar')
var Grid = require('./grid')

function getState () {
    return {
        grid: GridStore.getGrid(),
        tools: ToolStore.getTools()
    }
}

var Page = React.createClass({
    getInitialState: function () {
        return getState()
    },

    componentDidMount: function () {
        GridStore.addChangeListener(this._onChange)
        ToolStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function () {
        GridStore.removeChangeListener(this._onChange)
        ToolStore.removeChangeListener(this._onChange)
    },

    mouseMove: function (ev) {
        MouseActions.move({ event: ev })
    },

    mouseUp: function (ev) {
        MouseActions.up({ event: ev })
    },

    mouseDown: function (ev) {
        MouseActions.down({ event: ev })
    },

    render: function () {
        return (
            <div className="full-height"
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseMove={this.mouseMove}
            >
                <div id="body-wrap" className="row">
                    <ComponentToolbar
                        tools={this.state.tools}
                        className="col-xs-12 col-sm-3" />
                    <Grid id="body"
                        rows={this.state.grid.rows}
                        className="col-xs-12 col-sm-9 col-no-gutter nohighlight" />
                </div>
            </div>
        )
    },

    _onChange: function () {
        this.setState(getState())
    }
})

module.exports = Page