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

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render(el = document.querySelector('#gridEl')) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                const block = this.grid[x][y];

                const id = `block_${x}x${y}`;
                const blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                if (block) {
                    blockEl.style.background = block.colour;
                    blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                } else {
                    blockEl.style.background = 'gray';
                }

                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    blockClicked(e, block) {
        const sameColour = [];
        this.findSameColourElements(block, block.colour, sameColour);

        sameColour.forEach(element => {
            this.grid[element.x][element.y] = null;
        });

        const cols = new Set(sameColour.map(block => block.x));

        for (const col of cols) {
            for (let y = 0; y < MAX_Y; y++) {
                if (this.grid[col][y] === null) {
                    for (let y2 = y + 1; y2 < MAX_Y; y2++) {
                        if (this.grid[col][y2]) {
                            this.grid[col][y] = this.grid[col][y2];
                            this.grid[col][y2] = null;
                            this.grid[col][y].y = y;
                            break;
                        }
                    }
                }
            }
        }
        this.render();
    }

    findSameColourElements(block, colourToRemove, sameColour) {
        if (block !== null && block.colour == colourToRemove && sameColour.indexOf(block) < 0) {
            sameColour.push(block);

            if (block.x != MAX_X - 1) {
                this.findSameColourElements(this.grid[block.x + 1][block.y], colourToRemove, sameColour)
            }
            if (block.x != 0) {
                this.findSameColourElements(this.grid[block.x - 1][block.y], colourToRemove, sameColour)
            }
            if (block.y != MAX_Y - 1) {
                this.findSameColourElements(this.grid[block.x][block.y + 1], colourToRemove, sameColour)
            }
            if (block.y != 0) {
                this.findSameColourElements(this.grid[block.x][block.y - 1], colourToRemove, sameColour)
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());