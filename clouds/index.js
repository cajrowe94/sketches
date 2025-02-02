/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    const outerX = (windowWidth / 2) - random(100, 300);
    const outerY = (windowHeight / 2) - random(100, 300);
    const outerWidth = (windowHeight / 2) + random(50, 200);
    const outerHeight = (windowHeight / 2) + random(50, 200);

    // drawSunFullScreen();
    drawSunBoxed();
    // drawBackground(outerX, outerY, outerWidth, outerHeight);

    for (var i = 0; i < 3; i++) {
        let cloudY = random(outerY, outerY + outerHeight);

        new Cloud(
            outerX + random(0, 200),
            (outerX + outerWidth) - random(0, 200),
            cloudY,
            cloudY,
            10,
            0.3
        ).render();
    }
}

function drawSunBoxed() {
    const boxX = windowWidth / 4;
    const boxY = windowHeight / 4;
    const boxWidth = windowWidth / 2;
    const boxHeight = windowHeight / 2;
    
    stroke(1);
    strokeWeight(5);
    rect(
        boxX,
        boxY,
        boxWidth,
        boxHeight,
    );

    const width = random(50, 150);
    const radius = width / 2;

    const centerX = random(boxX, (boxX + boxWidth));
    const centerY = random(boxY, (boxY + boxHeight));

    // let prevCoords;

    // dark lines
    for (var i = 0; i < 2000; i++) {
        strokeWeight(random(1, 1));
        stroke(1);

        line(
            centerX,
            centerY,
            random(boxX, (boxX + boxWidth)),
            random(boxY, (boxY + boxHeight)),
        );
    }

    // light lines
    for (var i = 0; i < 1000; i++) {
        strokeWeight(random(1, 1));
        stroke(255);

        line(
            centerX,
            centerY,
            random(boxX, (boxX + boxWidth)),
            random(boxY, (boxY + boxHeight)),
        );
    }

    // circles
    for (var i = 0; i < 300; i++) {
        fill(1);
        strokeWeight(1);
        stroke(1);
        
        const randomPoint = getRandomPointOnCircle(centerX, centerY, radius);
        circle(randomPoint[0], randomPoint[1], random(10, 20));
        
        fill(random(100, 255));
        stroke(255);
        const rogueX = randomPoint[0] + random(-150, 150);
        const rogueY = randomPoint[1] + random(-150, 150);
        circle(rogueX, rogueY, random(1, 6));
    }

    fill(1);
    stroke(1);
    
    circle(
        centerX,
        centerY,
        width
    );
}

function drawSunFullScreen() {
    const width = random(50, 150);
    const radius = width / 2;

    const centerX = random(radius, (windowWidth - radius));
    const centerY = random(radius, (windowHeight - radius));

    // let prevCoords;

    // dark lines
    for (var i = 0; i < 1000; i++) {
        strokeWeight(random(1, 3));
        stroke(1);

        line(
            centerX,
            centerY,
            random(0, windowWidth),
            random(0, windowHeight),
        );
    }

    // light lines
    for (var i = 0; i < 1500; i++) {
        strokeWeight(random(1, 3));
        stroke(255);

        line(
            centerX,
            centerY,
            random(0, windowWidth),
            random(0, windowHeight),
        );
    }

    // circles
    for (var i = 0; i < 300; i++) {
        fill(1);
        strokeWeight(1);
        stroke(1);
        
        const randomPoint = getRandomPointOnCircle(centerX, centerY, radius);
        circle(randomPoint[0], randomPoint[1], random(10, 20));
        
        fill(random(100, 255));
        stroke(255);
        const rogueX = randomPoint[0] + random(-150, 150);
        const rogueY = randomPoint[1] + random(-150, 150);
        circle(rogueX, rogueY, random(1, 6));
    }

    fill(1);
    stroke(1);
    
    circle(
        centerX,
        centerY,
        width
    );
}

function getRandomPointOnCircle(centerX, centerY, radius) {
    const angle = Math.random() * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return [x, y];
}

