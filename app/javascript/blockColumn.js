import {Block} from './block';

const MAX_Y = 10;

export class BlockColumn {
    constructor(x) {
        this.col = [];
        this.x = x;
        this.removedBlocks = 0;
        for (let y = 0; y < MAX_Y; y++) {
            this.col.push(new Block(x, y));
        }
    }

    render(colEl, blockClicked) {
        const removedHeight = document.createElement('div');
        removedHeight.id = `removed_height_${this.x}`;
        removedHeight.className = 'col-removed-space';
        colEl.appendChild(removedHeight);
        this.col.forEach((block) => {
            block.render(colEl, blockClicked);
        })
    }

    updateYCoordinates() {
        const lastIndex = MAX_Y - 1;
        const blocksAmount = this.col.length;
        for (let i = 0; i < blocksAmount; i++) {
            const block = this.col[blocksAmount - 1 - i];
            const blockElement = document.getElementById(`block_${block.x}x${block.y}`);
            block.y = lastIndex - i;
            blockElement.id = `block_${block.x}x${block.y}`;
        }
    }

    findBlockIndexByY(y) {
        let foundIndex = -1;
        this.col.forEach((block, index) => {
            if (block.y === y) {
                return index;
            }
        });
        return foundIndex;
    }

    removeBlockFromColumn(x, y) {
        const foundIndex = this.findBlockIndexByY(y);
        if (foundIndex > -1) {
            this.col.splice(foundIndex, 1);
            const columnElement = document.getElementById(`col_${x}`);
            const blockElement = document.getElementById(`block_${x}x${y}`);
            columnElement.removeChild(blockElement);
            this.removedBlocks++;
            const removedHeightElement = document.getElementById(`removed_height_${x}`);
            removedHeightElement.style.height = `${this.removedBlocks * 10}%`;
        }
    }

    getBlock(index) {
        return this.col[index] || null;
    }

    getBlockByY(y) {
        const index = this.findBlockIndexByY(y);
        return index === -1 ? null : this.col[index];
    }
}

