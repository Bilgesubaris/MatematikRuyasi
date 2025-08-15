const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

let score = 0;
let maxNumber = 10;

function startGame(classLevel) {
  if (classLevel === 1) maxNumber = 10;
  else if (classLevel === 2) maxNumber = 20;
  else if (classLevel === 3) maxNumber = 50;
  else if (classLevel === 4) maxNumber = 100;

  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  score = 0;
  scoreEl.textContent = score;
  nextQuestion();
}

function nextQuestion() {
  let num1 = Math.floor(Math.random() * maxNumber);
  let num2 = Math.floor(Math.random() * maxNumber);
  let correctAnswer = num1 + num2;

  questionEl.textContent = `${num1} + ${num2} = ?`;

  answersEl.innerHTML = "";
  let answers = [correctAnswer];
  while (answers.length < 4) {
    let wrong = Math.floor(Math.random() * (maxNumber * 2));
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

const messageEl = document.getElementById("message"); // Yeni eklenen mesaj elementi

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score += 10;
    scoreEl.textContent = score;
    messageEl.textContent = "";
    showFlyingElements();  // Sadece doğruysa şekiller düşsün
    nextQuestion();
  } else {
    // Hata mesajını göster
    messageEl.textContent = "Yanlış! Tekrar dene.";
    messageEl.style.color = "#ff4d6d";       // kırmızı renk
    messageEl.style.fontWeight = "bold";
    messageEl.style.fontSize = "20px";
    messageEl.style.transition = "opacity 0.5s";
    messageEl.style.opacity = 1;

    // 1.5 saniye sonra mesaj kaybolsun
    setTimeout(() => {
      messageEl.style.opacity = 0;
    }, 1500);
  }
}



function showFlyingElements() {
  const types = ["balloon","star","heart","confetti"];
  for(let i=0;i<6;i++){
    const elem = document.createElement("div");
    const type = types[Math.floor(Math.random()*types.length)];
    elem.classList.add("flying");

    elem.style.left = Math.random() * (window.innerWidth-50) + "px";
    elem.style.width = "40px";
    elem.style.height = "40px";

    if(type==="balloon") {
      elem.innerHTML = `
        <svg width="40" height="60" viewBox="0 0 40 60">
          <ellipse cx="20" cy="25" rx="15" ry="20" fill="${getRandomColor()}" />
          <line x1="20" y1="45" x2="20" y2="60" stroke="#333" stroke-width="2"/>
        </svg>`;
    }
    if(type==="star") {
      elem.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFD700">
          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.264L12 18.896 4.584 23.86 6 15.596 0 9.748l8.332-1.73z"/>
        </svg>`;
    }
    if(type==="heart") {
      elem.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF69B4">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                   4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                   C13.09 3.81 14.76 3 16.5 3 
                   19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
    }
    if(type==="confetti") {
      elem.innerHTML = `
        <svg width="10" height="10">
          <rect width="10" height="10" fill="${getRandomColor()}" />
        </svg>`;
      elem.style.width = "10px";
      elem.style.height = "10px";
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
const endBtn = document.getElementById("end-btn");

endBtn.addEventListener("click", () => {
  alert("Oyun bitti! Toplam puanın: " + score);
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
});
