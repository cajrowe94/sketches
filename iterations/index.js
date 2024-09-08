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
    // stroke(255, 255, 255);
    // rect(x, middleY - (height + gap), x * 6, 200);

    let xStart = x + 20;
    let yStart = middleY - (height + gap) + 20;
    // let middleBoxCurve = getBezierCoordinates(xStart, yStart, 20, height - 40);
    let offset = 0;

    let x2Random = Math.floor(random(100, 150));
    let y2Random = Math.floor(random(50, 100));
    let x3Random = Math.floor(random(150, 250));
    let y3Random = Math.floor(random(10, 75));

    let z1 = Math.floor(random(0, 0));
    let z2 = Math.floor(random(0, 0));
    let z3 = Math.floor(random(0, 0));
    let z4 = Math.floor(random(0, 0));

    let r = 50,
        g = 50,
        b = 50;
    
    let linesTop = 340;
    let offsetInc = 4;

    for (let i = 0; i < linesTop; i++) {
        noFill();
        stroke(r, g, b);
        
        bezier(
            xStart + offset, // x1
            yStart, // y1
            xStart + x2Random + offset, // x2
            yStart + y2Random, // y2
            xStart - x3Random + offset, // x3
            yStart + y3Random, // y3
            xStart + offset, // x4
            yStart + height - 40, // y4
        );

        // bezier(
        //     xStart + offset, // x1
        //     yStart, // y1
        //     z1,
        //     xStart + x2Random + offset, // x2
        //     yStart + y2Random, // y2
        //     z2,
        //     xStart - x3Random + offset, // x3
        //     yStart + y3Random, // y3
        //     z3,
        //     xStart + offset, // x4
        //     yStart + height - 40, // y4
        //     z4
        // );

        offset += offsetInc;
        offsetInc += 0.001;
        // r += 255 / linesTop;
        // g += 255 / linesTop;
        // b += 255 / linesTop;
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