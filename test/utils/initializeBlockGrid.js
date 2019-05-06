import {BlockGrid} from "../../app/javascript/grid";
import {COLOURS} from "../../app/javascript/constants/colours";

export const initializeBlockGrid = (blocksConnectedInColumn, blocksConnectedInRow,columnOffset, rowOffset, gridEl) => {
    if (gridEl) {
        const grid = new BlockGrid(gridEl);
        grid.render();
        grid.grid.forEach((column, columnIndex) => {
            column.col.forEach((block, blockIndex) => {
                if (columnIndex >= columnOffset && columnIndex < columnOffset + blocksConnectedInColumn && blockIndex >= rowOffset && blockIndex < rowOffset + blocksConnectedInRow) {
                    block.colour = COLOURS[0];
                }
                else {
                    block.colour = COLOURS[1];
                }
            });
        });
        return grid;
    }
};
