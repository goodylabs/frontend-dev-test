import {COLOURS} from "./constants/colours";

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }

    render (colEl, blockClicked) {
        const id = `block_${this.x}x${this.y}`;
        const blockEl = document.createElement('div');
        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = this.colour;
        blockEl.addEventListener('click', (evt) => blockClicked(evt, this));
        colEl.appendChild(blockEl);
    }
}
