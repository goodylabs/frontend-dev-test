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
                // blockEl.textContent = y + x * MAX_X;
            }
        }

        return this;
    }

    blockClicked (e, block) {
    //console.log(e, block);
    // multi array
    //console.log(this.grid);

    document.querySelector("#gridEl").innerHTML = "";
    
        const clickedBlockColor = block.colour;
        // for simple ONE block
        const gray = "gray";
        this.grid[block.x][block.y].colour = gray;
    
        let success;
        const nearestBlocks = [];
        const grid = this.grid;
        if (clickedBlockColor != gray) {
          do {
            success = false;
            if (
              block.y + 1 < MAX_Y &&
              grid[block.x][block.y + 1].colour == clickedBlockColor
            ) {
              grid[block.x][block.y + 1].colour = gray;
              nearestBlocks.push({ x: block.x, y: block.y + 1 });
              success = true;
            }
            if (
              block.y - 1 >= 0 &&
              grid[block.x][block.y - 1].colour == clickedBlockColor
            ) {
              grid[block.x][block.y - 1].colour = gray;
              nearestBlocks.push({ x: block.x, y: block.y - 1 });
              success = true;
            }
            if (
              block.x + 1 < MAX_X &&
              grid[block.x + 1][block.y].colour == clickedBlockColor
            ) {
              grid[block.x + 1][block.y].colour = gray;
              nearestBlocks.push({ x: block.x + 1, y: block.y });
              success = true;
            }
            if (
              block.x - 1 >= 0 &&
              grid[block.x - 1][block.y].colour == clickedBlockColor
            ) {
              grid[block.x - 1][block.y].colour = gray;
              nearestBlocks.push({ x: block.x - 1, y: block.y });
              success = true;
            }
            nearestBlocks.forEach(nearestBlock => {
              if (
                nearestBlock.y + 1 < MAX_Y &&
                grid[nearestBlock.x][nearestBlock.y + 1].colour == clickedBlockColor
              ) {
                grid[nearestBlock.x][nearestBlock.y + 1].colour = gray;
                nearestBlocks.push({ x: nearestBlock.x, y: nearestBlock.y + 1 });
                success = true;
              }
              if (
                nearestBlock.y - 1 >= 0 &&
                grid[nearestBlock.x][nearestBlock.y - 1].colour == clickedBlockColor
              ) {
                grid[nearestBlock.x][nearestBlock.y - 1].colour = gray;
                nearestBlocks.push({ x: nearestBlock.x, y: nearestBlock.y - 1 });
                success = true;
              }
              if (
                nearestBlock.x + 1 < MAX_X &&
                grid[nearestBlock.x + 1][nearestBlock.y].colour == clickedBlockColor
              ) {
                grid[nearestBlock.x + 1][nearestBlock.y].colour = gray;
                nearestBlocks.push({ x: nearestBlock.x + 1, y: nearestBlock.y });
                success = true;
              }
              if (
                nearestBlock.x - 1 >= 0 &&
                grid[nearestBlock.x - 1][nearestBlock.y].colour == clickedBlockColor
              ) {
                grid[nearestBlock.x - 1][nearestBlock.y].colour = gray;
                nearestBlocks.push({ x: nearestBlock.x - 1, y: nearestBlock.y });
                success = true;
              }
            });
          } while (success == true);
        }

        const newGrid = [];
       
        for (let x = 0; x < MAX_X; x++) {
          newGrid[x] = [];
          for (let y = 0; y < MAX_Y; y++) {
            if (grid[x][y].colour != gray) {
              newGrid[x].push({
                colour: grid[x][y].colour, 
                x: x,
                y: newGrid[x].length
              });
            }
          }
          for (let j = newGrid[x].length; j < MAX_Y; j++) {
            newGrid[x].push({
              colour: gray,
              x: x,
              y: j
            });
          }
        }
        console.log(newGrid);
        this.grid = newGrid;
        this.render();
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
