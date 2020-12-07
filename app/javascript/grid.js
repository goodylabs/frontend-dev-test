export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

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
        const { colour, x, y } = block
        if (!block.colour) return

        this
            .removeNearTwins(x, y, colour)
            .clearGrid()
            .fallBlocks()
            .render()
    }

    removeNearTwins(x, y, colour) {
        if (typeof x !== 'number' || typeof y !== 'number') throw new Error('First 2 arguments of removeNearTwins should be numbers')
        if (!COLOURS.includes(colour)) throw new Error(`${colour} not extists in array COLOURS`)

        if (!this.grid[x] || !this.grid[x][y] || this.grid[x][y].colour !== colour) return this

        this.grid[x][y].colour = null;
        this.removeNearTwins(x + 1, y, colour);
        this.removeNearTwins(x - 1, y, colour);
        this.removeNearTwins(x, y + 1, colour);
        this.removeNearTwins(x, y - 1, colour);

        return this
    }

    clearGrid (el = document.querySelector('#gridEl')) {
        el.innerHTML = ''
        return this
    }

    fallBlocks () {
        for (let x = 0; x < MAX_X; x++) {
            const column = this.grid[x]

            for (let y = MAX_Y - 1; y >= 0; y--) {
              let row = y

              while (column[row].colour === null && column[row + 1]) {
                column[row].colour = column[row + 1].colour
                column[row + 1].colour = null
                row++
              }
            }
        }
        
        return this
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
