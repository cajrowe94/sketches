/**
 * Boilerplate
 */

function setup() {
    createCanvas(windowWidth, windowHeight);
    createMoon();
}

function createMoon() {
    let circleDiameter = 400;

    circle(
        windowWidth / 2,
        (circleDiameter / 2) + 100,
        circleDiameter
    );

    resetStroke();
}

function resetStroke() {
    strokeWeight(1);
    stroke(0);
}