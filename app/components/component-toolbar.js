var React = require('react/addons')
var ComponentTool = require('./component-tool')

var ComponentToolbar = React.createClass({

    render: function() {
        var tools = this.props.tools.map(function (tool, idx) {
            return <ComponentTool key={idx} tool={tool} />
        })

        return (
            <div id="component-bar" {...this.props}>
                <div className="row">
                    <div className="col-xs-12 component-wrapper">
                        {tools}
                    </div>
                </div>
            </div>

        )
    }
})

module.exports = ComponentToolbar