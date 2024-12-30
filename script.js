// Countdown Timer
const timerElement = document.getElementById("timer");

function updateCountdown() {
  const newYear = new Date("January 1, 2025 00:00:00");
  const now = new Date();
  const timeLeft = newYear - now;

  if (timeLeft <= 0) {
    timerElement.textContent = "🎉 Happy New Year! 🎉";
    clearInterval(countdownInterval);
    startConfetti(); // Trigger confetti when the countdown ends
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2, // radius
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    velocityX: Math.random() * 2 - 1,
    velocityY: Math.random() * 3 + 2,
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((particle, index) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    particle.x += particle.velocityX;
    particle.y += particle.velocityY;

    if (particle.y > canvas.height) {
      confettiParticles[index] = createConfetti(); // Reset particle to the top
    }
  });

  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confettiParticles = Array.from({ length: 300 }, createConfetti); // Generate particles
  drawConfetti();
}

// Start the initial countdown update
updateCountdown();
