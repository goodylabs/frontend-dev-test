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
        const blockColumn = this.grid[block.x];
        blockColumn.removeBlockFromColumn(block.x, block.y);
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
