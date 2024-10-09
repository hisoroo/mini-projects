import "./styles/canvas.css";
import { randomColor, rules } from "./utils";

class Canvas {
  #canvas = document.getElementById("game-grid");
  #ctx = this.#canvas.getContext("2d");
  #cellSize = 2;

  constructor(height = 640, width = 640) {
    this.canvas = this.#canvas;
    this.ctx = this.#ctx;
    this.canvas.width = width;
    this.canvas.height = height;
    this.color = randomColor();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.#cellSize,
      y * this.#cellSize,
      this.#cellSize,
      this.#cellSize
    );
  }

  clearRect(x, y) {
    this.ctx.clearRect(
      x * this.#cellSize,
      y * this.#cellSize,
      this.#cellSize,
      this.#cellSize
    );
  }

  getCanvasSize() {
    return {
      width: this.canvas.width / this.#cellSize,
      height: this.canvas.height / this.#cellSize,
    };
  }
}

class Game {
  constructor() {
    this.canvas = new Canvas(640, 640);
    this.canvasSize = this.canvas.getCanvasSize();
    this.array = this.initializeArray();
    this.intervalId = null;
    this.startRandom();
  }

  initializeArray() {
    return Array.from({ length: this.canvasSize.height }, () =>
      Array(this.canvasSize.width).fill(0)
    );
  }

  startRandom() {
    for (let y = 0; y < this.canvasSize.height; y++) {
      for (let x = 0; x < this.canvasSize.width; x++) {
        if (Math.random() > 0.9) {
          this.array[y][x] = 1;
          this.canvas.drawRect(x, y, this.canvas.color);
        }
      }
    }

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.update(), 10);
  }

  countNeighbours(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newX = (x + i + this.canvasSize.width) % this.canvasSize.width;
        const newY = (y + j + this.canvasSize.height) % this.canvasSize.height;

        count += this.array[newY][newX];
      }
    }
    return count;
  }

  update() {
    const newArray = this.initializeArray();
    const { height, width } = this.canvasSize;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const neighbours = this.countNeighbours(x, y);
        const currentState = this.array[y][x];

        newArray[y][x] = currentState
          ? rules.conaways.alive(neighbours)
            ? 1
            : 0
          : rules.conaways.dead(neighbours)
          ? 1
          : 0;

        if (newArray[y][x] === 1) {
          this.canvas.drawRect(x, y, this.canvas.color);
        } else {
          this.canvas.clearRect(x, y);
        }
      }
    }

    this.array = newArray;
  }
}

class Cell {
  static q = 100; // 2-255
  static k1 = 2; // 1-8
  static k2 = 3; // 1-8
  static g = 35; // 0-100

  constructor() {
    this.state = Math.floor(Math.random() * Cell.q) + 1;
  }
}

class BelousovZhabotinsky extends Game {
  constructor() {
    super();
    this.array = this.initializeArray();
    this.colors = this.generateColorPalette(12); // Generowanie palety kolorów
    this.startRandom();
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.update(), 12);
  }

  initializeArray() {
    const { height, width } = this.canvasSize;
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => new Cell())
    );
  }

  generateColorPalette(n) {
    if (n <= 0 || n >= Cell.q - 1) {
      throw new Error("Invalid value for n");
    }

    const colors = [];
    for (let i = 0; i < n; i++) {
      colors.push(randomColor());
    }
    return colors;
  }

  getColorForState(state) {
    if (state === 1) {
      return "white";
    } else if (state === Cell.q) {
      return "black";
    } else if (state > 1 && state < Cell.q) {
      const index = Math.floor((state - 2) * (this.colors.length / (Cell.q - 2)));
      return this.colors[index];
    } else {
      return "white";
    }
  }

  countNeighbours(x, y) {
    let countA = 0;
    let countB = 0;
    let sum = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newX = x + i;
        const newY = y + j;

        if (
          newX >= 0 &&
          newX < this.canvasSize.width &&
          newY >= 0 &&
          newY < this.canvasSize.height
        ) {
          const neighbourState = this.array[newY][newX].state;
          sum += neighbourState;
          if (neighbourState === Cell.q) {
            countB++;
          } else if (neighbourState > 1 && neighbourState < Cell.q) {
            countA++;
          }
        }
      }
    }
    return { countA, countB, sum };
  }

  update() {
    const newArray = this.initializeArray();
    const { height, width } = this.canvasSize;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const neighbours = this.countNeighbours(x, y);
        const currentState = this.array[y][x].state;

        if (currentState === Cell.q) {
          newArray[y][x].state = 1;
        } else if (currentState === 1) {
          const temp =
            Math.floor(neighbours.countA / Cell.k1) +
            Math.floor(neighbours.countB / Cell.k2) +
            1;
          newArray[y][x].state = temp <= Cell.q ? temp : Cell.q;
        } else if (currentState > 1 && currentState < Cell.q) {
          const temp =
            Math.floor(
              (currentState + neighbours.sum) / (9 - neighbours.countB)
            ) + Cell.g;
          newArray[y][x].state = temp <= Cell.q ? temp : Cell.q;
        }

        const color = this.getColorForState(newArray[y][x].state);
        this.canvas.drawRect(x, y, color);
      }
    }

    this.array = newArray;
  }
}

 new Game();
//new BelousovZhabotinsky();