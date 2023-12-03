/**
 * Sandbox env
 */

let nodes = [];
let traps = [];

function setup() {
    const masterYStart = windowHeight / 2;
    // const masterYStart = 0;
    const masterYEnd = windowHeight - 50;
    // const masterYEnd = windowHeight;
    const masterXStart = Math.floor(windowWidth - 50);
    const masterXEnd = Math.floor(windowWidth - 50);

    createCanvas(windowWidth, windowHeight);
    // line(masterXStart, masterYStart, masterXEnd, masterYEnd);

    // createTraps();

    for (let i = 0; i < 25; i++) {
        let node = new Node([masterXStart, Math.floor(random(masterYStart, masterYEnd))], 'horizontal');
        nodes.push(node);
        node.draw();
    }
}

function draw() {
    let newNodes = [];

    nodes.forEach(node => {
        if (node.isDead) return;

        node.draw();

        let branch = node.getBranch();
        let attempts = 0;

        if (branch.isTrapped() || branch.isOutOfBounds()) {
            while (branch.isTrapped() || branch.isOutOfBounds()) {
                branch = node.getBranch();
                // attempts++;
            }

            // attempts = 0;
            // branch.kill();
        }

        newNodes.push(branch);
    });

    nodes = newNodes;
}

function createTraps() {
    for (let i = 0; i < 20; i++) {
        let width = Math.floor(random(75, 150));
        let trap = new Trap(Math.floor(random(0, windowWidth - (width + 50))), Math.floor(random(0, windowHeight - (width + 50))), width);
        traps.push(trap);
        trap.draw();
    }
}

class Node {
    #startPoint = [];
    #endPoint = [];
    #lineLength = Math.floor(random(5, 15));

    constructor(startPoint, orientation) {
        this.orientation = orientation;
        this.isDead = false;
        this.#startPoint = startPoint;
        this.#endPoint = this.#getEndPoint();
    }

    draw() {
        let ratio = Math.floor(windowWidth - this.#endPoint[0]);
        let color = Math.floor(255 / (windowWidth / Math.abs(ratio)) * 0.3);

        stroke(0, color, 0);
        line(this.#startPoint[0], this.#startPoint[1], this.#endPoint[0], this.#endPoint[1]);
    }

    getBranch() {
        if (this.orientation == 'vertical') {
            let xVal = this.#startPoint[0];
            let yVal = Math.floor(random(this.#startPoint[1], this.#endPoint[1]));

            return new Node([xVal, yVal], 'horizontal');
        } else {
            let yVal = this.#startPoint[1];
            let xVal = Math.floor(random(this.#startPoint[0], this.#endPoint[0]));

            return new Node([xVal, yVal], 'vertical');
        }
    }

    kill() {
        this.isDead = true;
    }

    #getEndPoint() {
        if (this.orientation == 'vertical') {
            return [this.#startPoint[0], this.#startPoint[1] + random([this.#lineLength, -this.#lineLength])];
        } else {
            return [this.#startPoint[0] + random([this.#lineLength, -this.#lineLength]), this.#startPoint[1]];
        }
    }

    isTrapped() {
        let trapped = false;

        traps.forEach(trap => {
            if (trap.insideTrap(this.#endPoint[0], this.#endPoint[1])) {
                trapped = true;
            }
        });

        return trapped;
    }

    isOutOfBounds() {
        if (this.#endPoint[0] < 0 || this.#endPoint[0] > windowWidth) {
            return true;
        } else if (this.#endPoint[1] < 0 || this.#endPoint[1] > windowHeight) {
            return true;
        }

        return false;
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

class Trap {
    #x;
    #y;
    #w;

    constructor(x, y, w) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
    }

    draw() {
        noFill();
        noStroke();
        ellipse(this.#x, this.#y, this.#w);
    }

    insideTrap(x, y) {
        let dist = Math.sqrt((this.#x - x) ** 2 + (this.#y - y) ** 2);
        return dist < Math.floor(this.#w / 2);
    }
}