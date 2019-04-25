import {Block, COLOURS, BlockGridManager, BlockGrid} from '../app/javascript/grid';
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

describe('BlockGrid', () => {

    it('should generate grid properly', () => {
        const blockGrid = new BlockGrid();
        const grid = blockGrid.grid;

        assert.notEqual(grid, null, 'grid is not null');
        grid.map(col => {
            col.map(block => {
                assert.instanceOf(block, Block, 'block is of type Block');
            });
        });
    });
});

describe('BlockGridManager', () => {

    it('should throw when calling deleteGroupByBlock method with no blockGrid binded', async () => {
        const blockGridManager = new BlockGridManager(null);
        const block = new Block(0,0);

        await expect(blockGridManager.deleteGroupByBlock(block)).to.be.rejected;
    });

    it('should return proper ID when called _getBlockID method', () => {
        const blockGrid = new BlockGrid();
        const blockGridManager = new BlockGridManager(blockGrid);
        const coords = {x: 1, y: 1};
        const block = blockGrid.grid[coords.x][coords.y];

        const expectedID = `block_${coords.x}x${coords.y}`;
        assert.equal(blockGridManager._getBlockID(block), expectedID, 'getBlockID returned id as expected');
    });
});
