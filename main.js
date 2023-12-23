const canvas = document.getElementById("natureCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw the sky
ctx.fillStyle = "#acd6ff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw clouds
ctx.fillStyle = "white";
drawCloud(100, 100, 50);
drawCloud(300, 200, 70);
drawCloud(500, 150, 60);
drawCloud(700, 300, 80);

function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.arc(x + size * 1.3, y, size * 1.3, 0, Math.PI * 2);
  ctx.arc(x + size * 2.6, y, size * 1.6, 0, Math.PI * 2);
  ctx.arc(x + size * 4, y, size * 1.3, 0, Math.PI * 2);
  ctx.arc(x + size * 5.3, y, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw grass
ctx.fillStyle = "#75c84b"; // Green color for grass
ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

// Draw raindrops falling down the canvas
const raindrops = [];

function createRaindrop() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  return {
    x,
    y,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 5 + 2,
    thickness: Math.random() * 2 + 1,
  };
}

function drawRaindrop(drop) {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; // Blue color for raindrops with opacity
  ctx.lineWidth = drop.thickness;
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(drop.x, drop.y + drop.length);
  ctx.stroke();
}

function animateRain() {
  requestAnimationFrame(animateRain);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw the sky and grass
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "hsl(200, 60%, 10%)"); // Light blue
  gradient.addColorStop(0.5, "hsl(210, 20%, 50%)"); // Mid-gray
  gradient.addColorStop(1, "hsl(240, 10%, 30%)"); // Dark gray
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#75c84b";
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

  // Draw and update raindrops
  for (let i = 0; i < 5; i++) {
    raindrops.push(createRaindrop());
  }

  for (let i = 0; i < raindrops.length; i++) {
    const drop = raindrops[i];
    drawRaindrop(drop);
    drop.y += drop.speed;

    if (drop.y - drop.length > canvas.height) {
      raindrops.splice(i, 1);
      i--;
    }
  }
}

animateRain();
