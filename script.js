const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const answerHint = document.getElementById("answerHint");

const noPhrases = [
  "А ты точно уверена?",
  "Точно точно?",
  "Подумай еще хорошо...",
  "Может все-таки дашь шанс этому вечеру?",
  "Это будет очень милое свидание 💗",
  "Ну пожалуйста, скажи \"Да\" 🥺",
];

let noClickCount = 0;
let noScale = 1;
let heartRainTimerId = null;
let heartRainStopId = null;

function startHeartRain() {
  const hearts = ["💗", "💖", "💕", "💘", "💞"];
  const heartsPerWave = 24;
  const waveDelayMs = 170;
  const rainDurationMs = 4200;

  const createWave = () => {
    for (let i = 0; i < heartsPerWave; i += 1) {
      const heart = document.createElement("span");
      const lanePercent = (i / heartsPerWave) * 100;
      const laneJitter = (Math.random() - 0.5) * 4;

      heart.className = "heart-rain";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = `${Math.max(0, Math.min(100, lanePercent + laneJitter))}vw`;
      heart.style.fontSize = `${18 + Math.random() * 24}px`;
      heart.style.animationDuration = `${3 + Math.random() * 3.1}s`;
      heart.style.animationDelay = `${Math.random() * 0.35}s`;
      heart.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 8000);
    }
  };

  if (heartRainTimerId) clearInterval(heartRainTimerId);
  if (heartRainStopId) clearTimeout(heartRainStopId);

  createWave();
  heartRainTimerId = setInterval(createWave, waveDelayMs);
  heartRainStopId = setTimeout(() => {
    clearInterval(heartRainTimerId);
    heartRainTimerId = null;
    heartRainStopId = null;
  }, rainDurationMs);
}

noBtn.addEventListener("click", () => {
  const phrase = noPhrases[noClickCount % noPhrases.length];
  answerHint.textContent = phrase;
  noClickCount += 1;
  noScale = Math.max(0.2, noScale - 0.13);
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = `${Math.max(0.35, noScale)}`;

  if (noScale <= 0.2) {
    noBtn.disabled = true;
    noBtn.textContent = "Ой...";
  }
});

yesBtn.addEventListener("click", () => {
  const card = document.querySelector(".card");
  answerHint.textContent = "Урааа💞";
  card.classList.remove("celebration");
  void card.offsetWidth;
  card.classList.add("celebration");
  startHeartRain();
});
