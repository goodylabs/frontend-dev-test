export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const TOP = 'TOP'
const BOTTOM = 'BOTTOM'

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.checkedd = false;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)]
        this.toBeRemoved = false;
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

    blockClicked(e, block) {
        console.log(`Clicked (${block.x},${block.y}), color: ${block.colour}`);
        this.checkNeighbours(block);
        console.log(`Going to  remove blocks`);
        this.removeBlocks();
        this.render();
        this.resetChecked();
    }

    resetChecked() {
        console.log(this.grid);
        this.grid.map(e => e.map(q => q.checkedd = false));
    }


    checkNeighbours(block){
        console.log(block);
        if(block.checkedd === true) {
            console.log('Block has been already checked, returning');
            return;
        }
        block.toBeRemoved = true;
        this.checkBottom(block);
        this.checkTop(block);
        this.checkLeft(block);
        this.checkRight(block);
    }

    checkNeighbour(block, dir){
        const {x , y, colour } = block;
        let tempBlock;
        switch (dir){
            case BOTTOM:
                tempBlock = this.grid[x][y-1];
                break;
            case TOP:
                tempBlock = this.grid[x][y+1];
                break;
            case LEFT:
                tempBlock = this.grid[x-1][y];
                break;
            case RIGHT:
                tempBlock = this.grid[x+1][y];
                break;
        }
        console.log(`${dir} neighbour color: ${tempBlock.colour} is ${tempBlock.colour !== block.colour ? 'NOT ' : ''}the same.` );
        block.checkedd = true;
        if (block.colour === tempBlock.colour){
            block.checkedd == true;
            this.checkNeighbours(tempBlock);
        }
        tempBlock.checkedd = true;
        return;
    }

    checkTop(block){
        console.log("Checking top", block.x, block.y);
        if (block.y+1 > MAX_Y - 1) {
            console.log('Out of range, exiting path');
            return;
        }
        this.checkNeighbour(block, TOP);
    }

    checkBottom(block){
        console.log("checking top ");
        if(block.y-1 < 0) return;
        this.checkNeighbour(block, BOTTOM);
    }

    checkLeft(block){
        console.log("checking left ");
        if(block.x-1 < 0) return;
        this.checkNeighbour(block, LEFT);
    }

    checkRight(block){
        console.log("checking right ");
        if(block.x+1 > MAX_X - 1) return;
        this.checkNeighbour(block, RIGHT);
    }

    removeBlocks(){
        for (let x = MAX_X - 1; x >= 0; x--){
            for(let y = MAX_Y - 1; y >= 0; y--){
                if (this.grid[x][y].toBeRemoved === true){
                    for(let q = y; q < MAX_Y; ++q) {
                        if(q+1 === MAX_Y) {
                            this.grid[x][q].colour = 'grey';
                            this.grid[x][q].toBeRemoved = false;
                            continue;
                        }
                        this.grid[x][q].colour = this.grid[x][q+1].colour;
                    }
                }
            }
        }
    }
}
const grid = new BlockGrid();
window.addEventListener('DOMContentLoaded', () => grid.render());