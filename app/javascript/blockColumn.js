import {Block} from './block';
import {MAX_Y} from "./constants/gridSize";

export class BlockColumn {
    constructor(x, columnEl) {
        this.col = [];
        this.x = x;
        this.removedBlocks = 0;
        this.columnEl = columnEl;
        for (let y = 0; y < MAX_Y; y++) {
            this.col.push(new Block(x, y, this.columnEl));
        }
    }

    render(blockClicked) {
        const removedHeight = document.createElement('div');
        removedHeight.id = `removed_height_${this.x}`;
        removedHeight.className = 'col-removed-space';
        this.columnEl.appendChild(removedHeight);
        this.col.forEach((block) => {
            block.render(blockClicked);
        })
    }

    updateYCoordinates() {
        const lastIndex = MAX_Y - 1;
        const blocksAmount = this.col.length;
        for (let i = 0; i < blocksAmount; i++) {
            const block = this.col[blocksAmount - 1 - i];
            const blockElement = this.columnEl.querySelector(`#block_${block.x}x${block.y}`);
            block.y = lastIndex - i;
            blockElement.id = `block_${block.x}x${block.y}`;
        }
    }

    findBlockIndexByY(y) {
        let foundIndex = -1;
        this.col.forEach((block, index) => {
            if (block.y === y) {
                foundIndex = index;
            }
        });
        return foundIndex;
    }

    removeBlockFromColumn(y) {
        const x = this.x;
        const foundIndex = this.findBlockIndexByY(y);
        if (foundIndex > -1) {
            this.col.splice(foundIndex, 1);
            const columnElement = this.columnEl;
            const blockElement = columnElement.querySelector(`#block_${x}x${y}`);
            columnElement.removeChild(blockElement);
            this.removedBlocks++;
            const removedHeightElement = columnElement.querySelector(`#removed_height_${x}`);
            removedHeightElement.style.height = `${this.removedBlocks * 100 / MAX_Y}%`;
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

