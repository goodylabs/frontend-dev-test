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
        let blockId = `block_${block.x}x${block.y}`;
        let blockToRemove = document.getElementById(blockId);
        blockToRemove.className = 'removetrack';
        checkBlock(block.x,block.y,block.colour);
        
        console.log(e, block);
        console.log("remove block x="+block.x+" y="+block.y);
    }
    
}

function checkCoordinates(x,x1){
    var resoult=x-x1;
    if(resoult==0||resoult==-1||resoult==1){
        return true;
    } else{
        return false;
    }
}

function checkBlock(blockx,blocky,colour){
    for (let x = 0; x < MAX_X; x++) {
        for (let y = MAX_Y-1 ; y >= 0; y--) {
            let blockIdtoCheck = `block_${x}x${y}`;
            let blockToCheck = document.getElementById(blockIdtoCheck);
            if(blockToCheck!=null){
                if(blockToCheck.style.background==colour&&checkCoordinates(blockx,x)==true&&checkCoordinates(blocky,y)==true){
                    let colour=blockToCheck.style.background;
                    blockToCheck.className = 'removetrack';
                    blockx=x;
                    blocky=y;
                }
            }
        }

    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
