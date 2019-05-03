import {BlockColumn} from '../app/javascript/blockColumn';
import {MAX_Y} from '../app/javascript/constants/gridSize';
import {assert} from 'chai';

let {describe, it} = window;

describe('BlockColumn', () => {
    const mockedBlockedClickedFunction = () => {
    };
    const findChildElements = (colEl) => {
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
        return {removedHeightChildrenAmount, blockChildrenAmount};
    };
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
        const column = new BlockColumn(0, colEl);
        column.render(mockedBlockedClickedFunction);
        const {blockChildrenAmount, removedHeightChildrenAmount} = findChildElements(colEl);
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

    it('should remove block from column when contains column with y coordinate', () => {
        const x = 0;
        const yCoordinates = [0, 1, 2];
        const colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = 'col_' + x;
        const column = new BlockColumn(x, colEl);
        column.render(mockedBlockedClickedFunction);
        yCoordinates.forEach((y, index) => {
            column.removeBlockFromColumn(y);
            const {blockChildrenAmount} = findChildElements(colEl);
            assert.equal(column.removedBlocks, 1 + index, 'correct removedBlocks amount returned');
            assert.equal(blockChildrenAmount, MAX_Y - 1 - index, 'correct blocks amount in document returned');
            assert.equal(column.col.length, MAX_Y - 1 - index, 'correct blocks amount in object returned');
        });
    });

    it('should not remove block from column when does not contain column with y coordinate', () => {
        const x = 0;
        const y = MAX_Y + 3;
        const colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = 'col_' + x;
        const column = new BlockColumn(x, colEl);
        column.render(mockedBlockedClickedFunction);
        column.removeBlockFromColumn(y);
        const {blockChildrenAmount} = findChildElements(colEl);
        assert.equal(column.removedBlocks, 0, 'correct removedBlocks amount returned');
        assert.equal(blockChildrenAmount, MAX_Y, 'correct blocks amount in document returned');
        assert.equal(column.col.length, MAX_Y, 'correct blocks amount in object returned');
    });

    it('should update all y coordinates', () => {
        const x = 0;
        const y = 3;
        const colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = 'col_' + x;
        const column = new BlockColumn(x, colEl);
        column.render(mockedBlockedClickedFunction);
        for (let i = 0; i < 3; i++) {
            column.removeBlockFromColumn(y);
            column.updateYCoordinates();
            const removedBlockInTheColumn = column.getBlockByY(i);
            const removedBlockInTheColumnElement = column.columnEl.querySelector(`#block_${x}x${i}`);
            assert.isNull(removedBlockInTheColumn, `block in y ${i} does not exist`);
            assert.isNull(removedBlockInTheColumnElement, `block element in y ${i} does not exist`);
        }
    });
});
