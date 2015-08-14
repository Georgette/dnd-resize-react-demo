var AppDispatcher = require('../dispatcher/app-dispatcher')
var MouseConstants = require('../constants/mouse-constants')

var MouseActions = {

    move: function(payload) {
        AppDispatcher.handleViewAction({
            actionType: MouseConstants.MOUSE_MOVE,
            payload: payload
        })
    },

    up: function(payload) {
        AppDispatcher.handleViewAction({
            actionType: MouseConstants.MOUSE_UP,
            payload: payload
        })
    },

    down: function(payload) {
        AppDispatcher.handleViewAction({
            actionType: MouseConstants.MOUSE_DOWN,
            payload: payload
        })
    }
}

module.exports = MouseActions