export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class BlockGridManager {
    constructor (blockGrid) {
        this.blockGrid = blockGrid;
    }
    deleteGroupByBlock (block) {
        const blockGrid = this.blockGrid;
        if (!blockGrid) throw 'BlockGrid not binded!!!';

        this._removeBlock(block);
    }
    _getBlockID (block) {
        return `block_${block.x}x${block.y}`
    }
    _removeBlock (block) {
        const {x,y} = block;
        const blockElemID = this._getBlockID(block);
        const grid = this.blockGrid.grid;

        document.getElementById(blockElemID).remove();
        this.blockGrid.grid[x][y] = null;

        const neighbours = {
            up: y === MAX_Y - 1 ? null : grid[x][y+1],
            right: x === MAX_X - 1 ? null : grid[x+1][y],
            down: y === 0 ? null : grid[x][y-1],
            left: x === 0 ? null : grid[x-1][y]
        };
        if (neighbours.up !== null && neighbours.up.colour === block.colour) {
            this._removeBlock(neighbours.up)
        }
        if (neighbours.down !== null && neighbours.down.colour === block.colour) {
            this._removeBlock(neighbours.down)
        }
        if (neighbours.left !== null && neighbours.left.colour === block.colour) {
            this._removeBlock(neighbours.left)
        }
        if (neighbours.right !== null && neighbours.right.colour === block.colour) {
            this._removeBlock(neighbours.right)
        }

    }
    _moveDown (block) {
        const grid = this.blockGrid.grid;
        const {x,y} = block;

        if (y < 0) throw 'Error! Tried to move under bottom border';

        grid[x][y] = null;
        block.y -= 1;
        grid[x][y - 1] = block;

        let i = y + 1;
        while (i < MAX_Y - 1) {
            const upperBlock = grid[x][i];
            upperBlock.y -= 1;
            grid[x][i - 1] = upperBlock;
            grid[x][i] = null;
            i++;
        }
    }

}

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
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

    blockClicked (e, block) {
        console.log(e, block);
        const blockGridManager = new BlockGridManager(this);
        blockGridManager.deleteGroupByBlock(block);
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
