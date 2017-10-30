export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {
    constructor() {
        this.grid = [];
        this.toRemoveBlocks = [];
        this.processedBlocks = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render() {
        let el = document.getElementById('gridEl');

        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = 0; y < this.grid[x].length; y++) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }
        return this;
    }

    removeBlocks(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            let x = blocks[i].x;
            let y = blocks[i].y;
            let id = `block_${x}x${y}`;

            document.getElementById(id).remove();
        }

        let els = [];
        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < document.getElementById(`col_${x}`).childElementCount; y++) {
                let colour = document.getElementById(`col_${x}`).childNodes[y].style.background;
                let block = new Block(x, y);
                block.colour = colour;
                col.push(block);
                document.getElementById(`col_${x}`).children[y].id = `block_${x}x${y}`;
            }
            els.push(col);
        }

        this.grid = els;

    }

    hasBlockBeenAlreadyProcessed(block) {
        if (this.processedBlocks.includes(block)) {
            return true;
        } else {
            return false;
        }
    }

    addToRemoveBlocks(block) {
        //TODO Improve recursion!

        if (!this.hasBlockBeenAlreadyProcessed(block)) {

            this.processedBlocks.push(block);

            //Neighbours up
            let isBlockPositionedMaxToUp = block.y === this.grid[block.x].length - 1;
            if (!isBlockPositionedMaxToUp) {
                let blockOnTop = this.grid[block.x][block.y + 1];
                if (blockOnTop.colour === block.colour) {
                    if (!this.toRemoveBlocks.includes(blockOnTop)) {
                        this.toRemoveBlocks.push(blockOnTop);
                    }
                    this.addToRemoveBlocks(blockOnTop);
                }
            }

            //Neighbours left
            let isBlockPositionedMaxToLeft = block.x === 0;
            if (!isBlockPositionedMaxToLeft && this.grid[block.x - 1][block.y]) {
                let blockOnLeft = this.grid[block.x - 1][block.y];
                if (blockOnLeft.colour === block.colour) {
                    if (!this.toRemoveBlocks.includes(blockOnLeft)) {
                        this.toRemoveBlocks.push(blockOnLeft);
                    }
                    this.addToRemoveBlocks(blockOnLeft);
                }
            }

            //Neighbours right
            let isBlockPositionedMaxToRight = block.x === MAX_X - 1;
            if (!isBlockPositionedMaxToRight && this.grid[block.x + 1][block.y]) {
                let blockOnRight = this.grid[block.x + 1][block.y];
                if (blockOnRight.colour === block.colour) {
                    if (!this.toRemoveBlocks.includes(blockOnRight)) {
                        this.toRemoveBlocks.push(blockOnRight);
                    }
                    this.addToRemoveBlocks(blockOnRight);

                }
            }

            //Neighbours down
            let isBlockPositionedMaxToBottom = block.y === 0;
            if (!isBlockPositionedMaxToBottom) {
                let blockOnDown = this.grid[block.x][block.y - 1];
                if (blockOnDown.colour === block.colour) {
                    if (!this.toRemoveBlocks.includes(blockOnDown)) {
                        this.toRemoveBlocks.push(blockOnDown);
                    }
                    this.addToRemoveBlocks(blockOnDown);
                }
            }
        }

    }

    blockClicked(e, block) {
        console.log(e, block);

        this.toRemoveBlocks = [];
        this.processedBlocks = [];
        this.toRemoveBlocks.push(block);
        this.addToRemoveBlocks(block);
        this.removeBlocks(this.toRemoveBlocks);
        this.render();
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());