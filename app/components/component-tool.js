var React = require('react/addons')
var DragDropMixin = require('react-dnd').DragDropMixin
var DndTypes = require('../constants/dnd-types')

var Tool = React.createClass({
    mixins: [DragDropMixin],
    configureDragDrop: function (registerType) {
        var self = this
        registerType(DndTypes.TOOL, {
            dragSource: {
                beginDrag: function () {
                    return {
                        item: {type: 'tool', name: self.props.tool.text}
                    }
                }
            }
        })
    },
    render:function(){
        var classString = "glyphicon glyphicon-" + this.props.tool.icon
        return (
            <div {...this.dragSourceFor(DndTypes.TOOL)} className="component col-xs-4 col-sm-6 col-md-4">
                <span className={classString} aria-hidden="true"></span>
                <span className="glyphicon-class">{this.props.tool.text}</span>
            </div>
        )
    }
})

module.exports = Tool