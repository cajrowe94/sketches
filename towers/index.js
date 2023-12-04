/**
 * Boilerplate
 */

function setup() {
    // let canvasWidth = windowWidth - 100;
    // let canvasHeight = windowHeight - 100;

    let canvasWidth = 500;
    let canvasHeight = windowHeight - 100;

    createCanvas(canvasWidth, canvasHeight);

    let x = Math.floor(random(70, 100));
    let heightMax = 200;
    let heightMin = 100;
    let floor = 220;

    let rows = 30;

    // strokeWeight(5);
    // rect(canvasWidth * 0.25, 100, canvasWidth * 0.75, canvasHeight * 0.5);

    for (let index = 0; index < rows; index++) {
        while (x <= canvasWidth - 100) {
            height = Math.floor(random(heightMin, heightMax));
            let startY = floor - height;

            new Tower(x, startY, height).draw();

            x += Math.floor(random(70, 100));   
        }

        x = Math.floor(random(50, 300));
        floor += 15;
        heightMax -= 20;
        heightMin -= 5;
    }

    // while (floor < 1000 - floor) {
    //     height = Math.floor(random(heightMin, heightMax));
    //     let startY = floor - height + y;

    //     new Tower(x, startY, height).draw();

    //     x += Math.floor(random(70, 100));

    //     if (x >= 950) {
    //         x = Math.floor(random(70, 100));
    //         floor += 50;
    //         heightMax -= 20;
    //         heightMin -= 10;
    //     }      
    // }

    // frameRate(5);
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
        stroke(40);
        strokeWeight(3);
        this.drawTop();
        this.drawSides();

        stroke(60);
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
            let width = Math.floor(random(1, 15));
            let y1 = Math.floor(random(this.#topCoordinates[1], this.#leftSideCoordinates[1]));
            let x2 = this.#topCoordinates[0] + width;

            line(this.#topCoordinates[0], y1, x2, y1 - (width * 0.6));
        }

        // on left side
        for (let index = 0; index < shadeDensity; index++) {
            let width = Math.floor(random(1, 30));
            let y1 = Math.floor(random(this.#topCoordinates[1], this.#leftSideCoordinates[1]));
            let x2 = this.#topCoordinates[0] - width;

            line(this.#topCoordinates[0], y1, x2, y1 - (width * 0.07));
        }
    }
}