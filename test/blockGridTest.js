import {assert} from 'chai';
import {BlockGrid} from "../app/javascript/grid";
import {MAX_X, MAX_Y} from "../app/javascript/constants/gridSize";
import {countChildElements} from './utils/countChildElements';
import {initializeBlockGrid} from "./utils/initializeBlockGrid";
import {Block} from "../app/javascript/block";
import {COLOURS} from "../app/javascript/constants/colours";

let {describe, it} = window;

describe('BlockGrid', () => {
    it('should be created with correctly parameters', () => {
        const gridEl = document.createElement('div');
        gridEl.id = '#gridEl';
        const grid = new BlockGrid(gridEl);
        const columnChildrenAmount = countChildElements(gridEl, 'col');
        assert.equal(grid.grid.length, MAX_X, 'grid has correct amount of columns');
        assert.equal(columnChildrenAmount, MAX_X, 'grid has correct amount of column elements');
    });

    it('should render block correctly', () => {
        const gridEl = document.createElement('div');
        gridEl.id = '#gridEl';
        const grid = new BlockGrid(gridEl);
        grid.render();
        grid.grid.forEach((column) => {
           const blockChildrenAmount = countChildElements(column.columnEl, 'block');
            assert.equal(blockChildrenAmount, MAX_Y, 'grid has correct amount of blocks');
        });
        const gridEl2 = document.createElement('div');
        gridEl2.id = '#gridEl';
        const testGrid = initializeBlockGrid(3, 3, 2, 2, gridEl2);
    });

    it('should remove single block from column', () => {
        let testCoords = [
            [1, 2],
            [4, 9],
            [0, 0]
        ];
        testCoords.forEach((testCoord) => {
            const gridEl = document.createElement('div');
            gridEl.id = 'gridEl';
            const testGrid = initializeBlockGrid(1, 1, testCoord[0], testCoord[1], gridEl);
            const block = testGrid.grid[testCoord[0]] ? testGrid.grid[testCoord[0]].getBlockByY(testCoord[1]) : null;
            if (block) {
                testGrid.blockClicked(null, block);
                const columnWithRemovedBlock = testGrid.grid[testCoord[0]];
                assert.equal(columnWithRemovedBlock.removedBlocks, 1, 'column has one removed block');
                assert.isNull(columnWithRemovedBlock.getBlockByY(testCoord[1]), 'column has no block with removed y');
            }
        });

    });
});
