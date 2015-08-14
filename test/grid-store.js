var test = require('tape')
var GridStore = require('../app/stores/grid-store')
var GridActions = require('../app/actions/grid-actions')

test('GridStore', function (t) {
    t.ok(GridStore.getGrid, 'should provide a getGrid function')
    t.end()
})

test('GridStore by default', function (t) {
    var grid = GridStore.getGrid()

    t.equal(grid.rows.length, 1, 'should return a grid with 1 row')
    t.equal(grid.rows[0].columns.length, 0, 'should not have any columns')
    t.equal(grid.resizing, null, 'should be in a non-resizing state')

    t.end()
})

test('GridActions', function (t) {
    t.ok(GridActions.addComponentToRow, 'should provide addComponentToRow')
    t.ok(GridActions.removeColumn, 'should provide removeColumn')
    t.ok(GridActions.startResize, 'should provide startResize')

    t.end()
})

test('GridAction addComponentToRow', function (t) {
    var grid = GridStore.getGrid()
    GridActions.addComponentToRow({
        row: grid.rows[0],
        tool: {
            name: 'list'
        }
    })

    t.equal(grid.rows[0].columns.length, 1, 'should create a column')
    t.equal(grid.rows[0].columns[0].components.length, 1, 'should add component')
    t.equal(grid.rows[0].columns[0].components[0].name, 'list', 'should add component with expected name')

    t.end()
})