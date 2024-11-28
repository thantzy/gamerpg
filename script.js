const gameContainer = document.getElementById("game-container");
const background = document.getElementById("back-content");
const scoreBoard = document.getElementById("score-board");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartGame = document.getElementById("restart");
const crosshair = document.getElementById("crosshair");
const gamePauseEl = document.getElementById("game-pause");
const resumeButtonEl = document.getElementById("pause");
const lobbyGame = document.getElementById("lobby");
const startButton = document.getElementById("start");

let score = 0;
let timeLeft = 30;
let timer;
let targets = [];
const TOTAL_TARGET = 5;
let gamePaused = false;

document.addEventListener("mousemove", (e) => {
  crosshair.style.left = `${e.clientX}px`;
  crosshair.style.top = `${e.clientY}px`;
});

function createTargets(count) {
  for (let i = 0; i < count; i++) {
    const target = document.createElement("div");
    target.classList.add("target");

    const containerRect = gameContainer.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(containerRect.width - 70, Math.random() * containerRect.width)
    );
    const y = Math.max(
      0,
      Math.min(containerRect.height - 70, Math.random() * containerRect.height)
    );

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener("click", hitTarget);
    background.addEventListener("click", overhit);
    restartGame.addEventListener("click", again);
    resumeButtonEl.addEventListener("click", resume);

    gameContainer.appendChild(target);

    target.offsetWidth;

    target.classList.add("active");

    targets.push(target);
  }
}

function hitTarget(e) {
  score += 10;
  scoreBoard.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}`;

  e.target.classList.add("destroying");

  const index = targets.indexOf(e.target);
  if (index > -1) {
    targets.splice(index, 1);
    e.target.remove();
  }

  if (targets.length == 0) {
    createTargets(TOTAL_TARGET);
  }
}

function overhit(e) {
  timeLeft -= 4;
  score -= 10;
  scoreBoard.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft} -4`;
}

function updateTimer() {
  if (gamePaused) {
    // return;
  } else {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finalScoreDisplay.textContent = `Total Score: ${score}`;
      gameOverScreen.style.display = "block";
      

      targets.forEach((target) => {
        target.classList.add("destroying");
        target.remove();
      });
      targets = [];
    }
  }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreBoard.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30";

  createTargets(TOTAL_TARGET);

  timer = setInterval(updateTimer, 1000);
}

document.body.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && !gamePaused) {
    pauseGame();
    gamePaused = true;
  } else if (event.code === "Escape" && gamePaused) {
    gamePaused = false;
    resume();
  }
});

const pauseGame = () => {
  timeLeft;
  gamePauseEl.style.display = "flex";
  if (timeLeft <= 0) {
    clearInterval(timer);
    gamePauseEl.style.display = "flex";
  }
};

function resume(e) {
  gamePauseEl.style.display = "none";
  gamePaused = false;
}

function again() {
  gameOverScreen.style.display = "none";
  startGame();
}

startGame();
