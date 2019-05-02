import {BlockColumn} from '../app/javascript/blockColumn';
import {MAX_Y} from '../app/javascript/constants/gridSize';
import {assert} from 'chai';

let {describe, it} = window;

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

    it('should render correct block amount correctly', () => {
        const id = 'col_0';
        const colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = id;
        const mockedBlockedClickedFunction = () => {
        };
        const column = new BlockColumn(0);
        column.render(colEl, mockedBlockedClickedFunction);
        let removedHeightChildrenAmount = 0;
        let blockChildrenAmount = 0;
        for (let i = 0; i < colEl.children.length; i++) {
            const children = colEl.children[i];
            if (children.className === 'col-removed-space') {
                removedHeightChildrenAmount++;
            } else if (children.className === 'block') {
                blockChildrenAmount++;
            }
        }
        assert.equal(blockChildrenAmount, MAX_Y, 'blocks rendered correctly');
        assert.equal(removedHeightChildrenAmount, 1, 'removed height div rendered correctly');
    });

    it('should return index of block with given y', () => {
        let testYCoords = [0, 1, 2];

        testYCoords.forEach((y) => {
            const column = new BlockColumn(0);
            const blockIndex = column.findBlockIndexByY(y);
            assert.equal(column.getBlock(blockIndex).y, y, 'correct index returned');
        });
    });

    it('should return block with given y', () => {
        let testYCoords = [0, 1, 2];

        testYCoords.forEach((y) => {
            const column = new BlockColumn(0);
            const blockIndex = column.findBlockIndexByY(y);
            const blockByY = column.getBlockByY(y);
            assert.equal(column.getBlock(blockIndex).y, blockByY.y, 'correct block returned');
        });
    });
});
