var React = require('react/addons')
var DragDropMixin = require('react-dnd').DragDropMixin
var DndTypes = require('../constants/dnd-types')
var GridActions = require('../actions/grid-actions')

var GridRow = React.createClass({
    mixins: [DragDropMixin],
    //DnD plugin function
    configureDragDrop: function (registerType) {
        var self = this

        // Specify all supported types by calling registerType(type, { dragSource?, dropTarget? })
        registerType(DndTypes.TOOL, {
            dropTarget: {
                acceptDrop: function (item, ev) {
                    GridActions.addComponentToRow({row: self.props.row, tool: item})
                }
            }
        })
    },
    render: function(){
        //DnD API monitors dropstate for us, see docs
        var dropState = this.getDropState(DndTypes.TOOL)
        var classes = React.addons.classSet({
            'wx-row': true,
            'droppable-hovering': dropState.isHovering,
            'empty': this.props.row.columns.length === 0
        })
        //this.props.children accepts the columns as children injected in grid
        return (
            <div {...this.dropTargetFor(DndTypes.TOOL)} className={classes}>
                {this.props.children}
            </div>
        )
    }

})

module.exports = GridRow