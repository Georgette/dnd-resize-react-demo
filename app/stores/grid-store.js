var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')
var AppDispatcher = require('../dispatcher/app-dispatcher')
var MouseStore = require('./mouse-store')
var GridConstants = require('../constants/grid-constants')
var MouseConstants = require('../constants/mouse-constants')

var minColumnWidthPct = 1
var grid = {}

function addRow () {
    var row = { columns: [] }
    grid.rows.push(row)
    return row
}

function addColumn (row) {
    var numCols = row.columns.length + 1
    var colWidthPct = (100.0 / numCols) + '%'
    var column = {
        style: { width: colWidthPct },
        components: []
    }
    row.columns.forEach(function (column) {
        column.style.width = colWidthPct
    })
    row.columns.push(column)
    if (grid.rows[grid.rows.length - 1].columns.length > 0) addRow()
    return column
}

function removeColumn (column) {
    var row = getColumnRow(column)
    row.columns.splice(row.columns.indexOf(column), 1)

    var numCols = row.columns.length
    var colWidthPct = (100.0 / numCols) + '%'
    row.columns.forEach(function (column) {
        column.style.width = colWidthPct
    })
    var emptyRow = grid.rows.filter(function (row) {
        return row.columns.length === 0
    })
    if (!emptyRow.length) return
    var emptyRowIdx = grid.rows.indexOf(emptyRow.shift())
    if (emptyRowIdx === grid.rows.length - 1) return
    grid.rows.splice(emptyRowIdx, 1)
}

function addComponent (col, component) {
    col.components.push(component)
    return component
}

function startResize (data) {
    grid.resizing = data
    grid.resizing.lastX = MouseStore.getMouse().position.x
}

function stopResize () {
    grid.resizing = null
}

function continueResize (currentX) {
    var diff = currentX - grid.resizing.lastX
    if (diff === 0) return

    var column = grid.resizing.column
    var row = getColumnRow(column)
    var columnIdx = row.columns.indexOf(column)
    var sibling = row.columns[columnIdx - 1]

    var pctChange = (diff / grid.resizing.parentWidth) * 100
    var newColumnWidth = (parseFloat(column.style.width) - pctChange)
    var newSiblingWidth = (parseFloat(sibling.style.width) + pctChange)
    if (newColumnWidth < minColumnWidthPct || newSiblingWidth < minColumnWidthPct) return
    column.style.width = newColumnWidth + '%'
    sibling.style.width = newSiblingWidth + '%'

    grid.resizing.lastX = currentX
}

function getColumnRow (column) {
    return grid.rows.filter(function (row) {
        return (row.columns.indexOf(column) !== -1)
    }).pop()
}

var GridStore = assign({}, EventEmitter.prototype, {
    init: function () {
        grid = {
            rows: [
                { columns: [] }
            ],
            resizing: null
        }
        return this
    },

    getGrid: function () {
        return grid
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action
        var payload = action.payload

        switch (action.actionType) {
            case GridConstants.ADD_COMPONENT_TO_ROW:
                var column = addColumn(payload.row)
                addComponent(column, payload.tool)
                break
            case GridConstants.REMOVE_COLUMN:
                removeColumn(payload.column)
                break
            case (GridConstants.START_RESIZE):
                startResize({
                    column: payload.column,
                    parentWidth: payload.parentWidth
                })
                break
            case (grid.resizing && MouseConstants.MOUSE_UP):
                stopResize()
                break
            case (grid.resizing && MouseConstants.MOUSE_MOVE):
                continueResize(payload.event.clientX)
                break
            default:
                return true
        }

        GridStore.emitChange()

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

module.exports = GridStore.init()