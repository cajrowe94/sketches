/**
 * Boilerplate
 */

function setup() {
    createCanvas(1000, 1000);

    // x1, y1 bottom
    // x2, y2 right
    // x3, y3 top
    // x4, y4 left

    // quad(x1, y1, x2, y2, x3, y3, x4, y4, [detailX], [detailY])
    let x1 = 50,
        y1 = 62,
        x2 = 86,
        y2 = 50,
        x3 = 50,
        y3 = 38,
        x4 = 14,
        y4 = 50;

    for (let index = 0; index < 10; index++) {
        // top
        quad(x1, y1, x2, y2, x3, y3, x4, y4);

        // left
        quad(x4, y4, x4, 200, x1, 200 + (y1 - y4), x1, y1);

        // right
        quad(x1, y1, x1, 200 + (y1 - y4), x2, 200, x2, y2);

        x1 += random(1, 5);
        x2 += random(1, 5);
        x3 += random(1, 5);
        x4 += random(1, 5);
        y1 += random(1, 5);
        y2 += random(1, 5);
        y3 += random(1, 5);
        y4 += random(1, 5);


    }
    
    // // top
    // quad(x1, y1, x2, y2, x3, y3, x4, y4);

    // // left
    // quad(x4, y4, x4, 200, x1, 200 + (y1 - y4), x1, y1);

    // // right
    // quad(x1, y1, x1, 200 + (y1 - y4), x2, 200, x2, y2);
}

function draw() {
    
}