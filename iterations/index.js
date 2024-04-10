/**
 * Iterations
 */

function setup() {
    createCanvas(windowWidth, windowHeight);
    generateBlocks();
}

function draw() {
    // ...
}

function generateBlocks() {
    let height = 200;
    let x = Math.floor(windowWidth / 8);
    let gap = 50;
    let middleY = (windowHeight / 2) - (height / 2);
    
    // top box
    rect(x, middleY - (height + gap), x * 6, 200);

    let xStart = x + 20;
    let yStart = middleY - (height + gap) + 20;
    // let middleBoxCurve = getBezierCoordinates(xStart, yStart, 20, height - 40);
    let offset = 0;

    let x2Random = Math.floor(random(10, 75));
    let y2Random = Math.floor(random(50, 100));
    let x3Random = Math.floor(random(10, 75));
    let y3Random = Math.floor(random(10, 75));

    for (let i = 0; i < 195; i++) {
        noFill();
        stroke(0, 0, 0);
        
        bezier(
            xStart + offset, // x1
            yStart, // y1
            xStart + x2Random + offset, // x2
            yStart + y2Random, // y2
            xStart - x3Random + offset, // x3
            yStart + y3Random, // y3
            xStart + offset, // x4
            yStart + height - 40 // y4
        );

        offset += 5;
    }

    // middle box
    rect(x, middleY, x * 6, 200);
    
    
    // bottom box
    rect(x, middleY + (height + gap), x * 6, 200);

    xStart = x;
    for (let i = 0; i < 10; i++) {

    }
}

function getBezierCoordinates(x, y, xEndOffset = 0, height = 0) {
    return [
        x,
        y,
        x + Math.floor(random(100, 200)),
        y + Math.floor(random(100, 200)),
        x + Math.floor(random(100, 500)),
        y + Math.floor(random(height, height + 50)),
        x + xEndOffset,
        y + height
    ];
}