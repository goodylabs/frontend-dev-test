import {BlockColumn} from "./blockColumn";
import {MAX_X, MAX_Y} from "./constants/gridSize";

export class BlockGrid {
    constructor(gridEl) {
        this.grid = [];
        this.gridEl = gridEl;

        if (gridEl) {
            for (let x = 0; x < MAX_X; x++) {
                const id = 'col_' + x;
                const colEl = document.createElement('div');
                colEl.className = 'col';
                colEl.id = id;
                this.gridEl.appendChild(colEl);
                this.grid.push(new BlockColumn(x, colEl));
            }
        }

        this.blockClicked = this.blockClicked.bind(this);
    }

    render() {
        for (let x = 0; x < MAX_X; x++) {
            const column = this.grid[x];
            if (column) {
                column.render(this.blockClicked);
            }
        }
    }

    blockClicked(e, block) {
        this.updateYCoordinatesInGrid();
        const blockColumn = this.grid[block.x];
        blockColumn.removeBlockFromColumn(block.y);
        this.checkNeighbourBlocks(block);
    }

    updateYCoordinatesInGrid() {
        this.grid.forEach((column) => {
            column.updateYCoordinates();
        });
    }

    checkIfBlockIsToRemove({x, y, colour}, deltax, deltay) {
        if (x + deltax >= 0 && x + deltax <= MAX_X - 1 && y + deltay >= 0 && y + deltay <= MAX_Y - 1) {
            const blockColumn = this.grid[x + deltax];
            const blockToCheck = blockColumn.getBlockByY(y + deltay);
            if (blockToCheck && blockToCheck.colour === colour) {
                blockColumn.removeBlockFromColumn(blockToCheck.y);
                this.checkNeighbourBlocks(blockToCheck);
            }
        }
    }

    checkNeighbourBlocks(block) {
        for (let i = -1; i < 2; i++) {
            if (i === 0) {
                this.checkIfBlockIsToRemove(block, i, -1);
                this.checkIfBlockIsToRemove(block, i, 1);
            } else {
                this.checkIfBlockIsToRemove(block, i, 0);
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid(document.querySelector('#gridEl')).render());
