const squares = new Map();
const gridData = {};

function setup() {
    createCanvas(windowWidth, windowHeight);
    createGrid();
    build();
}

function build() {
    const iterations = 100;
    let activeIndex = Math.floor(random(1, squares.size));

    let currentIteration = 1;
    while (currentIteration < iterations) {
        adjustNeighbors(activeIndex);
        activeIndex = getClosestNeighbor(activeIndex).index;
        console.log(activeIndex);
        currentIteration++;
    }

}

function createGrid() {
    const squareWidth = 75;
    const squareHeight = 75;

    const numColumns = Math.floor((windowWidth / 2) / squareWidth);
    const numRows = Math.floor((windowHeight * 0.85) / squareHeight);
    
    const boxWidth = numColumns * squareWidth;
    const boxHeight = numRows * squareHeight;
    const boxX = (windowWidth - boxWidth) / 2;
    const boxY = (windowHeight - boxHeight) / 2;

    gridData.numColumns = numColumns;
    gridData.numRows = numRows;
    gridData.squareWidth = squareWidth;
    gridData.squareHeight = squareHeight;

    // draw a bounding box
    // stroke(1);
    // strokeWeight(1);
    // rect(
    //     boxX,
    //     boxY,
    //     boxWidth,
    //     boxHeight,
    // );

    // populate bounding box with squares
    let startX = boxX;
    let startY = boxY;

    let count = 1;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            let squareColor = color(random(0, 255), random(0, 255), random(0, 255));

            fill(squareColor);
            // stroke(255);
            strokeWeight(0);
            rect(
                startX,
                startY,
                squareWidth,
                squareHeight,
            );

            squares.set(count, {
                row: i + 1,
                column: j + 1,
                color: squareColor,
                topLeft: [startX, startY],
                topRight: [(startX + squareWidth), startY], 
                bottomLeft: [startX, (startY + squareHeight)], 
                bottomRight: [(startX + squareWidth), (startY + squareHeight)],
                sizeAdjustment: 0,
                index: count
            });

            startX += squareWidth;
            count++;
        }

        startY += squareHeight;
        startX = boxX;
    }
}

function getNeighborSaturationData(index) {
    const saturationData = {};
    const startingIndex = index;
    const startingSquare = squares.get(startingIndex);

    if (!startingSquare) return;

    const squareNeighbors = getSquareNeighbors(startingSquare, startingIndex);
    const startingSquareSaturation = saturation(startingSquare.color).toFixed(2);

    // populate a map of saturation diffs of neighbors
    const neighborSaturationDiffs = [];
    const neighborSaturationDiffMap = new Map();

    for (const [key, neighbor] of squareNeighbors) {
        if (!neighbor) continue;

        const neighborSaturation = saturation(neighbor.color).toFixed(2);
        const saturationDiff = Math.abs(startingSquareSaturation - neighborSaturation);

        neighborSaturationDiffs.push(saturationDiff);
        neighborSaturationDiffMap.set(saturationDiff, neighbor);
    }

    saturationData.diffs = neighborSaturationDiffs;
    saturationData.diffMap = neighborSaturationDiffMap;

    return saturationData;
}

function getClosestNeighbor(index) {
    const neighborSaturationData = getNeighborSaturationData(index);
    const lowestSaturationDiff = Math.min(...neighborSaturationData.diffs);
    
    return neighborSaturationData.diffMap.get(lowestSaturationDiff);
}

function adjustNeighbors(index) {
    const neighborSaturationData = getNeighborSaturationData(index);

    // get closest neighbor
    const lowestSaturationDiff = Math.min(...neighborSaturationData.diffs);
    const closestNeighbor = neighborSaturationData.diffMap.get(lowestSaturationDiff);

    // adjust size of non-close neighbors
    for (const [key, neighbor] of neighborSaturationData.diffMap) {
        const originalSquare = squares.get(neighbor.index);

        if (key !== lowestSaturationDiff) {
            
            originalSquare.sizeAdjustment -= 4;

            // cover original square
            fill(255);
            rect(
                originalSquare.topLeft[0],
                originalSquare.topLeft[1],
                gridData.squareWidth,
                gridData.squareHeight,
            );

            // refill with original color
            fill(originalSquare.color);
            rect(
                originalSquare.topLeft[0] - originalSquare.sizeAdjustment,
                originalSquare.topLeft[1] - originalSquare.sizeAdjustment,
                gridData.squareWidth - Math.abs(originalSquare.sizeAdjustment * 2),
                gridData.squareHeight - Math.abs(originalSquare.sizeAdjustment * 2)
            );
        }
    }

    // adjust size of closest neighbor
    const originalClosestSquare = squares.get(closestNeighbor.index);
    originalClosestSquare.sizeAdjustment += 4;

    // refill with original color
    fill(originalClosestSquare.color);
    rect(
        originalClosestSquare.topLeft[0] - originalClosestSquare.sizeAdjustment,
        originalClosestSquare.topLeft[1] - originalClosestSquare.sizeAdjustment,
        gridData.squareWidth + Math.abs(originalClosestSquare.sizeAdjustment * 2),
        gridData.squareHeight + Math.abs(originalClosestSquare.sizeAdjustment * 2)
    );
}



function getSquareNeighbors(square, index, prevIndex) {
    let neighbors = new Map();
    
    neighbors.set('top', squares.get(index - gridData.numColumns));
    if (
        square.row == 1 ||
        prevIndex == 'top'
    ) {
        neighbors.set('top', false);
    }

    neighbors.set('topRight', squares.get((index - gridData.numColumns) + 1));
    if (
        square.row == 1 ||
        square.column == gridData.numColumns ||
        prevIndex == 'topRight'
    ) {
        neighbors.set('topRight', false);
    }

    neighbors.set('right', squares.get(index + 1));
    if (
        square.column == gridData.numColumns ||
        prevIndex == 'right'
    ) {
        neighbors.set('right', false);
    }

    neighbors.set('bottomRight', squares.get((index + gridData.numColumns) + 1));
    if (
        square.row == gridData.numRows ||
        square.column == gridData.numColumns ||
        prevIndex == 'bottomRight'
    ) {
        neighbors.set('bottomRight', false);
    }

    neighbors.set('bottom', squares.get(index + gridData.numColumns));
    if (
        square.row == gridData.numRows ||
        prevIndex == 'bottom'
    ) {
        neighbors.set('bottom', false);
    }

    neighbors.set('bottomLeft', squares.get((index + gridData.numColumns) - 1));
    if (
        square.row == gridData.numRows ||
        square.column == 1 ||
        prevIndex == 'bottomLeft'
    ) {
        neighbors.set('bottomLeft', false);
    }

    neighbors.set('left', squares.get(index - 1));
    if (
        square.column == 1 ||
        prevIndex == 'left'
    ) {
        neighbors.set('left', false);
    }

    neighbors.set('topLeft', squares.get((index - gridData.numColumns) - 1));
    if (
        square.row == 1 ||
        square.column == 1 ||
        prevIndex == 'topLeft'
    ) {
        neighbors.set('topLeft', false);
    }

    return neighbors;
}