/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    const outerX = (windowWidth / 2) - random(100, 300);
    const outerY = (windowHeight / 2) - random(100, 300);
    const outerWidth = (windowHeight / 2) + random(50, 200);
    // const outerWidth = random(100, 400);
    const outerHeight = (windowHeight / 2) + random(50, 200);
    // const outerHeight = random(100, 400);

    // drawSun();
    drawBackground(outerX, outerY, outerWidth, outerHeight);

    for (var i = 0; i < 3; i++) {
        let cloudY = random(outerY, outerY + outerHeight);

        new Cloud(
            outerX + random(0, 200),
            (outerX + outerWidth) - random(0, 200),
            cloudY,
            cloudY,
            10,
            0.2
        ).render();
    }
    
    // new Cloud(400, 1000, 500, 500, 20, 0.3).render();
    // new Cloud(100, 1300, 450, 500, 30, 0.5).render();
    // new Cloud(800, 1300, 1000, 1000, 10, 0.1).render();
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

    // for (var i = outerX; i < (outerX + outerWidth) + 200; i+=2) {
    //     strokeWeight(random(1, 3));
    //     stroke(255);
    //     let randomMax = 100;

    //     line(
    //         i + random(-randomMax, randomMax),
    //         outerY + random(-randomMax, randomMax),
    //         outerX + random(-randomMax, randomMax),
    //         i + random(-randomMax, randomMax)
    //     );
    // }

}

class Cloud {
    #xStart;
    #xEnd;
    #yStart;
    #yEnd;
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
        this.#pivotSteps = pivotSteps;
        this.#pivotExtreme = pivotExtreme > 1 ? 1 : pivotExtreme;
        this.#pivotPointCoords = [];
        this.#centerPointCoords = [];
    }

    render() {
        this.buildCloudFrame();
        this.drawBaseLayer();
        // this.decorateSegment(...[windowWidth / 2, windowHeight / 2], ...[windowWidth / 2 + 200, windowHeight / 2]);
    }

    drawBaseLayer() {
        const steps = random(1, 3);

        this.#pivotPointCoords.forEach((point, i) => {
            // noFill();
            // fill(random(250, 255));
            // stroke(random(0, 20));
            // strokeWeight(random(0.2, 1));

            let nextPoint = this.#pivotPointCoords[i + 1];

            if (nextPoint) {
                // const arcWidth = Math.ceil(dist(...point, ...nextPoint) / steps);

                // const stepX = (nextPoint[0] - point[0]) / steps;
                // const stepY = (nextPoint[1] - point[1]) / steps;

                let startX = point[0];
                let startY = point[1];

                // let prevRadian = PI;
                // let nextRadian = this.calculateRadians(point[0], point[1], nextPoint[0], nextPoint[1]);
                
                this.decorateSegment(startX, startY, nextPoint[0], nextPoint[1]);
                this.decorateSegment(startX + random(-20, 20), startY + random(-20, 20), nextPoint[0] + random(-20, 20), nextPoint[1] + random(-20, 20));
                
                // for (let i = 0; i < steps; i++) {
                //     const arcCenterX = startX + (stepX / 2);
                //     const arcCenterY = startY + (stepY / 2);

                //     // curve(
                //     //     startX,
                //     //     startY,
                //     //     startX + random(10, 50),
                //     //     startY - random(10, 50),
                //     //     (startX + stepX) - random(10, 50),
                //     //     (startY + stepY) - random(10, 50),
                //     //     startX + stepX,
                //     //     startY + stepY,
                //     // );

                //     // circle(arcCenterX, arcCenterY, arcWidth);

                //     // main arc
                //     arc(arcCenterX, arcCenterY, arcWidth, arcWidth, nextRadian + PI, nextRadian);
                    
                //     // draw some accent arcs
                //     // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);
                //     // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);
                //     // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);

                //     startX += stepX;
                //     startY += stepY;
                // }

                // prevRadian = PI;
            }
        });
    }

    decorateSegment(x1, y1, x2, y2) {
        const bumps = random(1, 20);

        // line(x1, y1, x2, y2);

        if (random(-1, 1) < 0) {
            this.decoratePoint(x1, y1, random(1, 10));
        }

        // this.decoratePoint(x2, y2);

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
            // const controlX1 = anchorX1 + random(10, 200);
            // const controlY1 = anchorY1 + random(10, 200);
            // const controlX2 = anchorX2 + random(10, 200);
            // const controlY2 = anchorY2 + random(10, 200);

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
            // circle(pointX + random(-25, 25), pointY + random(-25, 25), random(1, 8));
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

        // circle(this.#centerPointCoords[0], this.#centerPointCoords[1], 10);

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
    }

    calculateRadians(x1, y1, x2, y2) {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.atan2(deltaY, deltaX);
    }
}

