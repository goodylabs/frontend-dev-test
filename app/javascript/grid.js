import {BlockColumn} from "./blockColumn";

const MAX_X = 10;

export class BlockGrid {
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            this.grid.push(new BlockColumn(x));
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
            const column = this.grid[x];
            column.render(colEl, this.blockClicked);
        }

        return this;
    }
    blockClicked (e, block) {
        console.log(e, block);
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
