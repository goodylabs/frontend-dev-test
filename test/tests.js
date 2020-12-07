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
        const blockGrid = new BlockGrid()
        blockGrid.render()
        const { grid } = blockGrid

        const gridEl = document.querySelector('#gridEl')

        grid.map((column, x) => {
            column.map(({ colour }, y) => {
                assert.equal(
                    gridEl.querySelector(`#block_${x}x${y}`).style.background,
                    colour,
                    `Block #block_${x}x${y} has wrong colour`
                )
                assert.include(COLOURS, colour, `Block [${x}][${y}] has wrong colour`)
            })
        })
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

    it(' should clearGrid', () => {
        new BlockGrid().render().clearGrid()
        const gridEl = document.querySelector('#gridEl')

        assert.equal(gridEl.innerHTML, '')
    })

    it(' should fallBlocks', () => {
        const coords = [
            {x: 0, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
        ]
        const blockGrid = new BlockGrid()

        const expectedBlocks = coords.reduce((total, { x, y }) => [...total, {x, y, colour: blockGrid.grid[x][y+coords.length].colour}])

        coords.map(({x, y}) => blockGrid.grid[x][y].colour = 'red')

        blockGrid.removeNearTwins(0, 1, 'red').clearGrid().fallBlocks()

        coords.map(({x}) => {
            for (let l = 9; l > 6; l--) {
                assert.equal(blockGrid.grid[x][l].colour, null, `Colour of [${x}][${l}] is not null`)
            }
        })

        expectedBlocks.map(({ x, y, colour }) => assert.equal(
            blockGrid.grid[x][y].colour, 
            colour,
            `Block {${x}, ${y}, ${colour}}} not exists in grid`),
        )
    })

    it(' should react on blockClicked', () => {
        const blockGrid = new BlockGrid()
        const block = blockGrid.grid[0][0]
        block.colour = 'red'
        blockGrid.render()
        blockGrid.blockClicked(null, block)

        expect(
            blockGrid
                .removeNearTwins(0, 0, 'red')
                .clearGrid()
                .fallBlocks()
                .render()
        ).to.have.been.called
    })
});
