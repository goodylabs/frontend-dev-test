import {assert} from 'chai';
import {BlockGrid} from "../app/javascript/grid";
import {MAX_X, MAX_Y} from "../app/javascript/constants/gridSize";
import {countChildElements} from './utils/countChildElements';

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
    });
});
