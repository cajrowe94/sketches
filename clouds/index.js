/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    new Cloud(300, 1300, 500, 500, 10, 0.2).render();
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
        this.buildCloudFrame(true);
        this.drawBaseLayer();
    }

    drawBaseLayer() {
        const steps = 5;
        let end = false;

        this.#pivotPointCoords.forEach((point, i) => {
            noFill();

            let nextPoint = this.#pivotPointCoords[i + 1];

            if (nextPoint) {
                const arcWidth = Math.ceil(dist(...point, ...nextPoint) / steps);

                const stepX = (nextPoint[0] - point[0]) / steps;
                const stepY = (nextPoint[1] - point[1]) / steps;

                let nextX = point[0];
                let nextY = point[1];

                let prevRadian = PI;
                let nextRadian = this.calculateRadians(point[0], point[1], nextPoint[0], nextPoint[1]);

                for (let i = 0; i < steps; i++) {
                    const arcCenterX = nextX + (stepX / 2);
                    const arcCenterY = nextY + (stepY / 2);

                    arc(arcCenterX, arcCenterY, arcWidth, arcWidth, nextRadian + PI, nextRadian);

                    // prevRadian = nextRadian;

                    // arc(nextX, nextY, 20, 20, random(1, PI), TWO_PI);

                    nextX += stepX;
                    nextY += stepY;
                }

                prevRadian = PI;

            }

            // if (i == this.#pivotPointCoords.length - 1) {
            //     nextPoint = false;
            // }

            

            // chunk
            // let chunkSpread = [10, 50];
            // arc(point[0], point[1], 50, 50, random(1, PI), TWO_PI);
            // arc(point[0] - random(...chunkSpread), point[1] - random(...chunkSpread), 50, 50, random(1, PI), TWO_PI);
            // arc(point[0] + random(...chunkSpread), point[1] + random(...chunkSpread), 50, 50, random(1, PI), TWO_PI);

            // sprinkles

        });
    }

    buildCloudFrame(showFrame = false) {
        const noiseLevel = 1000 * this.#pivotExtreme;
        const noiseScale = 0.02;
        const cloudWidth = this.#xEnd - this.#xStart;

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
                this.#pivotPointCoords.push([nextX, nextY]);
            }
            
            if (showFrame) {
                circle(nextX, nextY, 10);
                line(nextX, nextY, this.#xEnd, this.#yEnd);
            }
        }

        drawCloudEdge('top');
        drawCloudEdge();

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

