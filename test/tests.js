import { Block, BlockGrid, COLOURS } from '../app/javascript/grid';
import { assert, expect } from 'chai';

let { describe, it } = window;

describe('Block', () => {

    it('should be created with correctly', () => {
        let testCoords = [
            [1, 2],
            [4, 9],
            [0, 0]
        ];

        testCoords.forEach((testCoord) => {
            let block = new Block(...testCoord);
            assert.equal(block.x, testCoord[0], 'x is set correctly');
            assert.equal(block.y, testCoord[1], 'y is set correctly');
            assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
        });
    });

});


const createGridEl = () => {
    const div = document.createElement('div')
    div.setAttribute('id', 'gridEl')
    document.querySelector('body').appendChild(div)
}

describe('BlockGrid', () => {
    createGridEl()

    beforeEach(() => {
        document.querySelector('#gridEl').innerHTML = ''
    })

    it(' should contain proper amount of blocks on constructor called', () => {
        const { grid } = new BlockGrid()

        assert.equal(grid.length, 10, `Grid should contains 10 columns, but there are ${grid.length}`)

        grid.map((column, index) => assert.equal(
            column.length, 10, `Cloumns should contain 10 rows, but column ${index} contains ${column.length}`
        ))
    })

    it(' should render properly', () => {
        new BlockGrid().render()

        const { childNodes } = document.querySelector('#gridEl')
        const childNodesArray = Array.from(childNodes)

        const amount = childNodesArray.reduce((total, column) => total + column.childNodes.length, 0)
        assert.equal(amount, 100, 'There are no 100 childNodes of #gridEl')

        childNodesArray.map((column, columnIndex) =>
            {
                const cells = Array.from(column)
                cells.map((cell, cellIndex) =>
                    assert.include(COLOURS, cell.colour, `Block [${columnIndex}][${cellIndex}] has wrong colour`)
                )
            }
        )
    })

    it(' removeNearTwins should throw error on not number', () => {
        assert.throws(
            () => new BlockGrid().removeNearTwins('string', [], 'red'),
            Error,
            'First 2 arguments of removeNearTwins should be numbers'
        )
    })

    it(' removeNearTwins should throw error on wrong colour', () => {
        assert.throws(
            () => new BlockGrid().removeNearTwins(2, 2, 'pink'),
            Error,
            'pink not extists in array COLOURS'
        )
    })

    it(' should removeNearTwins', () => {
        const coords = [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
        ]
        const blockGrid = new BlockGrid()
        coords.map(([x, y]) => blockGrid.grid[x][y].colour = 'red')

        blockGrid.removeNearTwins(0, 1, 'red')
        coords.map(([x, y]) => assert.equal(blockGrid.grid[x][y].colour, null, `Block ${x, y} is not null`))
    })
});
