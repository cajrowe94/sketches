/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    new Cloud(150, 750, 500, 500, 10, 0.2).render();
}

class Cloud {
    #xStart;
    #xEnd;
    #yStart;
    #yEnd;
    #pivotSteps;
    #pivotExtreme;
    #pivotPointCoords;

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
    }

    render() {
        this.buildCloudFrame();
        this.drawBaseLayer();
    }

    drawBaseLayer() {
        const steps = random(1, 5);

        this.#pivotPointCoords.forEach((point, i) => {
            // noFill();
            // fill(random(250, 255));
            // stroke(random(0, 20));
            // strokeWeight(random(0.2, 1));

            let nextPoint = this.#pivotPointCoords[i + 1];

            if (nextPoint) {
                const arcWidth = Math.ceil(dist(...point, ...nextPoint) / steps);

                const stepX = (nextPoint[0] - point[0]) / steps;
                const stepY = (nextPoint[1] - point[1]) / steps;

                let startX = point[0];
                let startY = point[1];

                let prevRadian = PI;
                let nextRadian = this.calculateRadians(point[0], point[1], nextPoint[0], nextPoint[1]);

                for (let i = 0; i < steps; i++) {
                    const arcCenterX = startX + (stepX / 2);
                    const arcCenterY = startY + (stepY / 2);

                    // curve(
                    //     startX,
                    //     startY,
                    //     startX + random(10, 50),
                    //     startY - random(10, 50),
                    //     (startX + stepX) - random(10, 50),
                    //     (startY + stepY) - random(10, 50),
                    //     startX + stepX,
                    //     startY + stepY,
                    // );

                    // circle(arcCenterX, arcCenterY, arcWidth);

                    // main arc
                    arc(arcCenterX, arcCenterY, arcWidth, arcWidth, nextRadian + PI, nextRadian);
                    
                    // draw some accent arcs
                    // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);
                    // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);
                    // arc(arcCenterX, arcCenterY, arcWidth - random(5, arcWidth - 5), arcWidth - random(5, arcWidth - 5), nextRadian + PI, nextRadian);

                    startX += stepX;
                    startY += stepY;
                }

                prevRadian = PI;
            }
        });
    }

    buildCloudFrame(showFrame = false) {
        const noiseLevel = 1000 * this.#pivotExtreme;
        const noiseScale = 0.02;
        const cloudWidth = this.#xEnd - this.#xStart;

        const topPivotPoints = [];
        const bottomPivotPoints = [];

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
                    y = this.#yStart + noiseLevel * noise(nx)
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

