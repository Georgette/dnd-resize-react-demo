var React = require('react/addons')
var GridRow = require('./grid-row')
var GridColumn = require('./grid-column')
var GridComponent = require('./grid-component')
var GridResizeHandle = require('./grid-resize-handle')

var Grid = React.createClass({
    getInitialState: function () {
        return {
            gridWidth: 0
        }
    },
    componentDidMount: function () {
        this.setState({
            gridWidth: this.getDOMNode().offsetWidth
        })
    },
    render: function(){
        var state = this.state
        return (
            <div {...this.props}>

            {this.props.rows.map(function(row, idx) {
               return (
                   <GridRow key={idx} idx={idx} row={row}>
                    {row.columns.map(function (col, idx) {
                        var resizeHandle = idx > 0
                            ? (
                            <GridResizeHandle
                                column={col}
                                parentWidth={state.gridWidth} />)
                            : undefined
                        return (
                            <GridColumn
                                key={idx}
                                idx={idx}
                                column={col}>

                                {resizeHandle}
                                {col.components.map(function (component, idx) {
                                    return (
                                        <GridComponent
                                            name={component.name}
                                            idx={idx}
                                            key={idx}
                                            component={component} />
                                    )
                                })}
                            </GridColumn>
                        )
                    })}
                   </GridRow>
               )
            })}
            </div>
        )
    }
})

module.exports = Grid