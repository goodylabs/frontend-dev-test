import { BlockColumn } from '../app/javascript/blockColumn';
import { MAX_Y } from '../app/javascript/constants/gridSize';
import { assert } from 'chai';

let { describe, it } = window;

describe('BlockColumn', () => {

    it('should be created with correctly parameters', () => {
        let testXCoords = [0, 1, 2];

        testXCoords.forEach((x) => {
            const column = new BlockColumn(x);
            assert.equal(column.col.length, MAX_Y, 'column has proper amount of blocks');
            assert.equal(column.removedBlocks, 0, 'column has been initialized with no removed blocks');
            assert.equal(column.x, x, 'column has been initialized with proper x coordinate');
        });
    });
});
