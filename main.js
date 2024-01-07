const canvas = document.getElementById("canvas");

const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

//gradient styles

// let gradient = c.createRadialGradient(
//   canvas.width / 2,
//   canvas.height / 2,
//   10,
//   canvas.width / 2,
//   canvas.height / 2,
//   500
// );

// gradient.addColorStop("0", "#fff");
// gradient.addColorStop("0.2", "#1b998b");
// gradient.addColorStop("0.3", "green");
// gradient.addColorStop("0.9", "cyan");
// gradient.addColorStop("0.7", "yellow");
// gradient.addColorStop("0.8", "red");

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x, this.y);
    if (this.y >= this.canvasHeight && Math.random() > 0.9) {
      this.y = 0;
    } else {
      this.y += this.fontSize;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.symbols = [];
    this.fontSize = 20;
    this.columns = this.canvasWidth / this.fontSize;
    this.#init();
  }

  #init() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        i * this.fontSize,
        0,
        this.fontSize,
        this.canvasHeight
      );
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#init();
  }
}
let effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 30;
const interval = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > interval) {
    c.fillStyle = "rgba(0, 0, 0, 0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "hsl(" + Math.random() * 360 + ", 50%, 50%)";
    c.font = `${effect.fontSize}px monospace`;
    effect.symbols.forEach((symbol) => {
      symbol.draw(c);
    });
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}
animate(0);

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  effect = new Effect(canvas.width, canvas.height);
  effect.resize(canvas.width, canvas.height);
});
