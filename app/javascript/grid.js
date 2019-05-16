let selected = [];
function nfinder(x,y,c) //Finds connected elements vith use of recursion
	{
	const id = "block_"+x+"x"+y;
	const myElem = document.getElementById(id);
	if ((myElem !== null) && (myElem.style.backgroundColor == c) && (selected.indexOf(id) == -1))
		{
		selected.push(id); //Add to list

		nfinder(x,y+1,c); //Run for Top
		nfinder(x-1,y,c); //Run for Left
		nfinder(x+1,y,c); //Run for Right
		nfinder(x,y-1,c); //Run for Bottom
		}
	}

function recalculate_id() //Recalculate indexes to compensate for movement of blocks
	{
	const childCols = document.getElementById("gridEl").getElementsByClassName("col");
	for( let j=0 ; j<childCols.length ; j++ )
		{
		const childDivs = document.getElementById("col_"+j).getElementsByClassName("block");
		for( let i=0 ; i<childDivs.length ; i++ )
			{
			const tmp = 10-childDivs.length+i;
			childDivs[i].id = "block_"+j+"x"+ tmp;
			}
		}
	}



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
        
	const cut_me = e.target.id
	const x_in = parseInt (cut_me.substring(6, 7), 10);//Get x parameter
	const y_in = parseInt (cut_me.substring(8, 9), 10);//Get y parameter
	const c_in = document.getElementById(e.target.id).style.backgroundColor//Get colour parameter

	selected = []; //Clear before each use
	nfinder(x_in,y_in,c_in);//Find and mark
	if (selected.length > 1)//If any marked remove
		{
		selected.forEach(function(entry) 
			{
			document.getElementById(entry).outerHTML = ""; //Remove marked
			});
		recalculate_id();//Recalculate id
		}
	
	
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
