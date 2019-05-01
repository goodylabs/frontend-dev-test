import {BlockColumn} from "./blockColumn";

const MAX_X = 10;

export class BlockGrid {
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            this.grid.push(new BlockColumn(x));
        }

        this.blockClicked = this.blockClicked.bind(this);
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);
            const column = this.grid[x];
            column.render(colEl, this.blockClicked);
        }
    }
    blockClicked (e, block) {
        this.updateYCoordinatesInGrid();
        const blockColumn = this.grid[block.x];
        blockColumn.removeBlockFromColumn(block.x, block.y);
        this.checkNeighbourBlocks(block);
    }

    updateYCoordinatesInGrid () {
        this.grid.forEach((column) => {
            column.updateYCoordinates();
        });
    }

    checkIfBlockIsToRemove ({x, y, colour}, deltax, deltay) {
        if (x + deltax >= 0 && x + deltax <= 9 && y + deltay >= 0 && y + deltay <= 9) {
            const blockColumn = this.grid[x + deltax];
            const blockToCheck = blockColumn.getBlockByY(y + deltay);
            if (blockToCheck && blockToCheck.colour === colour) {
                blockColumn.removeBlockFromColumn(blockToCheck.x, blockToCheck.y);
                this.checkNeighbourBlocks(blockToCheck);
            }
        }
    }

    checkNeighbourBlocks (block) {
        for(let i=-1;i<2;i++) {
            switch (i) {
                case -1:
                    this.checkIfBlockIsToRemove(block, i, 0);
                    break;
                case 0:
                    this.checkIfBlockIsToRemove(block, i, -1);
                    this.checkIfBlockIsToRemove(block, i, 1);
                    break;
                case 1:
                    this.checkIfBlockIsToRemove(block, i, 0);
                    break;
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
