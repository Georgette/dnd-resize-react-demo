var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')
var AppDispatcher = require('../dispatcher/app-dispatcher')

var _tools = [
    {"icon" : "th-list", "text": "list", "componentName":"wx-list", type: "tool"},
    {"icon" : "picture", "text": "image", type: "tool"},
    {"icon" : "map-marker", "text": "map", "componentName":"map", type: "tool"},
    {"icon" : "th-list", "text": "slider", type: "tool"},
    {"icon" : "text-width", "text": "Title", type: "tool"},
    {"icon" : "calendar", "text": "Calendar", type: "tool"}
]

var ToolStore = assign({}, EventEmitter.prototype, {
    getTools: function () {
        return _tools
    },

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

module.exports = ToolStore