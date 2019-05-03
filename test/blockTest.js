import {Block} from '../app/javascript/block';
import {COLOURS} from '../app/javascript/constants/colours';
import {assert} from 'chai';

let {describe, it} = window;

describe('Block', () => {
    const mockedBlockedClickedFunction = () => {
    };
    it('should be created with correctly parameters', () => {
        let testCoords = [
            [1, 2],
            [4, 9],
            [0, 0]
        ];

        testCoords.forEach((testCoord) => {
            let block = new Block(...testCoord);
            assert.equal(block.x, testCoord[0], 'x is set correctly');
            assert.equal(block.y, testCoord[1], 'y is set correctly');
            assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
        });
    });

    it('should render block correctly', () => {
        const id = 'col_0';
        const colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = id;
        const block1 = new Block(0, 0, colEl);
        const block2 = new Block(0, 1, colEl);
        const block3 = new Block(0, 2, colEl);
        const blocksArrays = [[block1], [block1, block2], [block1, block2, block3]];
        blocksArrays.forEach((blockArray) => {
            while (colEl.firstChild) {
                colEl.removeChild(colEl.firstChild);
            }
            blockArray.forEach((block) => {
                block.render(mockedBlockedClickedFunction);
            });
            assert.equal(colEl.children.length, blockArray.length, 'block rendered correctly');
        });

    })

});
