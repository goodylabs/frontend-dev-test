import {Block} from './block';
const MAX_Y = 10;

export class BlockColumn {
    constructor (x) {
        this.col = [];
        this.x = x;
        this.removedBlocks = 0;
        for (let y = 0; y < MAX_Y; y++) {
            this.col.push(new Block(x, y));
        }
    }

    render (colEl, blockClicked) {
        const removedHeight = document.createElement('div');

        removedHeight.id = `removed_height_${this.x}`;
        removedHeight.className = 'col-removed-space';
        colEl.appendChild(removedHeight);
        this.col.forEach((block) => {
            block.render(colEl, blockClicked);
        })
    }

    removeBlockFromColumn (x, y) {
        let foundIndex = -1;
        this.col.forEach((block, index) => {
            if(block.y === y) {
                foundIndex = index;
            }
        });
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
}

