import {assert} from 'chai';
import {BlockGrid} from "../app/javascript/grid";
import {MAX_X} from "../app/javascript/constants/gridSize";
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
});