function drawBackground(outerX, outerY, outerWidth, outerHeight) {
    stroke(1);
    strokeWeight(2);
    fill(1);
    rect(outerX, outerY, outerWidth, outerHeight);

    // diagonal
    for (var i = outerX; i < (outerX + outerWidth); i += 10) {
        strokeWeight(random(1, 3));
        stroke(random(1, 225));

        let randomMax = 100;

        line(
            i + random(-randomMax, randomMax),
            outerY + random(-randomMax, randomMax),
            outerX + random(-randomMax, randomMax),
            i + random(-randomMax, randomMax)
        );
    }

    for (var i = outerX + outerWidth; i > outerX; i -= 10) {
        strokeWeight(random(1, 3));
        stroke(random(1, 225));

        let randomMax = 100;

        line(
            i + random(-randomMax, randomMax),
            (outerY + outerHeight) + random(-randomMax, randomMax),
            (outerX + outerWidth) + random(-randomMax, randomMax),
            i + random(-randomMax, randomMax)
        );
    }

    for (var i = outerX; i < (outerX + outerWidth); i += 1) {
        strokeWeight(random(1, 3));
        stroke(255);

        let randomMax = 100;

        line(
            i + random(-randomMax, randomMax),
            outerY + random(-randomMax, randomMax),
            outerX + random(-randomMax, randomMax),
            i + random(-randomMax, randomMax)
        );
    }

    for (var i = outerX + outerWidth; i > outerX; i -= 1) {
        strokeWeight(random(1, 3));
        stroke(255);

        let randomMax = 100;

        line(
            i + random(-randomMax, randomMax),
            (outerY + outerHeight) + random(-randomMax, randomMax),
            (outerX + outerWidth) + random(-randomMax, randomMax),
            i + random(-randomMax, randomMax)
        );
    }

    // stroke(1);
    strokeWeight(2);
    fill(255);
    rect(outerX + random(50, 100), outerY + random(50, 100), outerWidth - random(50, 100), outerHeight - random(50, 100));

}

class Cloud {
    #xStart;
    #xEnd;
    #yStart;
    #yEnd;
    #yMin;
    #yMax;
    #pivotSteps;
    #pivotExtreme;
    #pivotPointCoords;
    #centerPointCoords;

    constructor(xStart, xEnd, yStart, yEnd, pivotSteps, pivotExtreme) {
        /**
         * pivotSteps (int) - how many pivot points to use, 0 = a very flat/horizontal cloud
         * pivotExtreme (float, 0 - 1.0) - how far away from the main cloud axis allowed to pivot
         */

        this.#xStart = xStart;
        this.#xEnd = xEnd;
        this.#yStart = yStart;
        this.#yEnd = yEnd;
        this.#yMin = yStart;
        this.#yMax = yStart;
        this.#pivotSteps = pivotSteps;
        this.#pivotExtreme = pivotExtreme > 1 ? 1 : pivotExtreme;
        this.#pivotPointCoords = [];
        this.#centerPointCoords = [];
    }

    render() {
        this.buildCloudFrame();
        this.drawBaseLayer();
        this.drawOuterEdge();
        // this.decorateSegment(...[windowWidth / 2, windowHeight / 2], ...[windowWidth / 2 + 200, windowHeight / 2]);
    }

    drawBaseLayer() {
        fill(255);
        stroke(255);

        for (var i = 0; i < 400; i++) {
            circle(
                random(this.#xStart, this.#xEnd),
                random(this.#yMin, this.#yMax),
                random(10, 55)
            );
        }
    }

    drawOuterEdge() {
        const steps = random(1, 3);

        this.#pivotPointCoords.forEach((point, i) => {
            let nextPoint = this.#pivotPointCoords[i + 1];

            if (nextPoint) {
                let startX = point[0];
                let startY = point[1];
                
                this.decorateSegment(startX, startY, nextPoint[0], nextPoint[1]);
                this.decorateSegment(startX + random(-20, 20), startY + random(-20, 20), nextPoint[0] + random(-20, 20), nextPoint[1] + random(-20, 20));
            }
        });
    }

