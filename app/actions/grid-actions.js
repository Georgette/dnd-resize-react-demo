var AppDispatcher = require('../dispatcher/app-dispatcher')
var GridConstants = require('../constants/grid-constants')

var GridActions = {

    addComponentToRow: function(payload) {
        AppDispatcher.handleViewAction({
            actionType: GridConstants.ADD_COMPONENT_TO_ROW,
            payload: payload
        })
    },

    removeColumn: function(payload) {
        AppDispatcher.handleViewAction({
            actionType: GridConstants.REMOVE_COLUMN,
            payload: payload
        })
    },

    startResize: function (payload) {
        AppDispatcher.handleViewAction({
            actionType: GridConstants.START_RESIZE,
            payload: payload
        })
    }

}

module.exports = GridActions