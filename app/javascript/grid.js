export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
    
    changeBlockColorToWhite() {
        this.colour = "white";
    }

    setCoulour(colour) {
        this.colour = colour;
    }
}

export class BlockGrid {
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y <= MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (var x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (var y = 0; y < MAX_Y; y++) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;

                blockEl.addEventListener('click', (evt) => {
                    let clickedBlock = document.getElementById('block_'+block.x+'x'+block.y);
                    
                    var colourArrayBool = new Array(MAX_X);
                    for(let arrayCreateIter = 0; arrayCreateIter < MAX_Y; arrayCreateIter++) {
                        colourArrayBool[arrayCreateIter] = new Array(MAX_Y);
                    }

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < MAX_Y; yIter++) {
                            colourArrayBool[xIter][yIter] = false;
                        }
                    }

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < MAX_Y; yIter++) {
                            if(xIter != x && yIter != y) {
                                var blockIter = document.getElementById('block_'+xIter+'x'+yIter);
                                if(blockIter != null && blockIter.style.background === clickedBlock.style.background) {
                                    colourArrayBool[xIter][yIter] = true;
                                }
                            }
                        }
                    }

                    var colourArray2 = new Array(MAX_X);
                    for(let arrayCreateIter = 0; arrayCreateIter < MAX_Y; arrayCreateIter++)
                        colourArray2[arrayCreateIter] = new Array(MAX_Y);

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < MAX_Y; yIter++) {
                            colourArray2[xIter][yIter] = false;
                        }
                    }

                    colourArray2[block.x][block.y] = true;

                    findTest(colourArrayBool, block.x, block.y, colourArray2, this.grid);
                    console.log(this.grid[block.x][block.y]);
                    console.log(document.getElementById('block_'+block.x+'x'+block.y));

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < MAX_Y; yIter++) {
                            if(this.grid[xIter][yIter] != null && xIter != x && yIter != y && colourArray2[xIter][yIter] && yIter+1 < MAX_Y) {
                                this.grid[xIter][yIter] = this.grid[xIter][yIter+1];
                                this.grid[xIter][yIter].y -= 1;
                                document.getElementById('block_'+xIter+'x'+(yIter+1)).id = 'block_'+xIter+'x'+yIter;
                                this.grid[xIter][yIter+1] = null;
                                if(document.getElementById('block_'+xIter+'x'+yIter) != null) {
                                    document.getElementById('block_'+xIter+'x'+yIter).remove();

                                }
                            }
                        }
                    }

                    //for(let xIter = 0; xIter < MAX_X; xIter++) {
                        //for(let yIter = 0; yIter < MAX_Y; yIter++) {
                            //if(this.grid[xIter][yIter] == null) {
                                //let blockIter = document.getElementById('block_'+xIter+'x'+yIter);
                                    console.log(this.grid[block.x][block.y]);
                                    console.log(document.getElementById('block_'+block.x+'x'+block.y));
                            //}
                        //}
                    //}
                });

                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());

function findTest(colourArrayBool, x, y, colourArray2, grid) {
    if(colourArrayBool[x][y] == false || grid[x][y] == null) {
        return;
    }

    if(colourArrayBool[x][y] == true || grid[x][y] == null) {
        colourArrayBool[x][y] = false;
        colourArray2[x][y] = true;
        if(x+1 < MAX_X)
            findTest(colourArrayBool, x+1, y, colourArray2, grid);
        if(y+1 < MAX_Y)
            findTest(colourArrayBool, x, y+1, colourArray2, grid);
        if(x-1 >= 0)
            findTest(colourArrayBool, x-1, y, colourArray2, grid);
        if(y-1 >= 0)
            findTest(colourArrayBool, x, y-1, colourArray2, grid);
    }
}