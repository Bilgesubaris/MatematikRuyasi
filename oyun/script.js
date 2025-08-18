const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const endBtn = document.getElementById("end-btn");

let score = 0;
let currentAnswer = 0;
let classLevel = 1;

// Başlangıç ekranı butonları
document.querySelectorAll(".class-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    classLevel = parseInt(btn.dataset.class);
    startGame(classLevel);
  });
});

function startGame(level) {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  score = 0;
  scoreEl.textContent = score;
  nextQuestion();
  startFallingShapes();
}

function endGame() {
  alert("Oyun bitti! Toplam Puanın: " + score);
  location.reload();
}

function nextQuestion() {
  let num1, num2, operator;

  if (classLevel <= 2) {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    operator = "+";
  } else {
    const ops = ["+", "-", "×", "÷"];
    operator = ops[Math.floor(Math.random() * ops.length)];

    if (operator === "+") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
    }
    if (operator === "-") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      if (num1 < num2) [num1, num2] = [num2, num1];
    }
    if (operator === "×") {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    }
    if (operator === "÷") {
      num2 = Math.floor(Math.random() * 10) + 1;
      currentAnswer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * currentAnswer;
    }
  }

  if (operator !== "÷") {
    currentAnswer = eval(`${num1} ${operator.replace("×","*").replace("÷","/")} ${num2}`);
  }

  questionEl.textContent = `${num1} ${operator} ${num2} = ?`;

  // Şıklar
  answersEl.innerHTML = "";
  let correctPos = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    if (i === correctPos) {
      btn.textContent = currentAnswer;
      btn.onclick = () => checkAnswer(true);
    } else {
      let wrong;
      do { wrong = currentAnswer + Math.floor(Math.random() * 10) - 5; } 
      while (wrong === currentAnswer || wrong < 0);
      btn.textContent = wrong;
      btn.onclick = () => checkAnswer(false);
    }
    answersEl.appendChild(btn);
  }
}

function checkAnswer(correct) {
  if (correct) {
    score += 10;
    messageEl.textContent = "✅ Doğru!";
  } else {
    score -= 5;
    messageEl.textContent = "❌ Yanlış!";
  }
  scoreEl.textContent = score;
  nextQuestion();
}

// Düşen şekiller
const shapes = ["☁️","⭐","☀️","🎈"];
function startFallingShapes() {
  setInterval(() => {
    const shape = document.createElement("div");
    shape.classList.add("flying");
    shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    shape.style.left = Math.random() * window.innerWidth + "px";
    shape.style.animationDuration = (3 + Math.random() * 3) + "s";
    document.body.appendChild(shape);
    setTimeout(() => shape.remove(), 6000);
  }, 1000);
}

endBtn.addEventListener("click", endGame);