    decorateSegment(x1, y1, x2, y2) {
        const bumps = random(1, 20);

        if (random(-1, 1) < 0) {
            this.decoratePoint(x1, y1, random(1, 10));
        }

        for (let i = 0; i < bumps; i++) {
            const xQuarter = (x2 - x1) / 4;
            const yQuarter = (y2 - y1) / 4;

            const anchorX1 = random(x1, x1 + xQuarter) + random(-20, 10);
            const anchorY1 = random(y1, y1 + yQuarter) + random(-10, 10);
            const anchorX2 = random(x2 - xQuarter, x2) + random(-10, 10);
            const anchorY2 = random(y2 - yQuarter, y2) + random(-10, 10);

            const controlX1 = this.#centerPointCoords[0] + random(-20, 20);
            const controlY1 = this.#centerPointCoords[1] + random(-20, 20);
            const controlX2 = this.#centerPointCoords[0] + random(-20, 20);
            const controlY2 = this.#centerPointCoords[1] + random(-20, 20);

            fill(255);
            strokeWeight(random(0, 3));
            stroke(random(1, 75));
            
            curve(
                controlX1,
                controlY1,
                anchorX1,
                anchorY1,
                anchorX2,
                anchorY2,
                controlX2,
                controlY2
            );

            strokeWeight(1);
        }
    }

    decoratePoint(pointX, pointY, passes = 5) {
        for (let i = 0; i < passes; i++) {
            strokeWeight(random(1, 2));
            stroke(random(1, 200));

            arc(
                pointX + random(-100, 100),
                pointY - random(1, 100),
                random(1, 5),
                random(1, 5),
                random(0, PI),
                random(0, PI)
            );

            strokeWeight(1);
        }
    }

    buildCloudFrame(showFrame = false) {
        const noiseLevel = 1000 * this.#pivotExtreme;
        const noiseScale = 0.02;
        const cloudWidth = this.#xEnd - this.#xStart;

        const topPivotPoints = [];
        const bottomPivotPoints = [];

        this.#centerPointCoords = [
            this.#xStart + ((this.#xEnd - this.#xStart) / 2),
            this.#yStart + ((this.#yEnd - this.#yStart) / 2),
        ];

        const drawCloudEdge = dir => {
            let nextX = this.#xStart;
            let nextY = this.#yStart;
            let xStartLoop = round(this.#xStart + (cloudWidth * random(0, 0.2)));
            const workingWidth = round(this.#xEnd - xStartLoop);

            for (let i = xStartLoop; i < this.#xEnd; i += (round(workingWidth / this.#pivotSteps))) {
                let x = i;
                let nx = noiseScale * x;
                let y;

                if (dir == 'top') {
                    y = this.#yStart - noiseLevel * noise(nx);
                } else {
                    // y = this.#yStart + noiseLevel * noise(nx)
                    y = this.#yStart + random(50, 125) * noise(nx)
                }
                
                if (showFrame) {
                    circle(nextX, nextY, 10);
                    line(nextX, nextY, x, y);
                }

                nextX = i;
                nextY = y;

                if (dir == 'top') {
                    topPivotPoints.push([nextX, nextY]);
                } else {
                    bottomPivotPoints.unshift([nextX, nextY]);
                }
            }

            if (nextY > this.#yMax) {
                this.#yMax = nextY;
            }

            if (nextY < this.#yMin) {
                this.#yMin = nextY;
            }
            
            if (showFrame) {
                circle(nextX, nextY, 10);
                line(nextX, nextY, this.#xEnd, this.#yEnd);
            }
        }

        // top
        drawCloudEdge('top');
        // add cloud start and end coords into top pivot points
        topPivotPoints.unshift([this.#xStart, this.#yStart]);
        topPivotPoints.push([this.#xEnd, this.#yEnd]);
        
        // bottom
        drawCloudEdge();
        // add cloud start into bottom pivots points
        bottomPivotPoints.push([this.#xStart, this.#yStart]);

        // combine into working pivot points for drawing
        this.#pivotPointCoords = topPivotPoints.concat(bottomPivotPoints);

        // cloud center base line
        if (showFrame) {
            line(this.#xStart, this.#yStart, this.#xEnd, this.#yEnd);
        }

        console.log('y min: ', this.#yMin);
        console.log('y max: ', this.#yMax);
    }

    calculateRadians(x1, y1, x2, y2) {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.atan2(deltaY, deltaX);
    }
}

