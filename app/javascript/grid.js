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
    _removeBlock (block) {
        if (!block) return;

        const grid = this.blockGrid.grid;
        const {x,y} = block;
        const blockElemID = this._getBlockID(block);
        const blockElem = document.getElementById(blockElemID);

        if (!blockElem) return;

        blockElem.remove();
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

        this._imitateGravity();
    }
    _moveDown (block) {
        const grid = this.blockGrid.grid;
        const { x, y } = block;

        if (y === 0) return ;

        const blockElem = document.getElementById(this._getBlockID(block));
        const newId = `block_${block.x}x${block.y - 1}`;

        blockElem.id = newId;
        block.y -= 1;
        grid[x][y - 1] = block;
        grid[x][y] = null;

        if (y + 1 >= MAX_Y) return;

        const upperBlock = grid[x][y+1];
        if (upperBlock !== null && upperBlock) {
            this._moveDown(upperBlock);
        }

    }
    _imitateGravity () {
        const grid = this.blockGrid.grid;

        for (let x = MAX_X - 1; x >= 0; x--) {
            for (let y = MAX_Y - 1; y >= 0; y--) {
                const currBlock = grid[x][y];
                if (currBlock !== null) {

                    const isNullUnderneth = grid[x][y-1] === null;
                    if (isNullUnderneth && currBlock !== undefined) {
                        this._moveDown(currBlock)
                    }
                }
            }
        }
        console.log(grid);
    }
    _getBlockID (block) {
        return `block_${block.x}x${block.y}`
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
