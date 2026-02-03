const textEl = document.getElementById("text");
const btn = document.getElementById("startBtn");
const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

/* Message */
const message = [
  "Hey Baavu… 💗",
  "I don’t know how to say this perfectly,",
  "but I’m really glad you exist.",
  "You make ordinary days feel lighter,",
  "and today is special because it’s YOU 🎂",
  "",
  "Happy Birthday, Baavu 💕"
];

let line = 0;
let char = 0;
let particles = [];
let balloons = [];

btn.addEventListener("click", start);

function start() {
  btn.style.display = "none";
  typeText();
  createBalloons();
  requestAnimationFrame(animateBackground);
}

/* Typing effect */
function typeText() {
  if (line < message.length) {
    if (char < message[line].length) {
      textEl.innerHTML += message[line][char];
      char++;
      setTimeout(typeText, 70);
    } else {
      textEl.innerHTML += "<br>";
      char = 0;
      line++;
      setTimeout(typeText, 500);
    }
  } else {
    setTimeout(showCake, 900);
  }
}

/* Cake */
function showCake() {
  const cake = document.createElement("div");
  cake.className = "cake";
  cake.innerHTML = `
    <div class="sponge">
      <div class="icing"></div>
      <div class="candle" id="candle">
        <div class="flame" id="flame"></div>
      </div>
    </div>
    <div class="plate"></div>
    <div id="wish">Make a wish, Baavu… 💫</div>
  `;
  document.body.appendChild(cake);

  document.getElementById("candle").addEventListener("click", blowCandle);
}

/* Blow candle */
function blowCandle() {
  const flame = document.getElementById("flame");
  if (flame) {
    flame.style.animation = "none";
    flame.style.opacity = "0";
  }
}

/* Background: confetti + balloons */
function createBalloons() {
  for (let i = 0; i < 8; i++) {
    balloons.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: 20 + Math.random() * 10,
      speed: 0.3 + Math.random() * 0.4,
      color: `hsl(${Math.random() * 360},70%,70%)`
    });
  }
}

function animateBackground() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  /* Confetti */
  if (Math.random() < 0.15) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      size: 4,
      speed: 1 + Math.random() * 1.5,
      color: `hsl(${Math.random() * 360},80%,70%)`
    });
  }

  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
  });

  particles = particles.filter(p => p.y < canvas.height);

  /* Balloons */
  balloons.forEach(b => {
    ctx.beginPath();
    ctx.fillStyle = b.color;
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    b.y -= b.speed;
    if (b.y < -50) b.y = canvas.height + 50;
  });

  requestAnimationFrame(animateBackground);
}
