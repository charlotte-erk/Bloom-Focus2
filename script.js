// 5-stage flower animation
const flowerStages = [
  "assets/stage1.png",
  "assets/stage2.png",
  "assets/stage3.png",
  "assets/stage4.png",
  "assets/stage5.png",
];
const twinkleSound = document.getElementById("twinkle-sound");

let currentStage = 0;
let totalTime = 25 * 60; // 25 minutes in seconds
let remainingTime = totalTime;
let timerInterval = null;

const flowerImg = document.getElementById("flower");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

document.querySelector(".time-buttons").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const seconds = parseInt(event.target.dataset.time);
    newTime(seconds);
  }
});

function updateFlower() {
  const elapsedTime = totalTime - remainingTime;
  const maxGrowingStage = flowerStages.length - 1;

  let stage = Math.floor((elapsedTime / totalTime) * maxGrowingStage);

  flowerImg.src = flowerStages[stage];
}

function updateTimerDisplay() {
  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  minutesEl.textContent = mins.toString().padStart(2, "0");
  secondsEl.textContent = secs.toString().padStart(2, "0");
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay();
      updateFlower();
    } else {
      twinkleSound.play(); // make sure your <audio> id matches
      clearInterval(timerInterval);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = totalTime;
  updateTimerDisplay();
  flowerImg.src = flowerStages[0];
}

function newTime(seconds) {
  clearInterval(timerInterval);
  timerInterval = null;

  totalTime = seconds;
  remainingTime = seconds;

  updateTimerDisplay();
  updateFlower();
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("stop").addEventListener("click", resetTimer);

// Initialize
updateTimerDisplay();
updateFlower();
