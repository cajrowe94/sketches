/**
 * Clouds
 */

function setup() {
    createCanvas(windowWidth, windowHeight);

    new Cloud(300, 600, 500, 500, 5, 0.2).render();
}

class Cloud {
    #xStart;
    #xEnd;
    #yStart;
    #yEnd;
    #pivotSteps;
    #pivotExtreme;
    #cloudMidPoint;

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
    }

    render() {
        console.log('xStart: ', this.#xStart);
        console.log('xEnd: ', this.#xEnd);
        console.log('yStart: ', this.#yStart);
        console.log('yEnd: ', this.#yEnd);
        console.log('pivotSteps: ', this.#pivotSteps);
        console.log('pivotExtreme: ', this.#pivotExtreme);
        console.log('cloudMidPoint: ', this.#cloudMidPoint);


        for (let i = this.#xStart; i < this.#xEnd; i += 10) {
            const arcX = i;
            const arcY = this.#yStart;
            const arcBulk = 10;

            arc(arcX, arcY, arcBulk, arcBulk, PI, 0);
        }



        line(this.#xStart, this.#yStart, this.#xEnd, this.#yEnd);
    }
}

