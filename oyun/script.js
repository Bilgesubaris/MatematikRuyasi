const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

let score = 0;

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  score = 0;
  scoreEl.textContent = score;
  nextQuestion();
});

function nextQuestion() {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let correctAnswer = num1 + num2;

  questionEl.textContent = `${num1} + ${num2} = ?`;

  answersEl.innerHTML = "";
  let answers = [correctAnswer];
  while (answers.length < 4) {
    let wrong = Math.floor(Math.random() * 20);
    if (!answers.includes(wrong)) answers.push(wrong);
  }
  answers.sort(() => Math.random() - 0.5);

  answers.forEach(ans => {
    let btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(ans, correctAnswer);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) score += 10;
  scoreEl.textContent = score;
  showFlyingElements();
  nextQuestion();
}

/* Yukarıdan aşağıya düşen öğeler */
function showFlyingElements() {
  const types = ["balloon","star","heart","confetti"];
  for(let i=0;i<6;i++){
    const elem = document.createElement("div");
    const type = types[Math.floor(Math.random()*types.length)];
    elem.classList.add("flying", type);

    elem.style.left = Math.random() * (window.innerWidth-50) + "px";

    // Renk ve şekil
    if(type==="balloon") {
      elem.style.width = 20+Math.random()*30+"px";
      elem.style.height = 30+Math.random()*50+"px";
      elem.style.backgroundColor = getRandomColor();
      elem.style.borderRadius = "50% 50% 50% 50%";
    }
    if(type==="star") {
      elem.style.width = "15px";
      elem.style.height = "15px";
      elem.style.backgroundColor = "#FFD700";
      elem.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
    }
    if(type==="heart") {
      elem.style.width = "20px";
      elem.style.height = "20px";
      elem.style.backgroundColor = "#FF69B4";
      elem.style.clipPath = "polygon(50% 0%, 61% 15%, 75% 15%, 100% 40%, 100% 75%, 75% 100%, 50% 85%, 25% 100%, 0% 75%, 0% 40%, 25% 15%, 39% 15%)";
    }
    if(type==="confetti") {
      elem.style.width = 6+Math.random()*6+"px";
      elem.style.height = 12+Math.random()*6+"px";
      elem.style.backgroundColor = getRandomColor();
    }

    elem.style.animationDuration = 3+Math.random()*2+"s";
    document.body.appendChild(elem);
    setTimeout(()=>elem.remove(),5000);
  }
}

function getRandomColor(){
  const colors = ["#ff4d6d","#ffb703","#8ac926","#1982c4","#6a4c93"];
  return colors[Math.floor(Math.random()*colors.length)];
}
