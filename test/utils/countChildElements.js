export const countChildElements = (gridEl, className) => {
    let childrenAmount = 0;
    for (let i = 0; i < gridEl.children.length; i++) {
        const children = gridEl.children[i];
        if (children.className === className) {
            childrenAmount++;
        }
    }
    return childrenAmount;
};
