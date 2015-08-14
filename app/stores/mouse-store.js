var assign = require('object-assign')
var EventEmitter = require('events').EventEmitter
var AppDispatcher = require('../dispatcher/app-dispatcher')
var MouseConstants = require('../constants/mouse-constants')

var mouse = {
    down: false,
    up: true,
    position: {
        x: 0,
        y: 0
    }
}

function mouseMove (x, y) {
    mouse.position = {x: x, y: y}
}

function mouseUp () {
    mouse.up = true
    mouse.down = false
}

function mouseDown () {
    mouse.down = true
    mouse.up = false
}

var MouseStore = assign({}, EventEmitter.prototype, {
    getMouse: function () {
        return mouse
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action
        var payload = action.payload

        switch (action.actionType) {
            case MouseConstants.MOUSE_MOVE:
                mouseMove(payload.event.clientX, payload.event.clientY)
                break
            case MouseConstants.MOUSE_UP:
                mouseUp()
                break
            case MouseConstants.MOUSE_DOWN:
                mouseDown()
                break
                break
            default:
                return true
        }

        MouseStore.emitChange()

        return true
    }),

    emitChange: function () {
        this.emit('change')
    },

    addChangeListener: function (callback) {
        this.on('change', callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback)
    }
})

module.exports = MouseStore