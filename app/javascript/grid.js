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
        var xLength = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
                    
        var colourArrayBool = new Array(MAX_X);
        for(let arrayCreateIter = 0; arrayCreateIter < xLength[arrayCreateIter]; arrayCreateIter++) {
            colourArrayBool[arrayCreateIter] = new Array(xLength[arrayCreateIter]);
        }

        var colourArray2 = new Array(MAX_X);
        for(let arrayCreateIter = 0; arrayCreateIter < xLength[arrayCreateIter]; arrayCreateIter++)
            colourArray2[arrayCreateIter] = new Array(xLength[arrayCreateIter]);

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
                    var clickedBlock = document.getElementById('block_'+block.x+'x'+block.y);

                    /*console.log(this.grid[block.x][block.y]);
                    console.log(this.grid[block.x+1][block.y]);
                    console.log(this.grid[block.x-1][block.y]);
                    console.log(this.grid[block.x][block.y+1]);
                    console.log(this.grid[block.x][block.y-1]);
                    console.log(document.getElementById('block_'+block.x+'x'+block.y));
                    console.log(document.getElementById('block_'+(block.x+1)+'x'+block.y));
                    console.log(document.getElementById('block_'+(block.x-1)+'x'+block.y));
                    console.log(document.getElementById('block_'+block.x+'x'+(block.y+1)));
                    console.log(document.getElementById('block_'+block.x+'x'+(block.y-1)));*/

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < xLength[xIter]; yIter++) {
                            colourArrayBool[xIter][yIter] = false;
                        }
                    }

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < xLength[xIter]; yIter++) {
                            if(xIter != x && yIter != y) {
                                var blockIter = document.getElementById('block_'+xIter+'x'+yIter);
                                if(blockIter != null && blockIter.style.background === clickedBlock.style.background) {
                                    colourArrayBool[xIter][yIter] = true;
                                }
                            }
                        }
                    }

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < xLength[xIter]; yIter++) {
                            colourArray2[xIter][yIter] = false;
                        }
                    }

                    colourArray2[block.x][block.y] = true;

                    findTest(colourArrayBool, block.x, block.y, colourArray2, this.grid);

                    console.log(colourArray2);

                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        for(let yIter = 0; yIter < xLength[xIter]; yIter++) {
                            if(colourArray2[xIter][yIter] == true) {
                                for(let yDeleteIter1 = yIter; yDeleteIter1 < xLength[xIter]-1; yDeleteIter1++) {
                                    for(let yDeleteIter2 = yIter; yDeleteIter2 < xLength[xIter]-1; yDeleteIter2++) {
                                        let tempBlockColor = this.grid[xIter][yDeleteIter2].colour;
                                        this.grid[xIter][yDeleteIter2].colour = this.grid[xIter][yDeleteIter2+1].colour;
                                        this.grid[xIter][yDeleteIter2+1].colour = tempBlockColor;

                                        let tempColourArray2 = colourArray2[xIter][yDeleteIter2];
                                        colourArray2[xIter][yDeleteIter2] = colourArray2[xIter][yDeleteIter2+1];
                                        colourArray2[xIter][yDeleteIter2+1] = tempColourArray2;

                                        let tempDivStyle = document.getElementById('block_'+xIter+'x'+yDeleteIter2).style.background;
                                        document.getElementById('block_'+xIter+'x'+yDeleteIter2).style.background = document.getElementById('block_'+xIter+'x'+(yDeleteIter2+1)).style.background;
                                        document.getElementById('block_'+xIter+'x'+(yDeleteIter2+1)).style.background = tempDivStyle;
                                    }
                                }
                            }
                        }
                    }

                    var count = 0;
                    for(let xIter = 0; xIter < MAX_X; xIter++) {
                        count = 0;
                        for(let yIter = xLength[xIter]-1; yIter >= 0; yIter--) {
                            if(colourArray2[xIter][yIter]) {
                                this.grid[xIter][yIter] = null;
                                document.getElementById('block_'+xIter+'x'+yIter).remove();
                                count++;
                                colourArray2[xIter][yIter] = null;
                            }
                        }
                        xLength[xIter] -= count;
                    }

                    console.log(colourArray2);

                    /*console.log(this.grid[block.x][block.y]);
                    console.log(this.grid[block.x+1][block.y]);
                    console.log(this.grid[block.x-1][block.y]);
                    console.log(this.grid[block.x][block.y+1]);
                    console.log(this.grid[block.x][block.y-1]);
                    console.log(document.getElementById('block_'+block.x+'x'+block.y));
                    console.log(document.getElementById('block_'+(block.x+1)+'x'+block.y));
                    console.log(document.getElementById('block_'+(block.x-1)+'x'+block.y));
                    console.log(document.getElementById('block_'+block.x+'x'+(block.y+1)));
                    console.log(document.getElementById('block_'+block.x+'x'+(block.y-1)));
                    console.log("-------");*/
                    
                });

                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());

function findTest(colourArrayBool, x, y, colourArray2, grid) {
    if(colourArrayBool[x][y] == false) {
        return;
    }

    if(colourArrayBool[x][y] == true) {
        colourArrayBool[x][y] = false;
        colourArray2[x][y] = true;
        if((x+1) < MAX_X) {
            //console.log("x+1: " + (x+1) + " " + y);
            findTest(colourArrayBool, (x+1), y, colourArray2, grid);
        }
        if((y+1) < MAX_Y) {
            //console.log("y+1: " + x + " " + (y+1));
            findTest(colourArrayBool, x, (y+1), colourArray2, grid);
        }
        if((x-1) >= 0) {
            //console.log("x-1: " + (x-1) + " " + y);
            findTest(colourArrayBool, (x-1), y, colourArray2, grid);
        }
        if((y-1) >= 0) {
            //console.log("y-1: " + x + " " + (y-1));
            findTest(colourArrayBool, x, (y-1), colourArray2, grid);
        }
    }
}