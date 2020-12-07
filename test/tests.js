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
});
