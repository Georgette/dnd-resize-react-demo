var React = require('react/addons')

var GridComponent = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
})

module.exports = GridComponent