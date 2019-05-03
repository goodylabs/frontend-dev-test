import {assert} from 'chai';
import {BlockGrid} from "../app/javascript/grid";
import {MAX_X} from "../app/javascript/constants/gridSize";

let {describe, it} = window;

const countChildElements = (gridEl) => {
    let columnChildrenAmount = 0;
    for (let i = 0; i < gridEl.children.length; i++) {
        const children = gridEl.children[i];
        if (children.className === 'col') {
            columnChildrenAmount++;
        }
    }
    return columnChildrenAmount;
};

describe('BlockGrid', () => {
    it('should be created with correctly parameters', () => {
        const gridEl = document.createElement('div');
        gridEl.id = '#gridEl';
        const grid = new BlockGrid(gridEl);
        const columnChildrenAmount = countChildElements(gridEl);
        assert.equal(grid.grid.length, MAX_X, 'grid has correct amount of columns');
        assert.equal(columnChildrenAmount, MAX_X, 'grid has correct amount of column elements');
    });
});
