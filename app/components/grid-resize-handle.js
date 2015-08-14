var React = require('react/addons')
var GridActions = require('../actions/grid-actions')

var GridResizeHandle = React.createClass({
    startResize: function () {
        GridActions.startResize({
            column: this.props.column,
            parentWidth: this.props.parentWidth
        })
    },

    render: function () {
        return (
            <div {...this.props}
                onMouseDown={this.startResize}
                className="grid-resize-handle" />
        )
    }
})

module.exports = GridResizeHandle