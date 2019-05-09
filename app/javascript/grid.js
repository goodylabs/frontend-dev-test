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
            for (let y = 0; y < MAX_Y; y++) {
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

            for (var y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;

                blockEl.addEventListener('click', (evt) => {
                    let elementIdString = 'block_'+block.x+'x'+block.y;
                    let clickedBlock = document.getElementById(elementIdString);
                    
                    var colourArray = new Array(MAX_X);
                    for(let arrayCreateIter = 0; arrayCreateIter < MAX_Y; arrayCreateIter++)
                        colourArray[arrayCreateIter] = new Array(MAX_Y);

                    for(let test1 = 0; test1 < MAX_X; test1++) {
                        for(let test2 = 0; test2 < MAX_Y; test2++) {
                            colourArray[test1][test2] = false;
                        }
                    }

                    for(let test1 = 0; test1 < MAX_X; test1++) {
                        for(let test2 = MAX_Y-1; test2 >= 0; test2--) {
                            if(test1 != x && test2 != y) {
                                var elementIdStringTest = 'block_'+test1+'x'+test2;
                                var blockTest = document.getElementById(elementIdStringTest);
                                if(blockTest.style.background === clickedBlock.style.background)
                                    colourArray[test1][test2] = true;
                            }
                        }
                    }

                    var colourArray2 = new Array(MAX_X);
                    for(let arrayCreateIter = 0; arrayCreateIter < MAX_Y; arrayCreateIter++)
                        colourArray2[arrayCreateIter] = new Array(MAX_Y);

                    for(let test1 = 0; test1 < MAX_X; test1++) {
                        for(let test2 = 0; test2 < MAX_Y; test2++) {
                            colourArray2[test1][test2] = false;
                        }
                    }

                    colourArray2[block.x][block.y] = true;

                    findTest(colourArray, block.x, block.y, colourArray2);

                    for(let test1 = 0; test1 < MAX_X; test1++) {
                        for(let test2 = MAX_Y-1; test2 >= 0; test2--) {
                            if(test1 != x && test2 != y) {
                                var elementIdStringTest = 'block_'+test1+'x'+test2;
                                var blockTest = document.getElementById(elementIdStringTest);
                                if(colourArray2[test1][test2])
                                    blockTest.style.background = "white";
                            }
                        }
                    }

                    this.blockClicked(evt, block, blockEl);
                });

                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    blockClicked (evt, block, blockEl) {
        //console.log(evt, block);
        block.changeBlockColorToWhite();
        blockEl.style.background = "white";
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());

function findTest(colourArray, x, y, colourArray2) {
    if(colourArray[x][y] == false) {
        return;
    }

    if(colourArray[x][y] == true) {
        colourArray[x][y] = false;
        colourArray2[x][y] = true;
        if(x+1 < MAX_X)
            findTest(colourArray, x+1, y, colourArray2);
        if(y+1 < MAX_Y)
            findTest(colourArray, x, y+1, colourArray2);
        if(x-1 >= 0)
            findTest(colourArray, x-1, y, colourArray2);
        if(y-1 >= 0)
            findTest(colourArray, x, y-1, colourArray2);
    }
}