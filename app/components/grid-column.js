var React = require('react/addons')
var DragDropMixin = require('react-dnd').DragDropMixin
var DndTypes = require('../constants/dnd-types')
var GridActions = require('../actions/grid-actions')

var GridColumn = React.createClass({
    mixins: [DragDropMixin],
    configureDragDrop: function (registerType) {
        var self = this

        // Specify all supported types by calling registerType(type, { dragSource?, dropTarget? })
        registerType(DndTypes.TOOL, {
            dropTarget: {
                acceptDrop: function (item) {
                    console.log('not yet')
                    return false
                    //GridActions.addComponentToRow({row: self.props.row, tool: item})
                }
            }
        })
    },
    remove: function () {
        GridActions.removeColumn({
            column: this.props.column
        })
    },

    render: function() {
        var dropState = this.getDropState(DndTypes.TOOL)
        var classes = React.addons.classSet({
            'wx-col': true,
            'droppable-hovering': dropState.isHovering
        })

        //this.props.children accepts the components as children
        return (
            <div {...this.dropTargetFor(DndTypes.TOOL)}
                className={classes}
                style={this.props.column.style}>

                <span
                    onClick={this.remove}
                    className="clickable glyphicon glyphicon-remove" />
                {this.props.children}
            </div>
        )
    }
})

module.exports = GridColumn