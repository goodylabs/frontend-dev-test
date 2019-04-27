import {BlockGrid, BlockGridManager} from "../app/javascript/grid";

describe('BlockGrid', () => {
  let blockGrid;

  const reset = () => {
    blockGrid = new BlockGrid();
    document.body.innerHTML = '<div id="gridEl"></div>';

    blockGrid.render();
  };
  beforeEach(() => {
    reset();
  });

  it('should render properly', () => {
    const gridEl = document.querySelector('#gridEl');
    expect(gridEl.innerHTML).toEqual(expect.anything());
  });

  it('should contain blocks with proper ids', () => {
    const { grid } = blockGrid;

    grid.map(col => {
      col.map(block => {
        const { x, y } = block;
        const expectedID = `block_${x}x${y}`;

        const blockEl = document.getElementById(expectedID);
        expect(blockEl).toEqual(expect.anything());
      })
    })
  });

  it('should trigger blockClicked() method when block clicked', () => {
    const { grid } = blockGrid;
    const randomBlock = grid[0][0];

    const { x, y } = randomBlock;
    const id = `block_${x}x${y}`;
    const blockEl = document.getElementById(id);

    const clickSpy = jest.spyOn(blockGrid, 'blockClicked');
    blockEl.click();

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should remove block from DOM when clicked', () => {
    const { grid } = blockGrid;
    const block = grid[Math.round(Math.random() * (grid.length - 1))][Math.round(Math.random() * (grid[0].length - 1))];

    const { x, y } = block;
    const id = `block_${x}x${y}`;
    let firstBlockEl = document.getElementById(id);

    firstBlockEl.click();

    firstBlockEl = document.getElementById(id);
    expect(firstBlockEl).toEqual(null);
  });

  it('should have no blocks of the same colour around removed block', () => {

    const {grid} = blockGrid;
    const block = grid[Math.round(Math.random() * (grid.length - 1))][Math.round(Math.random() * (grid[0].length - 1))];

    const {x, y} = block;
    const id = `block_${x}x${y}`;
    const blockEl = document.getElementById(id);

    blockEl.click();

    const neighbours = {
      up: y === grid[0].length - 1 ? null : grid[x][y + 1],
      right: x === grid.length - 1 ? null : grid[x + 1][y],
      down: y === 0 ? null : grid[x][y - 1],
      left: x === 0 ? null : grid[x - 1][y]
    };

    const colour = block.colour;
    const areNeighboursDifferentColour =
      (!neighbours.up || neighbours.up.colour !== colour)
      && (!neighbours.down || neighbours.down.colour !== colour)
      && (!neighbours.left || neighbours.left.colour !== colour)
      && (!neighbours.right || neighbours.right.colour !== colour);

    expect(areNeighboursDifferentColour).toEqual(true);

  });

  it('should let click and remove all the blocks', () => {
    const { grid } = blockGrid;

    grid.map(col => {
      col.map(block => {
        if (!block) return;

        const { x, y } = block;
        const id = `block_${x}x${y}`;
        const blockEl = document.getElementById(id);

        blockEl.click();
      });
    });

    grid.map(col => {
      let colLengthNotNulls = 0;
      col.map(block => block !== null ? colLengthNotNulls++ : null);
      expect(colLengthNotNulls).toEqual(0);
    });
  });
});

describe('BlockGridManager', () => {
  let blockGrid;
  let blockGridManager;

  const reset = () => {
    blockGrid = new BlockGrid();
    blockGridManager = new BlockGridManager(blockGrid);
    document.body.innerHTML = '<div id="gridEl"></div>';

    blockGrid.render();
  };

  beforeEach(() => {
    reset();
  });

  it('should insert at least one null at the begging of the column after clicking a block', () => {
    const blockGridManager = new BlockGridManager(blockGrid);
    const block = blockGrid.grid[0][0];

    blockGridManager.deleteGroupByBlock(block);

    const firstColElem = blockGrid.grid[block.x][0];
    expect(firstColElem).toBeNull();
  });

  it('should execute moveDown() properly', () => {
    const { grid } = blockGrid;
    const coords = {x: 1, y: 1};
    const block = blockGrid.grid[coords.x][coords.y];

    blockGridManager._moveDown(block);
    expect(grid[coords.x][coords.y - 1]).toEqual(block);
  });
});
