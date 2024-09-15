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
        this.buildCloudFrame(false);
        this.drawBaseLayer();
    }

    drawBaseLayer() {
        this.#pivotPointCoords.forEach(point => {
            // noFill();

            // chunk
            let chunkSpread = [10, 50];
            arc(point[0], point[1], 50, 50, random(1, PI), TWO_PI);
            arc(point[0] - random(...chunkSpread), point[1] - random(...chunkSpread), 50, 50, random(1, PI), TWO_PI);
            arc(point[0] + random(...chunkSpread), point[1] + random(...chunkSpread), 50, 50, random(1, PI), TWO_PI);

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
}

