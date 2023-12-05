/**
 * Boilerplate
 */

function setup() {
    // let canvasWidth = windowWidth - 100;
    // let canvasHeight = windowHeight - 100;

    let canvasWidth = 800;
    let canvasHeight = windowHeight - 100;

    createCanvas(canvasWidth, canvasHeight);

    /**
     * ------------------
     * Border
     * ------------------
     */

    strokeWeight(1);
    stroke(0);
    rect(100, 150, canvasWidth - 200, canvasHeight - 300);

    /**
     * ------------------
     * Void
     * ------------------
     */

    const width = random(400, 600);
    const radius = width / 2;
    fill(0);
    stroke(0);
    rect(120, 170, canvasWidth - 240, canvasHeight - 340)
    // ellipse(random(radius, canvasWidth - radius), random(radius, canvasHeight - radius), width, width);

    /**
     * ------------------
     * Background texture
     * ------------------
     */


    /**
     * ------------------
     * Build towers
     * ------------------
     */

    let xStart = Math.floor(random(200, 250));
    let heightMax = 200;
    let heightMin = 100;
    let floor = 300;

    let rows = 45;

    for (let index = 0; index < rows; index++) {
        while (xStart <= canvasWidth - 250) {
            height = Math.floor(random(heightMin, heightMax));
            let yStart = floor - height - 50;

            new Tower(xStart, yStart, height).draw();

            xStart += Math.floor(random(50, 350));

            // if (index % 2 == 0) {
                const width = random(2, 8);
                const radius = width / 2;
                fill(yStart * 0.4);
                // noStroke();
                ellipse(xStart * 0.7, floor, width, width);
            // }
        }

        xStart = Math.floor(random(300, 350));
        floor += 15;
        heightMax -= 10;
        heightMin -= 5;
    }
}

function draw() {
    
}

class Tower {
    #topCoordinates = [];
    #leftSideCoordinates = [];
    #rightSideCoordinates = [];

    constructor(x, y, h) {
        this.topCenterX = x;
        this.topCenterY = y;
        this.height = h;
    }

    draw() {
        fill(255);
        stroke(100);
        strokeWeight(1);
        this.drawTop();
        this.drawSides();

        stroke(0);
        strokeWeight(1);
        this.drawShading();
    }

    drawTop() {
        let coordinates = [];

        let xTopBottomOffset = 20,
            xLeftRightOffset = 45,
            yTopBottomOffset = 10,
            yLeftRightOffset = 5;

        // x1, y1
        coordinates[0] = this.topCenterX + xTopBottomOffset;
        coordinates[1] = this.topCenterY + yTopBottomOffset;
        // x2, y2
        coordinates[2] = this.topCenterX + xLeftRightOffset;
        coordinates[3] = this.topCenterY - yLeftRightOffset;
        // x3, y3
        coordinates[4] = this.topCenterX - xTopBottomOffset;
        coordinates[5] = this.topCenterY - yTopBottomOffset;
        // x4, y4
        coordinates[6] = this.topCenterX - xLeftRightOffset;
        coordinates[7] = this.topCenterY + yLeftRightOffset;

        this.#topCoordinates = coordinates;

        quad(...coordinates);
    }

    drawSides() {
        let leftCoordinates = [];

        let yOffset = 5;

        // Left side

        // x1, y1
        leftCoordinates[0] = this.#topCoordinates[0];
        leftCoordinates[1] = this.#topCoordinates[1] + this.height;
        // x2, y2
        leftCoordinates[2] = this.#topCoordinates[0];
        leftCoordinates[3] = this.#topCoordinates[1];
        // x3, y3
        leftCoordinates[4] = this.#topCoordinates[6];
        leftCoordinates[5] = this.#topCoordinates[7];
        // x4, y4
        leftCoordinates[6] = this.#topCoordinates[6];
        leftCoordinates[7] = this.#topCoordinates[7] + this.height;

        this.#leftSideCoordinates = leftCoordinates;

        quad(...leftCoordinates);

        // windows
        // for (let index = 0; index < 3; index++) {
        //     let x = random(this.#leftSideCoordinates[6], this.#leftSideCoordinates[0]);
        //     let y = random(this.#leftSideCoordinates[3], this.#leftSideCoordinates[7]);
        //     rect(x, y, 10, 15);
        // }


        // Right side

        let rightCoordinates = [];

        // x1, y1
        rightCoordinates[0] = this.#topCoordinates[2];
        rightCoordinates[1] = this.#topCoordinates[3] + this.height;
        // x2, y2
        rightCoordinates[2] = this.#topCoordinates[2];
        rightCoordinates[3] = this.#topCoordinates[3];
        // x3, y3
        rightCoordinates[4] = this.#topCoordinates[0];
        rightCoordinates[5] = this.#topCoordinates[1];
        // x4, y4
        rightCoordinates[6] = this.#leftSideCoordinates[0];
        rightCoordinates[7] = this.#leftSideCoordinates[1];

        this.#rightSideCoordinates = rightCoordinates;

        quad(...rightCoordinates);
    }

    drawShading() {
        let shadeDensity = Math.abs(this.height) * 0.7;
        // on right side
        for (let index = 0; index < shadeDensity; index++) {
            let width = Math.floor(random(1, 20));
            let y1 = Math.floor(random(this.#topCoordinates[1], this.#leftSideCoordinates[1]));
            let x2 = this.#topCoordinates[0] + width;

            line(this.#topCoordinates[0], y1, x2, y1 - (width * 0.6));
        }

        // on left side
        for (let index = 0; index < shadeDensity; index++) {
            let width = Math.floor(random(1, 20));
            let y1 = Math.floor(random(this.#topCoordinates[1], this.#leftSideCoordinates[1]));
            let x2 = this.#topCoordinates[0] - width;

            line(this.#topCoordinates[0], y1, x2, y1 - (width * 0.07));
        }
    }
}