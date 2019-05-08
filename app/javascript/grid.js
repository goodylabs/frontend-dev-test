var selected = [];
function nfinder (x,y,c){
var id = "block_"+x+"x"+y;
//console.log(document.getElementById("block_"+x+"x"+y).outerHTML);
var myElem = document.getElementById(id);
if ((myElem !== null) && (myElem.style.backgroundColor == c) && ( selected.indexOf(id) == -1 )) {

console.log("Working on block_"+x+"x"+y);
selected.push(id); 

//nfinder (x-1,y+1,c) 
nfinder (x,y+1,c) //Top
//nfinder (x+1,y+1,c)

nfinder (x-1,y,c) //Left
nfinder (x+1,y,c) //Right

//nfinder (x-1,y-1,c)
nfinder (x,y-1,c) //Bottom
//nfinder (x+1,y-1,c)
}
}

function recalculate_id (){
//console.log(document.getElementById("col_0").getElementsByClassName("block").length);
var childCols = document.getElementById("gridEl").getElementsByClassName("col");
for( var j=0; j< childCols.length; j++ )
	{
	var childDivs = document.getElementById("col_"+j).getElementsByClassName("block");
	//document.getElementsByClassName("div-inner").length
	for( var i=0; i< childDivs.length; i++ )
		{
		//console.log(childDivs[i]);
		var tmp = 10-childDivs.length+i;
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
        //console.log(document.getElementById(e.target.id));
	var cut_me = e.target.id
	var x_in = parseInt (cut_me.substring(6, 7), 10);
	var y_in = parseInt (cut_me.substring(8, 9), 10);
	var c_in = document.getElementById(e.target.id).style.backgroundColor

	console.log(x_in + " " + y_in + " " + c_in);	
		
	
	selected = []; //Clear before each use
	//nfinder(block.x,block.y,block.colour);//Find and mark
	nfinder(x_in,y_in,c_in);//Find and mark
	console.log(selected.length );
	if (selected.length > 1){
	selected.forEach(function(entry) {
	document.getElementById(entry).outerHTML = ""; //Remove marked
	});
	}
	//Recalculate id
	recalculate_id();
	
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
