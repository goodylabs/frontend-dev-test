import {assert} from 'chai';
import {BlockGrid} from "../app/javascript/grid";
import {MAX_X, MAX_Y} from "../app/javascript/constants/gridSize";
import {countChildElements} from './utils/countChildElements';
import {initializeBlockGrid} from "./utils/initializeBlockGrid";

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

    it('should render blocks correctly', () => {
        const gridEl = document.createElement('div');
        gridEl.id = '#gridEl';
        const grid = new BlockGrid(gridEl);
        grid.render();
        grid.grid.forEach((column) => {
            const blockChildrenAmount = countChildElements(column.columnEl, 'block');
            assert.equal(blockChildrenAmount, MAX_Y, 'grid has correct amount of blocks');
        });
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

    it('should remove all connected blocks from the grid', () => {
        let testParameters = [
            {
                blocksConnectedInColumn: 2,
                blocksConnectedInRow: 2,
                columnOffset: 2,
                rowOffset: 2,
            },
            {
                blocksConnectedInColumn: 1,
                blocksConnectedInRow: 3,
                columnOffset: 1,
                rowOffset: 0,
            },
            {
                blocksConnectedInColumn: 3,
                blocksConnectedInRow: 1,
                columnOffset: 0,
                rowOffset: 3,
            }
        ];
        testParameters.forEach((parameters) => {
            const gridEl = document.createElement('div');
            gridEl.id = 'gridEl';
            const testGrid = initializeBlockGrid(parameters.blocksConnectedInColumn, parameters.blocksConnectedInRow, parameters.columnOffset, parameters.rowOffset, gridEl);
            for (let i = parameters.columnOffset; i < parameters.columnOffset + parameters.blocksConnectedInRow; i++) {
                for (let j = parameters.rowOffset; j < parameters.rowOffset + parameters.blocksConnectedInColumn; j++) {
                    const copiedGrid = Object.assign({}, testGrid);
                    const block = copiedGrid.grid[i].getBlockByY(j);
                    if (block) {
                        copiedGrid.blockClicked(null, block);
                        for (let k = parameters.columnOffset; k < parameters.columnOffset + parameters.blocksConnectedInRow; k++) {
                            for (let l = parameters.rowOffset; l < parameters.rowOffset + parameters.blocksConnectedInColumn; l++) {
                                assert.equal(copiedGrid.grid[k].removedBlocks, parameters.blocksConnectedInColumn, 'column has one removed block');
                                assert.isNull(copiedGrid.grid[k].getBlockByY(l), 'column has no block with removed y');
                            }
                        }
                    }
                }
            }
        });
    });
});
