var React = require('react/addons')

var Tabs = React.createClass({

    render: function() {
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

module.exports = Tabs