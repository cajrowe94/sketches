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
    
    rect(x, middleY, x * 6, 200);
    rect(x, middleY - (height + gap), x * 6, 200);
    rect(x, middleY + (height + gap), x * 6, 200);
}