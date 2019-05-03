import {COLOURS} from "./constants/colours";

export class Block {
    constructor(x, y, columnEl) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        this.columnEl = columnEl;
    }

    render(blockClicked) {
        const id = `block_${this.x}x${this.y}`;
        const blockEl = document.createElement('div');
        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = this.colour;
        blockEl.addEventListener('click', (evt) => blockClicked(evt, this));
        this.columnEl.appendChild(blockEl);
    }
}
