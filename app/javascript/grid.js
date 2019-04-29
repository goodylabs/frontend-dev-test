import {Block} from './block';
import {BlockColumn} from "./blockColumn";

const MAX_X = 10;
const MAX_Y = 10;

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

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x].getBlock(y);
                block.render(colEl, this.blockClicked);
            }
        }

        return this;
    }
    blockClicked (e, block) {
        console.log(e, block);
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
