/**
 * Sandbox env
 */

let nodes = [];

function setup() {
    const masterYStart = windowHeight / 2 - 300;
    const masterYEnd = windowHeight / 2 + 300;
    const masterXStart = Math.floor(windowWidth / 2);
    const masterXEnd = Math.floor(windowWidth / 2);

    createCanvas(windowWidth, windowHeight);
    // line(masterXStart, masterYStart, masterXEnd, masterYEnd);

    for (let i = 0; i < 50; i++) {
        let node = new Node([masterXStart, Math.floor(random(masterYStart, masterYEnd))], 'horizontal');
        nodes.push(node);
        node.draw();
    }

    // frameRate(50);
}

function draw() {
    let newNodes = [];

    nodes.forEach(node => {
        node.draw();
        newNodes.push(node.getBranch());
    });

    nodes = newNodes;
}

class Node {
    #startPoint = [];
    #endPoint = [];
    #lineLength = Math.floor(random(5, 15));

    constructor(startPoint, orientation) {
        this.orientation = orientation;
        this.#startPoint = startPoint;
        this.#endPoint = this.#getEndPoint();
    }

    draw() {
        let ratio = Math.floor((windowWidth / 2) - this.#endPoint[0]);
        let color = Math.floor(255 / ((windowWidth / 2) / Math.abs(ratio)));
        stroke(color, color, 0);
        line(this.#startPoint[0], this.#startPoint[1], this.#endPoint[0], this.#endPoint[1]);
    }

    getBranch() {
        if (this.orientation == 'vertical') {
            return new Node([this.#startPoint[0], Math.floor(random(this.#startPoint[1], this.#endPoint[1]))], 'horizontal');
        } else {
            return new Node([Math.floor(random(this.#startPoint[0], this.#endPoint[0])), this.#startPoint[1]], 'vertical');
        }
    }

    #getEndPoint() {
        if (this.orientation == 'vertical') {
            return [this.#startPoint[0], this.#startPoint[1] + random([-this.#lineLength, this.#lineLength])];
        } else {
            return [this.#startPoint[0] + random([-this.#lineLength, this.#lineLength]), this.#startPoint[1]];
        }
    }

    get y() {
        if (this.orientation == 'horizontal') {
            return this.#startPoint[1];
        }

        return [this.#startPoint[1], this.#endPoint[1]];
    }

    get x() {
        if (this.orientation == 'vertical') {
            return this.#startPoint[0];
        }

        return [this.#startPoint[0], this.#endPoint[0]];
    }
}