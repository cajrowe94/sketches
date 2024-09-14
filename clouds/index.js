/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    new Cloud(300, 600, 500, 500, 5, 0.1).render();
}

class Cloud {
    #xStart;
    #xEnd;
    #yStart;
    #yEnd;
    #pivotSteps;
    #pivotExtreme;
    #cloudMidPoint;
    #cloudPeakTop;
    #cloudPeakBottom;

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
        this.#cloudMidPoint = Math.floor((xStart + xEnd) / 2);
        this.#cloudPeakTop = random(10, 200);
        this.#cloudPeakBottom = random(10, 75);
    }

    render() {
        this.drawCloudFrame();
        // this.drawBaseLayer();
    }

    drawBaseLayer() {
        for (let i = this.#xStart; i < this.#xEnd; i += 10) {
            const arcX = i;
            const arcY = this.#yStart;
            const arcBulk = random(10, 20);

            arc(arcX, arcY, arcBulk, arcBulk, PI, 0);
        }
    }

    drawCloudFrame() {
        const noiseLevel = 1000 * this.#pivotExtreme;
        const noiseScale = 0.02;
        const cloudWidth = this.#xEnd - this.#xStart;

        const drawCloudEdge = (dir) => {
            let nextX = this.#xStart;
            let nextY = this.#yStart;
            let xStartLoop = round(this.#xStart + (cloudWidth * random(0.1, 0.4)));
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
    
                circle(nextX, nextY, 10);
                line(nextX, nextY, x, y);
                
                nextX = i;
                nextY = y;
            }
    
            circle(nextX, nextY, 10);
            line(nextX, nextY, this.#xEnd, this.#yEnd);
        }

        drawCloudEdge('top');
        drawCloudEdge('bottom');

        // cloud base line
        line(this.#xStart, this.#yStart, this.#xEnd, this.#yEnd);
    }
}

